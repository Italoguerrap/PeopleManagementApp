import { useState } from 'react'
import { ModalOverlay, ModalContent, Photo, ButtonContainer } from './styles';
import { Button } from '../../components/button';

export function AddUserModal({ onClose }) {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  }
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Adicionar Usuario</h2>

        <form>
          <label>
            Nome:<br />
            <input type="text" name="name" />
          </label>

          <label>
            Email:<br />
            <input type="text" name="email" />
          </label>

          <label>
            Sexo:<br />
            <select name="sex">
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </label>

          <label>
            Data de Nascimento:<br />
            <input type="date" name="birthDate" />
          </label>

          <label>
            Naturalidade:<br />
            <input type="text" name="naturality" />
          </label>

          <label>
            Nacionalidade:<br />
            <input type="text" name="nationality" />
          </label>

          <label>
            CPF:<br />
            <input type="text" name="cpf" />
          </label>

          <label>
            Foto de Perfil:<br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {preview && (
            <Photo>
              <img 
                src={preview} 
                alt="Prévia da foto de perfil" 
              />
            </Photo>
          )}
          <ButtonContainer>
            <Button title="Adicionar Usuario" colorButton="#00ff00" />
            <Button title="Fechar" onClick={onClose} colorButton="#ff0000" />
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
