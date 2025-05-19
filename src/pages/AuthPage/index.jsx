import { useState } from "react";
import { 
  Container, 
  AuthBox, 
  Logo, 
  Title, 
  Subtitle, 
  ButtonsContainer, 
  Footer 
} from "./styles";
import { LoginButton } from "../../components/LoginButton";
import { RegisterButton } from "../../components/RegisterButton";
import { FaUsers } from "react-icons/fa";
import { LoginModal } from "../../components/LoginModal";
import { RegisterModal } from "../../components/RegisterModal";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../context/AuthContext";

export function AuthPage({ onAuthSuccess }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const { login } = useAuth();

  const handleLoginSuccess = (authData) => {
    login(authData);
    if (onAuthSuccess) {
      onAuthSuccess();
    }
  };
  return (
    <Container>
      <AuthBox>        <Logo>
          <FaUsers size={50} />
        </Logo>
        <Title>Sistema de Gerenciamento de Pessoas</Title>
        <Subtitle>
          Entre com suas credenciais para acessar o sistema ou cadastre-se.
        </Subtitle>

        <ButtonsContainer>
          <LoginButton onClick={() => setIsLoginModalOpen(true)} />
          <RegisterButton onClick={() => setIsRegisterModalOpen(true)} />
        </ButtonsContainer>

        <Footer>
          © {new Date().getFullYear()} Sistema de Gerenciamento de Pessoas
        </Footer>
      </AuthBox>

      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {isRegisterModalOpen && (
        <RegisterModal
          onClose={() => setIsRegisterModalOpen(false)}
          onRegistrationSuccess={() => {
            setIsRegisterModalOpen(false);
            setTimeout(() => setIsLoginModalOpen(true), 500);
          }}
        />
      )}
    </Container>
  );
}
