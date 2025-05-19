import { Container } from "./styles";
import { FaSignInAlt } from "react-icons/fa";

export function LoginButton({ onClick }) {
  return (
    <Container onClick={onClick}>
      <FaSignInAlt size={20} />
      <span>Login</span>
    </Container>
  );
}
