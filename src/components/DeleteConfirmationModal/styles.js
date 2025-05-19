import styled, { keyframes } from "styled-components";
import { device } from "../../styles/responsive";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const shake = keyframes`
  0% { transform: translateX(0); }
  10% { transform: translateX(-10px); }
  20% { transform: translateX(10px); }
  30% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  50% { transform: translateX(-5px); }
  60% { transform: translateX(5px); }
  70% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
  90% { transform: translateX(-2px); }
  100% { transform: translateX(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.3s ease;
  padding: 1rem;

  @media ${device.mobileL} {
    padding: 0.5rem;
    align-items: center;
  }
`;

export const ModalContent = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  width: 400px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 0.3s ease;

  @media ${device.tablet} {
    padding: 1.5rem;
    width: 90%;
  }

  @media ${device.mobileL} {
    padding: 1.25rem;
    width: 95%;
    border-radius: 10px;
  }

  h2 {
    color: #ff3333;
    margin-bottom: 1.5rem;
    text-align: center;
    font-weight: 600;
    position: relative;

    @media ${device.tablet} {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    @media ${device.mobileL} {
      font-size: 1.3rem;
    }

    &:after {
      content: "";
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #ff3333, #ff6666);
      border-radius: 2px;
      margin: 0.8rem auto 0;
    }
  }
  p {
    margin: 1rem 0;
    text-align: center;
    font-size: 1.1rem;
    line-height: 1.5;

    @media ${device.tablet} {
      font-size: 1rem;
    }

    @media ${device.mobileL} {
      font-size: 0.9rem;
      margin: 0.75rem 0;
    }
  }

  .warning-icon {
    display: flex;
    justify-content: center;
    margin: 1.5rem 0;
    animation: ${pulse} 2s infinite;

    @media ${device.mobileL} {
      margin: 1rem 0;

      svg {
        width: 40px;
        height: 40px;
      }
    }
  }

  .warning-text {
    color: #ff3333;
    font-size: 0.95rem;
    font-style: italic;
    font-weight: 500;
    text-align: center;
    margin-top: 1.5rem;
    background: rgba(255, 51, 51, 0.08);
    padding: 0.8rem;
    border-radius: 8px;
    border-left: 4px solid #ff3333;

    @media ${device.mobileL} {
      font-size: 0.85rem;
      padding: 0.6rem;
      margin-top: 1rem;
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;

  @media ${device.tablet} {
    margin-top: 1.5rem;
  }

  @media ${device.mobileL} {
    margin-top: 1.2rem;
    flex-direction: column-reverse;
    gap: 15px;
  }

  button {
    flex: 1;
    height: 44px;
    margin: 0 0.8rem;

    @media ${device.mobileL} {
      margin: 0;
      padding: 12px 20px;
      height: auto;
      min-height: 44px;
      width: 100%;
      font-size: 0.95rem;
    }

    &:first-child {
      margin-left: 0;

      @media ${device.mobileL} {
        margin: 0;
      }
    }

    &:last-child {
      margin-right: 0;

      @media ${device.mobileL} {
        margin: 0;
      }
    }
  }
`;
