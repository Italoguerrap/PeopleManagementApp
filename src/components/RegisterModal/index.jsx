import { useState } from "react";
import {
  ModalOverlay,
  ModalContent,
  ButtonContainer,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
} from "./styles";
import { Button } from "../../components/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUserPlus, FaSave, FaTimes } from "react-icons/fa";
import { formatCPF } from "../../services/validation";
import { addPerson } from "../../services/api";
import {
  validateField,
  validateForm,
  handleApiError,
} from "../../services/formUtils";
import { countryNames } from "../../services/countries";

export function RegisterModal({ onClose, onRegistrationSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    naturality: "",
    nationality: "",
    cpf: "",
    password: "",
  });

  function handleChange(e) {
    let { name, value } = e.target;

    if (e.target.name === "cpf") {
      value = formatCPF(e.target.value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    const error = validateField(name, value);

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }
  function validateFormData() {
    const validationResult = validateForm(formData);
    let isFormValid = validationResult.isValid;
    const validationErrors = validationResult.errors;

    if (!formData.password) {
      validationErrors.password = "Senha é obrigatória";
      isFormValid = false;
    } else if (formData.password.length < 6) {
      validationErrors.password = "A senha deve ter pelo menos 6 caracteres";
      isFormValid = false;
    }

    if (!isFormValid) {
      setErrors(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      if (firstError) {
        toast.error(firstError);
      }
    }

    return isFormValid;
  }

  function handleFieldChange(fieldName, value, isSubmit = false) {
    const error = validateField(fieldName, value, isSubmit);

    if (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
      return true;
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const cpfValido = handleFieldChange("cpf", formData.cpf, true);
    const emailValido = handleFieldChange("email", formData.email, true);
    const nomeValido = handleFieldChange("name", formData.name, true);
    
    let passwordValido = false;
    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: "Senha é obrigatória" }));
      passwordValido = true;
    } else if (formData.password.length < 6) {
      setErrors(prev => ({ ...prev, password: "A senha deve ter pelo menos 6 caracteres" }));
      passwordValido = true;
    }

    let gender;

    switch (formData.gender) {
      case "Masculino":
        gender = "Male";
        break;
      case "Feminino":
        gender = "Female";
        break;
      default:
        gender = "Other";
        break;
    }

    if (cpfValido || emailValido || nomeValido || passwordValido) return;

    if (!validateFormData()) {
      return;
    }
      const payload = {
      name: formData.name,
      gender: gender,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth
        ? new Date(formData.dateOfBirth).toISOString().split("T")[0]
        : null,
      naturality: formData.naturality || null,
      nationality: formData.nationality || null,
      cpf: formData.cpf ? formData.cpf.replace(/\D/g, '') : null,
      password: formData.password,
    };
    
    try {
      setLoading(true);
      const result = await addPerson(payload);
      toast.success("Cadastro realizado com sucesso! Você já pode fazer login.");

      setTimeout(() => {
        if (onRegistrationSuccess) {
          onRegistrationSuccess(result);
        }
        onClose();
      }, 1500);    } catch (error) {
      // Scroll to the CPF field if it has an error
      if (error.fieldErrors && error.fieldErrors.cpf) {
        const cpfField = document.getElementById('cpf');
        if (cpfField) {
          cpfField.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => cpfField.focus(), 500);
        }
      }
      
      handleApiError(error, setErrors);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>        {loading && (
          <LoadingOverlay>
            <LoadingSpinner />
            <LoadingText>Cadastrando...</LoadingText>
          </LoadingOverlay>
        )}
        <h2>
          <FaUserPlus
            style={{ marginRight: "10px", verticalAlign: "middle" }}
          />
          Cadastrar Novo Usuário
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
              className={errors.name ? "has-error" : ""}
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
              className={errors.email ? "has-error" : ""}
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
              className={errors.cpf ? "has-error" : ""}
            />
            {errors.cpf && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.cpf}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite uma senha segura"
              className={errors.password ? "has-error" : ""}
            />
            {errors.password && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.password}
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
          </div>          <div className="form-group">
            <label htmlFor="nationality">Nacionalidade</label>
            <select
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className={errors.nationality ? "has-error" : ""}
            >
              <option value="">Selecione</option>
              {countryNames.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.nationality && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.nationality}
              </div>
            )}
          </div>

          <ButtonContainer>
            <Button
              type="button"
              title="Cancelar"
              icon={<FaTimes />}
              onClick={onClose}
              colorButton="#777777"
              disabled={loading}
            />{" "}
            <Button
              type="submit"
              title={loading ? "Cadastrando..." : "Cadastrar"}
              icon={<FaSave />}
              colorButton="#4CAF50"
              loading={loading}
              disabled={loading}
            />
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
