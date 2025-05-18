import React, { useState } from 'react';
import { ModalOverlay, ModalContent, ButtonContainer } from './styles';
import { Button } from '../../components/button';
import { searchPeople, GenderType } from '../../services/api';
import { ToastContainer, toast } from 'react-toastify';
import { formatCPF } from '../../services/validation';

export function FilterModal({ onClose, onFilterApplied }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    dateOfBirth: '',
    naturality: '',
    country: '',
    cpf: ''
  });
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData(prev => ({ ...prev, [name]: formatCPF(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      setLoading(true);

      const query = JSON.stringify(formData);
      
      console.log("Query: ", query);

      const results = await searchPeople(query);
      
      let filteredResults = [...results];
      
      if (formData.email) {
        filteredResults = filteredResults.filter(user => 
          user.email?.toLowerCase().includes(formData.email.toLowerCase())
        );
      }
      
      if (formData.gender) {
        const genderValue = formData.gender === 'Masculino' ? GenderType.Male : 
                           formData.gender === 'Feminino' ? GenderType.Female : null;
        
        if (genderValue !== null) {
          filteredResults = filteredResults.filter(user => user.gender === genderValue);
        }
      }
      
      if (formData.cpf) {
        filteredResults = filteredResults.filter(user => 
          user.cpf?.includes(formData.cpf)
        );
      }

      if (onFilterApplied) {
        onFilterApplied(filteredResults);
      }
      
      if (filteredResults.length === 0) {
        toast.info("Nenhum usuário encontrado com os filtros aplicados");
      } else {
        toast.success(`${filteredResults.length} usuário${filteredResults.length !== 1 ? 's' : ''} encontrado${filteredResults.length !== 1 ? 's' : ''}`);
      }
      onClose();
    } catch (error) {
      toast.error("Erro ao aplicar filtros: " + error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>        <h2>Filtros</h2>
        <ToastContainer />
        
        <form onSubmit={handleSubmit}>
          <label>
            Nome: <br/>
            <input 
              type="text" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              placeholder="Filtrar por nome"
            />
          </label>

          <label>
            Email:<br />
            <input 
              type="text" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder="Filtrar por email"
            />
          </label>

          <label>
            Sexo:<br />            <select 
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
          </label>

          <label>
            Data de Nascimento:<br />
            <input 
              type="date" 
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </label>

          <label>
            Naturalidade:<br />
            <input 
              type="text" 
              name="naturality"
              value={formData.naturality}
              onChange={handleChange}
              placeholder="Filtrar por naturalidade"
            />
          </label>

          <label>
            Nacionalidade:<br />
            <input 
              type="text" 
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Filtrar por nacionalidade"
            />
          </label>

          <label>
            CPF:<br />
            <input 
              type="text" 
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Filtrar por CPF"
            />          </label>        <ButtonContainer>
          <Button 
            type="submit" 
            title={loading ? "Aplicando..." : "Aplicar Filtros"} 
            colorButton="#00ff00"
            loading={loading}
          />
          <Button 
            type="button" 
            title="Limpar" 
            onClick={() => setFormData({
              name: '',
              email: '',
              gender: '',
              dateOfBirth: '',
              naturality: '',
              country: '',
              cpf: ''
            })} 
            colorButton="#ff9800"
            disabled={loading}
          />
          <Button 
            type="button" 
            title="Fechar" 
            onClick={onClose} 
            colorButton="#ff0000"
            disabled={loading}
          />
        </ButtonContainer>
        </form>   
           </ModalContent>
    </ModalOverlay>
  );
}