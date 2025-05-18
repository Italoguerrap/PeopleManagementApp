import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUserPlus } from 'react-icons/fa';
import { AddUserButton } from '../AddUserButton';
import { ToastManager } from '../ToastManager';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  70% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  margin: 3rem auto;
  max-width: 600px;
  border: 2px dashed #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
  text-align: center;
  min-height: 350px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: #02ffff;
  }
`;

const IconContainer = styled.div`
  font-size: 5rem;
  color: #02ffff;
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite, ${floatAnimation} 4s ease-in-out infinite;
  filter: drop-shadow(0 5px 15px rgba(2, 255, 255, 0.4));
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 2.5rem;
  max-width: 500px;
  font-size: 1.1rem;
  line-height: 1.6;
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: 0.4s;
  animation-fill-mode: both;
`;

const ButtonContainer = styled.div`
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;
`;

export function EmptyState({ onAddClick }) {
  return (
    <Container>
      <ToastManager />
      <IconContainer>
        <FaUserPlus />
      </IconContainer>
      <Title>Bem-vindo ao Gerenciamento de Usuários</Title>
      <Description>
        Você ainda não possui usuários cadastrados no sistema.
        Para começar, clique no botão abaixo.
      </Description>
      <ButtonContainer>
        <AddUserButton onClick={onAddClick} />
      </ButtonContainer>
    </Container>
  );
}