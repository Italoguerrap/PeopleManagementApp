import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 400px;

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  input {
    width: 95%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;

  }
`;

export const Photo = styled.div`
  img{
    width: 100px;
      height: 100px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between; 
  width: 100%;

  &  button {
    margin: 20px;
    width: 100%;   
  }
`;