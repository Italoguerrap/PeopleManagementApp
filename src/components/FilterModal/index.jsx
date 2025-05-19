import React, { useState } from "react";
import { ModalOverlay, ModalContent, ButtonContainer } from "./styles";
import { Button } from "../../components/button";
import { searchPeople, GenderType } from "../../services/api";
import { toast } from "react-toastify";
import { formatCPF } from "../../services/validation";

export function FilterModal({ onClose, onFilterApplied }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    naturality: "",
    nationality: "",
    cpf: "",
  });
  const [loading, setLoading] = useState(false);
  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "cpf") {
      setFormData((prev) => ({ ...prev, [name]: formatCPF(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      
      const queryData = { ...formData };
      
      Object.keys(queryData).forEach(key => {
        if (queryData[key] === "" || queryData[key] === null || queryData[key] === undefined) {
          delete queryData[key];
        }
      });
      
      if (queryData.gender) {
        switch(queryData.gender) {
          case "Masculino":
            queryData.gender = "Male";
            break;
          case "Feminino":
            queryData.gender = "Female";
            break;
          default:
            queryData.gender = "Other";
        }
      }
      
      if (queryData.cpf) {
        queryData.cpf = queryData.cpf.replace(/\D/g, '');
      }
      
      if (queryData.dateOfBirth) {
        queryData.dateOfBirth = queryData.dateOfBirth;
      }

  
      const results = await searchPeople(queryData);

      let filteredResults = [...results];

      if (formData.email) {
        filteredResults = filteredResults.filter((user) =>
          user.email?.toLowerCase().includes(formData.email.toLowerCase()),
        );
      }
      if (formData.gender) {

        let genderValue;
        switch(formData.gender) {
          case "Masculino":
            genderValue = GenderType.Male;
            break;
          case "Feminino":
            genderValue = GenderType.Female;
            break;
          default:
            genderValue = GenderType.Other;
        }

        if (genderValue !== undefined && genderValue !== null) {
          filteredResults = filteredResults.filter(
            (user) => user.gender === genderValue,
          );
        }
      }if (formData.cpf) {
        const formattedCpf = formData.cpf.replace(/\D/g, '');
        filteredResults = filteredResults.filter((user) =>
          user.cpf?.replace(/\D/g, '').includes(formattedCpf),
        );
      }

      if (onFilterApplied) {
        onFilterApplied(filteredResults);
      }

      if (filteredResults.length === 0) {
        toast.info("Nenhum usuário encontrado com os filtros aplicados");
      } else {
        toast.success(
          `${filteredResults.length} usuário${filteredResults.length !== 1 ? "s" : ""} encontrado${filteredResults.length !== 1 ? "s" : ""}`,
        );
      }      onClose();
    } catch (error) {
      console.error("Erro ao aplicar filtros:", error);
      
      if (error.message && error.message.includes("Gender must be")) {
        toast.error("Erro de validação: O gênero deve ser 'Male', 'Female', ou 'Other'");
      } else {
        toast.error("Erro ao aplicar filtros: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {" "}
        <h2>Filtros</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nome: <br />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Filtrar por nome"
            />
          </label>
          <label>
            Email:
            <br />
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Filtrar por email"
            />
          </label>
          <label>
            Sexo:
            <br />{" "}
            <select
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
            Data de Nascimento:
            <br />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </label>
          <label>
            Naturalidade:
            <br />
            <input
              type="text"
              name="naturality"
              value={formData.naturality}
              onChange={handleChange}
              placeholder="Filtrar por naturalidade"
            />
          </label>
          <label>
            Nacionalidade:
            <br />
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Filtrar por nacionalidade"
            />
          </label>
          <label>
            CPF:
            <br />
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="Filtrar por CPF"
            />{" "}
          </label>{" "}
          <ButtonContainer>
            <Button
              type="submit"
              title={loading ? "Aplicando..." : "Aplicar Filtros"}
              colorButton="#00ff00"
              loading={loading}
            />
            <Button
              type="button"
              title="Limpar"
              onClick={() =>
                setFormData({
                  name: "",
                  email: "",
                  gender: "",
                  dateOfBirth: "",
                  naturality: "",
                  nationality: "",
                  cpf: "",
                })
              }
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
