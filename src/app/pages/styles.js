import styled from "styled-components";

export const Container = styled.div`
  width: auto;
  height: auto;
  margin: 0;
  padding: 0;
`;


export const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;

  & div{
    width: 100%;
  }

  & div > button {
    margin: 20px;
    width: 8%;   
  }

`;

export const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 0.3rem;
`;

export const Description = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`;