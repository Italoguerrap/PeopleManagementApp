import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { useResponsive } from "../../context/ResponsiveContext";

const SwipeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  padding-bottom: 10px;

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
      height: 4px;
    }
  }
`;

const ScrollIndicator = styled.div`
  display: ${(props) => (props.$isVisible ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  padding: 8px 14px;
  font-size: 0.85rem;
  color: #555;
  background-color: #f9f9f9;
  border-radius: 20px;
  opacity: ${(props) => (props.$isActive ? "1" : "0.8")};
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
    animation: ${(props) =>
      props.$isActive ? "bounce 1s infinite ease-in-out" : "none"};
  }

  @keyframes bounce {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(3px);
    }
  }
`;

const SwipeableTable = ({ children }) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [isScrollActive, setIsScrollActive] = useState(false);
  const tableContainerRef = useRef(null);
  const { isMobile, isTablet } = useResponsive();

  const checkTableWidth = () => {
    if (!tableContainerRef.current) return;

    const container = tableContainerRef.current;
    const isOverflowing = container.scrollWidth > container.clientWidth;
    setShowScrollIndicator(isOverflowing && (isMobile || isTablet));
  };

  const handleScroll = () => {
    if (!tableContainerRef.current) return;

    const container = tableContainerRef.current;
    const scrollPercent =
      container.scrollLeft / (container.scrollWidth - container.clientWidth);

    setIsScrollActive(scrollPercent > 0 && scrollPercent < 1);

    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrollActive(false);
    }, 1500);
  };

  const touchStartX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    if (!touchStartX.current || !tableContainerRef.current) return;

    const container = tableContainerRef.current;
    const touchX = e.touches[0].clientX;
    const diff = touchStartX.current - touchX;

    container.scrollLeft += diff * 1.8;
    touchStartX.current = touchX;

    setIsScrollActive(true);

    clearTimeout(window.scrollTimeout);
    window.scrollTimeout = setTimeout(() => {
      setIsScrollActive(false);
    }, 1500);
  };

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    checkTableWidth();
    window.addEventListener("resize", checkTableWidth);

    container.addEventListener("scroll", handleScroll);

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("resize", checkTableWidth);
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isMobile, isTablet]);
  return (
    <div>
      <ScrollIndicator
        $isVisible={showScrollIndicator}
        $isActive={isScrollActive}
      >
        <FiArrowRight style={{ verticalAlign: "middle", marginRight: "5px" }} />
        Deslize para ver mais
        <FiArrowRight style={{ verticalAlign: "middle", marginLeft: "5px" }} />
      </ScrollIndicator>
      <SwipeContainer
        ref={tableContainerRef}
        style={{
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
        data-testid="swipeable-container"
      >
        {children}
      </SwipeContainer>
    </div>
  );
};

export default SwipeableTable;
