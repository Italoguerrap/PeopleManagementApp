import styled, { keyframes } from "styled-components";
import { device } from "../../styles/responsive";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--background-color);
  padding: 20px;
  
  @media ${device.mobileL} {
    padding: 15px 10px;
  }
`;

export const AuthBox = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
  width: 100%;
  max-width: 500px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  opacity: 1;
  overflow: hidden;

  @media ${device.tablet} {
    padding: 35px 25px;
    max-width: 450px;
  }

  @media ${device.mobileL} {
    padding: 30px 20px;
    max-width: 95%;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  color: var(--primary-color, #02ffff);
`;

export const Title = styled.h1`
  font-size: 24px;
  color: var(--text-color);
  margin-bottom: 12px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  
  @media (min-width: 600px) {
    white-space: nowrap;
  }

  @media ${device.tablet} {
    font-size: 22px;
  }

  @media ${device.mobileL} {
    font-size: 20px;
    white-space: normal;
  }
  
  @media ${device.mobileM} {
    font-size: 19px;
  }
  
  @media ${device.mobileS} {
    font-size: 18px;
  }
`;

export const Subtitle = styled.p`
  color: var(--text-secondary-color);
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  
  @media (min-width: 600px) {
    white-space: nowrap;
  }

  @media ${device.tablet} {
    font-size: 15px;
    margin-bottom: 25px;
    white-space: normal;
  }

  @media ${device.mobileL} {
    font-size: 14px;
    margin-bottom: 20px;
    white-space: normal;
    padding: 0 5px;
  }
  
  @media ${device.mobileM} {
    font-size: 13px;
  }
  
  @media ${device.mobileS} {
    font-size: 12px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 30px;
  opacity: 1;

  @media ${device.mobileL} {
    flex-direction: column;
    gap: 12px;
    margin-bottom: 25px;
  }
  
  button {
    opacity: 1;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const Footer = styled.footer`
  margin-top: 30px;
  font-size: 14px;
  color: var(--text-secondary-color);
  opacity: 0.7;

  @media ${device.mobileL} {
    font-size: 12px;
    margin-top: 25px;
  }
`;
