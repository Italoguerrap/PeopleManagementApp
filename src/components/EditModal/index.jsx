import { useState, useEffect } from 'react'
import { ModalOverlay, ModalContent, Photo, ButtonContainer } from './styles';
import { Button } from '../../components/button';

export function EditModal({ user, onClose }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [sex, setSex] = useState(user?.sex || '');
  const [birthDate, setBirthDate] = useState(user?.birthDate || '');
  const [naturality, setNaturality] = useState(user?.naturality || '');
  const [nationality, setNationality] = useState(user?.nationality || '');
  const [cpf, setCpf] = useState(user?.cpf || '');

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setSex(user?.sex || '');
    setBirthDate(user?.birthDate || '');
    setNaturality(user?.naturality || '');
    setNationality(user?.nationality || '');
    setCpf(user?.cpf || '');
    setProfilePic(null);
    setPreview(null);
  }, [user]);

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log({
      name,
      email,
      sex,
      birthDate,
      naturality,
      nationality,
      cpf,
      profilePic,
    });
    onClose();
  }

 return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Editar Usuario</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Nome:<br />
            <input
              type="text"
              name="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label>
            Email:<br />
            <input
              type="text"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </label>

          <label>
            Sexo:<br />
            <select
              name="sex"
              value={sex}
              onChange={e => setSex(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              {/* Pode adicionar outras opções aqui */}
            </select>
          </label>

          <label>
            Data de Nascimento:<br />
            <input
              type="date"
              name="birthDate"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
            />
          </label>

          <label>
            Naturalidade:<br />
            <input
              type="text"
              name="naturality"
              value={naturality}
              onChange={e => setNaturality(e.target.value)}
            />
          </label>

          <label>
            Nacionalidade:<br />
            <input
              type="text"
              name="nationality"
              value={nationality}
              onChange={e => setNationality(e.target.value)}
            />
          </label>

          <label>
            CPF:<br />
            <input
              type="text"
              name="cpf"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
            />
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
            <Button title="Editar Usuario" colorButton="#00ff00" type="submit" />
            <Button title="Fechar" onClick={onClose} colorButton="#ff0000" />
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}