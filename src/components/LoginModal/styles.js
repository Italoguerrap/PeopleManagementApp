import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

export const ModalContent = styled.div`
  background-color: white;
  color: var(--text-color);
  border-radius: 8px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  opacity: 1;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  h2 {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    color: var(--text-color);
  }

  .form-group {
    margin-bottom: 20px;
    position: relative;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: var(--text-color);
  }

  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
    background-color: var(--input-background);
    color: var(--text-color);
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #02ffff;
    }

    &.has-error {
      border-color: #ff3333;
    }
  }

  .error-message {
    color: #ff3333;
    font-size: 12px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  border-radius: 8px;
`;

export const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #02ffff;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingText = styled.p`
  color: white;
  margin-top: 15px;
  font-size: 16px;
`;

export const RememberMeContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    color: var(--text-color);
    white-space: nowrap;
  }

  input[type="checkbox"] {
    margin-right: 8px;
    cursor: pointer;
    width: auto;
  }
`;

export const GeneralError = styled.div`
  color: #d32f2f;
  background-color: rgba(211, 47, 47, 0.1);
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 8px;
    flex-shrink: 0;
  }
`;
