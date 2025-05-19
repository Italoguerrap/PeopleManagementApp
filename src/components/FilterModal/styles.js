import styled from "styled-components";
import { device } from "../../styles/responsive";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  padding: 1rem;

  @media ${device.mobileL} {
    padding: 0.5rem;
    align-items: flex-start;
    overflow-y: auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 450px;
  max-width: 85vw;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;

  @media ${device.tablet} {
    padding: 1.5rem;
    width: 90%;
    max-height: 80vh;
    font-size: 0.95rem;
  }

  @media ${device.mobileL} {
    padding: 1rem;
    width: 95%;
    max-height: 90vh;
    font-size: 0.9rem;
    border-radius: 10px;
  }

  @keyframes slideUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  h2 {
    margin-top: 0;
    color: #333;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
    position: relative;

    @media ${device.tablet} {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }

    @media ${device.mobileL} {
      font-size: 1.3rem;
      margin-bottom: 0.8rem;
    }

    &:after {
      content: "";
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #02ffff, #0088ff);
      border-radius: 2px;
      margin: 0.8rem auto 0;

      @media ${device.mobileL} {
        width: 40px;
        height: 3px;
        margin: 0.6rem auto 0;
      }
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #555;

    @media ${device.mobileL} {
      font-size: 0.85rem;
    }
    margin-bottom: 0.3rem;
  }
  input {
    width: 93%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;

    @media ${device.tablet} {
      width: 95%;
      padding: 0.7rem;
    }

    @media ${device.mobileL} {
      width: 100%;
      padding: 0.7rem;
      font-size: 16px; 
      border-radius: 8px;
    }

    &:focus {
      outline: none;
      border-color: #0088ff;
      box-shadow: 0 0 0 3px rgba(0, 136, 255, 0.2);
    }

    &::placeholder {
      color: #aaa;
    }
  }
  select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    background-color: white;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.8rem center;
    background-size: 16px;
    cursor: pointer;
    transition: all 0.2s;

    @media ${device.tablet} {
      padding: 0.7rem;
    }

    @media ${device.mobileL} {
      padding: 0.7rem;
      font-size: 16px;
    }

    &:focus {
      outline: none;
      border-color: #0088ff;
      box-shadow: 0 0 0 3px rgba(0, 136, 255, 0.2);
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.5rem;

  & button {
    margin: 0.5rem;
    width: 100%;
  }

  @media ${device.tablet} {
    gap: 0.5rem;
    margin-top: 1.2rem;

    & button {
      margin: 0.25rem;
    }
  }

  @media ${device.mobileL} {
    flex-direction: column-reverse;
    gap: 15px;
    margin-top: 1rem;

    & button {
      margin: 0;
      height: auto;
      min-height: 44px;
      padding: 12px;
      font-size: 0.95rem;
    }
  }
`;
