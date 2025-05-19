import styled from "styled-components";
import { device } from "../../styles/responsive";

export const Container = styled.div`
  width: auto;
  height: auto;
  margin: 0;
  padding: 1.5rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fafafa;
  min-height: 100vh;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 2rem;
    
    @media ${device.tablet} {
      flex-direction: column;
      gap: 1rem;
    }
  }

  @media ${device.tablet} {
    padding: 1rem;
  }

  @media ${device.mobileL} {
    padding: 0.75rem 0.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background-color: var(--card-background-color, #ffffff);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  
  span {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-color, #333333);
  }
  
  @media ${device.mobileL} {
    padding: 6px 10px;
    
    span {
      font-size: 12px;
    }
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #ff3333;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(255, 51, 51, 0.1);
  }
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

  & div {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  & div > button {
    margin: 0.5rem 1rem 0.5rem 0;
    min-width: 160px;

    @media ${device.tablet} {
      min-width: 130px;
    }
    flex-shrink: 0;
    margin-left: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  & div.controls-left > button {
    margin: 0.5rem 1rem 0.5rem 0;
    min-width: 160px;

    @media ${device.tablet} {
      min-width: 130px;
    }

    @media ${device.mobileL} {
      min-width: unset;
      width: 100%;
      margin: 0.5rem 0;
      justify-content: center;
    }
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

    @media ${device.mobileL} {
      margin: 0.5rem 0;
      width: 100%;
      justify-content: center;
    }

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

  @media ${device.tablet} {
    flex-direction: column;
    padding: 0.75rem;
  }

  @media ${device.mobileL} {
    flex-direction: column;
    padding: 0.75rem;

    & div {
      flex-direction: column;
    }

    & div > button {
      width: 100%;
      margin: 0.3rem 0;
      justify-content: center;
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
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

  @media ${device.tablet} {
    font-size: 1.8rem;
  }

  @media ${device.mobileL} {
    font-size: 1.5rem;
    width: 100%;
    margin-bottom: 0.3rem;
    text-align: center;
  }
`;

export const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  max-width: 600px;
  line-height: 1.5;

  @media ${device.tablet} {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  @media ${device.mobileL} {
    font-size: 0.9rem;
    margin-bottom: 1rem;
    text-align: center;
    width: 100%;
  }
`;
