import { Container } from "./styles";
import { FaUserPlus } from "react-icons/fa";

export function RegisterButton({ onClick }) {
  return (
    <Container onClick={onClick}>
      <FaUserPlus size={20} />
      <span>Cadastrar</span>
    </Container>
  );
}
