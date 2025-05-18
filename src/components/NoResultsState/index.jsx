import React from "react";
import styled, { keyframes } from "styled-components";
import { FiSearch } from "react-icons/fi";
import { MdFilterAlt } from "react-icons/md";
import { Button } from "../button";
import { ToastManager } from "../ToastManager";
import { device } from "../../styles/responsive";

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

const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(-5deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  margin: 3rem auto;
  max-width: 600px;
  border: 2px dashed #ff9800;
  border-radius: 12px;
  background-color: #fffaf0;
  text-align: center;
  min-height: 350px;
  box-shadow: 0 5px 15px rgba(255, 152, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.6s ease-out;

  @media ${device.tablet} {
    padding: 3rem 1.5rem;
    margin: 2rem auto;
    min-height: 300px;
  }

  @media ${device.mobileL} {
    padding: 2rem 1rem;
    margin: 1rem auto;
    min-height: 250px;
    width: 95%;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255, 152, 0, 0.15);
  }
`;

const IconContainer = styled.div`
  font-size: 5rem;
  color: #ff9800;
  margin-bottom: 2rem;
  animation: ${pulse} 2s infinite;

  @media ${device.tablet} {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }

  @media ${device.mobileL} {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  &:hover {
    animation: ${shake} 0.5s ease-in-out;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;

  @media ${device.tablet} {
    font-size: 1.7rem;
  }

  @media ${device.mobileL} {
    font-size: 1.4rem;
    margin-bottom: 0.75rem;
  }
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

  @media ${device.tablet} {
    font-size: 1rem;
    margin-bottom: 2rem;
  }

  @media ${device.mobileL} {
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
    line-height: 1.4;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: 0.6s;
  animation-fill-mode: both;

  @media ${device.mobileL} {
    flex-direction: column;
    width: 100%;
  }
`;

export function NoResultsState({ onClearFilter, onShowFilter }) {
  return (
    <Container>
      <ToastManager />
      <IconContainer>
        <FiSearch />
      </IconContainer>
      <Title>Nenhum resultado encontrado</Title>
      <Description>
        Não encontramos nenhum usuário com os critérios de filtro atuais. Tente
        modificar os filtros ou visualizar todos os usuários.
      </Description>
      <ButtonContainer>
        <Button
          title="Ver Todos Usuários"
          colorButton="#ff9800"
          onClick={onClearFilter}
        />
        <Button
          title="Modificar Filtros"
          icon={<MdFilterAlt />}
          colorButton="#0088ff"
          onClick={onShowFilter}
        />
      </ButtonContainer>
    </Container>
  );
}
