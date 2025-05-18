import styled from 'styled-components';

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
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 450px;
  max-width: 90vw;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
  
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
    
    &:after {
      content: '';
      display: block;
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, #02ffff, #0088ff);
      border-radius: 2px;
      margin: 0.8rem auto 0;
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
    margin-bottom: 0.3rem;
  }
  
  input {
    width: 93%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.2s;
    
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

  &  button {
    margin: 20px;
    width: 100%;   
  }
`;