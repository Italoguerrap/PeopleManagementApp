import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowRight } from "react-icons/fi";
import { useResponsive } from '../../context/ResponsiveContext';

// Styled components for the swipeable container
const SwipeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  padding-bottom: 10px; /* Add padding to improve touch scrolling */
  
  /* Estilo para scrollbar no Chrome e Safari */
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #d1d1d1;
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #c1c1c1;
  }
  
  @media (max-width: 425px) {
    &::-webkit-scrollbar {
      height: 4px; /* Smaller scrollbar for mobile */
    }
  }
`;

const ScrollIndicator = styled.div`
  display: ${props => props.$isVisible ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  padding: 8px 14px;
  font-size: 0.85rem;
  color: #555;
  background-color: #f9f9f9;
  border-radius: 20px;
  opacity: ${props => props.$isActive ? '1' : '0.8'};
  transition: all 0.3s ease-in-out;
  border: 1px solid #eee;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  position: sticky;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  max-width: 90%;
  z-index: 5;
  pointer-events: none;
  user-select: none;
  
  @media (max-width: 425px) {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
  
  svg {
    animation: ${props => props.$isActive ? 'bounce 1s infinite ease-in-out' : 'none'};
  }
  
  @keyframes bounce {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(3px); }
  }
`;

// Component for handling swipe gestures on tables for mobile
const SwipeableTable = ({ children }) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const tableContainerRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();
  
  // Check if table needs horizontal scrolling
  const checkTableWidth = () => {
    if (!tableContainerRef.current) return;
    
    const container = tableContainerRef.current;
    const isOverflowing = container.scrollWidth > container.clientWidth;
    setShowScrollIndicator(isOverflowing && (isMobile || isTablet));
  };
    // Handle scroll events to update the indicator
  const handleScroll = () => {
    if (!tableContainerRef.current) return;
    
    const container = tableContainerRef.current;
    const scrollPercent = container.scrollLeft / (container.scrollWidth - container.clientWidth);
    
    // Only show as active when scrolling
    setIsScrollActive(scrollPercent > 0 && scrollPercent < 1);
    
    // Hide scroll indicator after a brief timeout
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrollActive(false);
    }, 1500);
  };

  // Implement touch/swipe handling
  const touchStartX = useRef(null);
  
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
    const handleTouchMove = (e) => {
    if (!touchStartX.current || !tableContainerRef.current) return;
    
    const container = tableContainerRef.current;
    const touchX = e.touches[0].clientX;
    const diff = touchStartX.current - touchX;
    
    // Scroll the container with touch movement
    container.scrollLeft += diff * 1.8; // Amplify the scroll effect for better response
    touchStartX.current = touchX;
    
    // Show the scroll indicator when user is swiping
    setIsScrollActive(true);
    
    // Hide scroll indicator after a brief timeout when done swiping
    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrollActive(false);
    }, 1500);
  };

  // Initialize and clean up event listeners
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;
    
    // Check table width on mount and window resize
    checkTableWidth();
    window.addEventListener('resize', checkTableWidth);
    
    // Add scroll handlers
    container.addEventListener('scroll', handleScroll);
    
    // Add touch handlers for mobile
    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove);
    
    return () => {
      window.removeEventListener('resize', checkTableWidth);
      container.removeEventListener('scroll', handleScroll);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isMobile, isTablet]);  return (
    <div>
      <ScrollIndicator $isVisible={showScrollIndicator} $isActive={isScrollActive}>
        <FiArrowRight style={{verticalAlign: 'middle', marginRight: '5px'}} /> 
        Deslize para ver mais 
        <FiArrowRight style={{verticalAlign: 'middle', marginLeft: '5px'}} />
      </ScrollIndicator>
      <SwipeContainer 
        ref={tableContainerRef}
        style={{ 
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
        data-testid="swipeable-container"
      >
        {children}
      </SwipeContainer>
    </div>
  );
};

export default SwipeableTable;
