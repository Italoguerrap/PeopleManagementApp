import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  height: auto;
  margin: 0;
  padding: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fafafa;
  min-height: 100vh;
`;


export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  & div{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  & div > button {
    margin: 0.5rem 1rem 0.5rem 0;
    min-width: 160px;   
  }
  .loading-indicator {
    color: #0088ff;
    font-style: italic;
    margin-right: 20px;
    animation: pulse 1.5s infinite;
  }

  .filter-badge {
    background-color: #ff9800;
    color: white;
    padding: 0.5rem 0.8rem;
    border-radius: 50px;
    font-size: 0.85rem;
    margin-left: 1rem;
    display: inline-flex;
    align-items: center;
    box-shadow: 0 2px 5px rgba(255, 152, 0, 0.3);
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f57c00;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(255, 152, 0, 0.4);
    }
    
    .clear-icon {
      margin-left: 8px;
      cursor: pointer;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: rotate(90deg);
        opacity: 0.8;
      }
    }
  }
  @keyframes pulse {
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
  }
`;

export const Title = styled.h1`
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #333;
  font-weight: 600;
  background: linear-gradient(90deg, #02ffff, #0088ff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

export const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  max-width: 600px;
  line-height: 1.5;
`;