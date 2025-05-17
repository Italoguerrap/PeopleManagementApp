import styled from "styled-components";

export const Container = styled.button`
    background-color: ${props => props.$colorButton || 'gray'};
    color: black;
    height: 40px;
    border: 0;
    padding: 0 16px;
    margin-top: 16px;
    border-radius: 10px;
    font-weight: 500;
    cursor: pointer;

  transition: filter 0.2s ease;  

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 8px ${props => props.$colorButton || 'gray'};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px ${props => props.$colorButton || 'gray'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    filter: brightness(0.85);
  }

`;