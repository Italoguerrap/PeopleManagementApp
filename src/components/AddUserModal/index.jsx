import { useState } from 'react'
import { ModalOverlay, ModalContent, Photo, ButtonContainer, LoadingOverlay, LoadingSpinner, LoadingText } from './styles';
import { Button } from '../../components/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPerson, GenderType } from '../../services/api';
import { FaUserPlus, FaSave, FaTimes } from 'react-icons/fa';
import { formatCPF } from '../../services/validation';
import { validateField, validateForm, handleApiError } from '../../services/formUtils';

export function AddUserModal({ onClose, onUserAdded  }) {
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
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

    let { name, value } = e.target;
    
    if (e.target.name === 'cpf') {
      value = formatCPF(e.target.value);
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    
    const error = validateField(name, value);
    
    if (error) {
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }
  
  function validateFormData() {
    const { errors: validationErrors, isValid } = validateForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      if (firstError) {
        toast.error(firstError);
      }
    }
    
    return isValid;
  } 
  
    function handleFieldChange(fieldName, value, isSubmit = false) {

      const error = validateField(fieldName, value, isSubmit);
      
      if (error) {
        setErrors(prev => ({ ...prev, [fieldName]: error }));
        return true
      } else {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[fieldName];
          return false;
        });
      }
    }
  
  async function handleSubmit(e) {
     e.preventDefault();

    const cpfValido = handleFieldChange('cpf', formData.cpf, true);
    const emailValido = handleFieldChange('email', formData.email, true);
    const nomeValido = handleFieldChange('name', formData.name, true);

    if (cpfValido || emailValido || nomeValido)
      return;
    
    if (!validateFormData()) {
      return;
    }const payload = {
      name: formData.name,
      gender: formData.gender === "Masculino" ? GenderType.Male : 
              formData.gender === "Feminino" ? GenderType.Female : GenderType.Other,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split('T')[0] : null,
      naturality: formData.naturality || null,
      country: formData.nationality || null,
      cpf: formData.cpf || null
    };
    
    try {      
      setLoading(true);
      const result = await addPerson(payload);
      toast.success("Usuário adicionado com sucesso!");
      
      setTimeout(() => {
        onUserAdded();
        onClose();
      }, 1500);
      console.error('Error adding user:', error);
      
      handleApiError(error, setErrors);
    } finally {
      setLoading(false);
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
        {loading && (
          <LoadingOverlay>
            <LoadingSpinner />
            <LoadingText>Adicionando usuário...</LoadingText>
          </LoadingOverlay>
        )}
        <ToastContainer />
        <h2>
          <FaUserPlus style={{ marginRight: '10px', verticalAlign: 'middle' }} />
          Adicionar Usuário
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Digite o nome completo"
              className={errors.name ? 'has-error' : ''}
            />
            {errors.name && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.name}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="exemplo@email.com"
              className={errors.email ? 'has-error' : ''}
            />
            {errors.email && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.email}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input 
              id="cpf"
              type="text" 
              name="cpf"
              value={formData.cpf}
              onChange={handleChange} 
              placeholder="Ex: 123.456.789-00"
              maxLength={14}
              className={errors.cpf ? 'has-error' : ''}
            />
            {errors.cpf && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.cpf}
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="gender">Sexo</label>
            <select 
              id="gender"
              name="gender" 
              value={formData.gender} 
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dateOfBirth">Data de Nascimento</label>
            <input 
              id="dateOfBirth"
              type="date" 
              name="dateOfBirth" 
              value={formData.dateOfBirth} 
              onChange={handleChange} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="naturality">Naturalidade</label>
            <input 
              id="naturality"
              type="text" 
              name="naturality" 
              value={formData.naturality} 
              onChange={handleChange}
              placeholder="Cidade de nascimento" 
            />
          </div>

          <div className="form-group">
            <label htmlFor="nationality">Nacionalidade</label>
            <input 
              id="nationality"
              type="text" 
              name="nationality" 
              value={formData.nationality} 
              onChange={handleChange}
              placeholder="País de origem" 
            />
          </div>
          


          <div className="form-group">
            <label htmlFor="profilePic">Foto de Perfil</label>
            <input 
              id="profilePic"
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
            />
          </div>

          {preview && (
            <Photo>
              <img src={preview} alt="Prévia da foto de perfil" />
            </Photo>
          )}

          <ButtonContainer>
            <Button 
              type="button" 
              title="Cancelar" 
              icon={<FaTimes />}
              onClick={onClose} 
              colorButton="#777777" 
              disabled={loading}
            />            <Button 
              type="submit" 
              title={loading ? "Adicionando..." : "Adicionar Usuário"} 
              icon={<FaSave />}
              colorButton="#02ffff" 
              loading={loading}
              disabled={loading}
            />
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}