import { useState } from "react";
import { ModalOverlay, ModalContent, ButtonContainer } from "./styles";
import { Button } from "../../components/button";
import { toast } from "react-toastify";
import { deletePerson } from "../../services/api";
import { MdWarning } from "react-icons/md";
import { FaTrash, FaTimes } from "react-icons/fa";

export function DeleteConfirmationModal({ user, onClose, onUserDeleted }) {
  const [loading, setLoading] = useState(false);
  async function handleDelete() {
    if (!user || !user.cpf) {
      toast.error("Usuário inválido");
      return;
    }

    try {
      setLoading(true);
      await deletePerson(user.cpf);

      toast.success("Usuário excluído com sucesso!");
      if (onUserDeleted) {
        onUserDeleted();
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (err) {
      toast.error("Erro ao excluir usuário: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>
          <MdWarning style={{ marginRight: "8px", verticalAlign: "middle" }} />
          Confirmar Exclusão
        </h2>

        <div className="warning-icon">
          <MdWarning size={64} color="#ff3333" />
        </div>

        <p>
          Tem certeza que deseja excluir o usuário <strong>{user?.name}</strong>
          ?
        </p>
        <p className="warning-text">
          Esta ação não pode ser desfeita e removerá permanentemente os dados
          deste usuário.
        </p>

        <ButtonContainer>
          <Button
            title="Cancelar"
            icon={<FaTimes />}
            onClick={onClose}
            colorButton="#777777"
            disabled={loading}
          />
          <Button
            title={loading ? "Excluindo..." : "Excluir"}
            icon={<FaTrash />}
            onClick={handleDelete}
            colorButton="#ff3333"
            loading={loading}
          />
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
}
