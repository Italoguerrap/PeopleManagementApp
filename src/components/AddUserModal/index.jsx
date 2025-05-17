import { useState } from 'react'
import { ModalOverlay, ModalContent, Photo, ButtonContainer } from './styles';
import { Button } from '../../components/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AddUserModal({ onClose, onUserAdded  }) {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    naturality: '',
    nationality: '',
    country: '',
    cpf: ''
  });


  function handleChange(e) {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
}

async function handleSubmit(e) {
  e.preventDefault();

  const payload = {
    name: formData.name,
    gender: formData.gender === "Masculino" ? 0 : 1,
    email: formData.email,
    dateOfBirth: formData.dateOfBirth,
    naturality: formData.naturality || null,
    country: formData.country || null,
    cpf: formData.cpf || null
  };

  try {
    const response = await fetch('http://localhost:5097/api/v1/People', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ao adicionar usuário: ${errorText}`);
    }
    
    toast.success("Usuário adicionado com sucesso!");
    onUserAdded();
    onClose();

  } catch (err) {
    toast.error("Erro ao adicionar usuário!");
  }
}

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
        <ToastContainer />
        <h2>Adicionar Usuario</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Nome:<br />
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>

          <label>
            Email:<br />
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Sexo:<br />
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </label>

          <label>
            Data de Nascimento:<br />
            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
          </label>

          <label>
            Naturalidade:<br />
            <input type="text" name="naturality" value={formData.naturality} onChange={handleChange} />
          </label>

          <label>
            Nacionalidade:<br />
            <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
          </label>

          <label>
            CPF:<br />
            <input type="text" name="cpf" value={formData.cpf} onChange={handleChange} />
          </label>

          <label>
            Foto de Perfil:<br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>

          {preview && (
            <Photo>
              <img src={preview} alt="Prévia da foto de perfil" />
            </Photo>
          )}

          <ButtonContainer>
            <Button type="submit" title="Adicionar Usuario" colorButton="#00ff00" />
            <Button title="Fechar" onClick={onClose} colorButton="#ff0000" />
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
