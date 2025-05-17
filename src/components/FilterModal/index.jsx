import React from 'react';
import { ModalOverlay, ModalContent, ButtonContainer } from './styles';
import { Button } from '../../components/button';

export function FilterModal({ onClose }) {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Filtros</h2>

        <form >
          <label>
            Nome: <br/>
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

        <ButtonContainer>
          <Button title="Aplicar Filtros" colorButton="#00ff00" />
          <Button title="Fechar" onClick={onClose} colorButton="#ff0000" />
        </ButtonContainer>
        </form>   
           </ModalContent>
    </ModalOverlay>
  );
}
