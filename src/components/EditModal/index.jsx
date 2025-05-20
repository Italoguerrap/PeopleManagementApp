import { useState, useEffect } from "react";
import { ModalOverlay, ModalContent, ButtonContainer } from "./styles";
import { Button } from "../../components/button";
import { updatePerson, GenderType } from "../../services/api";
import { toast } from "react-toastify";
import { FaUserEdit, FaSave, FaTimes } from "react-icons/fa";
import { formatCPF } from "../../services/validation";
import {
  validateField,
  validateForm,
  handleApiError,
} from "../../services/formUtils";
import { countryNames } from "../../services/countries";

export function EditModal({ user, onClose, onUserUpdated }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [sex, setSex] = useState(user?.gender || 0);
  const [birthDate, setBirthDate] = useState(
    user?.dateOfBirth ? user.dateOfBirth.slice(0, 10) : "",
  );
  const [naturality, setNaturality] = useState(user?.naturality || "");
  const [nationality, setNationality] = useState(user?.nationality || "");
  const [cpf, setCpf] = useState(user?.cpf || "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");

    switch (user?.gender) {
      case "Male":
        setSex("Masculino");
        break;
      case "Female":
        setSex("Feminino");
        break;
      default:
        setSex("Outro");
        break;
    }

    if (user?.dateOfBirth) {
      setBirthDate(user.dateOfBirth.slice(0, 10));
    } else {
      setBirthDate("");
    }

    setNaturality(user?.naturality || "");
    setNationality(user?.nationality || "");
    setCpf(user?.cpf ? formatCPF(user.cpf) : "");
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

  function handleFieldChange(fieldName, value, isSubmit = false) {
    switch (fieldName) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "sex":
        setSex(value);
        break;
      case "birthDate":
        setBirthDate(value);
        break;
      case "naturality":
        setNaturality(value);
        break;
      case "nationality":
        setNationality(value);
        break;
      case "cpf":
        setCpf(formatCPF(value));
        break;
    }

    const error = validateField(fieldName, value, isSubmit);

    if (error) {
      setErrors((prev) => ({ ...prev, [fieldName]: error }));
      return true;
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return false;
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name,
      email,
      cpf,
    };

    const cpfValido = handleFieldChange("cpf", formData.cpf, true);
    const emailValido = handleFieldChange("email", formData.email, true);
    const nomeValido = handleFieldChange("name", formData.name, true);

    if (cpfValido || emailValido || nomeValido) return;

    const { errors: validationErrors, isValid } = validateForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      const firstError = Object.values(validationErrors)[0];
      if (firstError) {
        toast.error(firstError);
      }
      return;
    }

    try {
      setLoading(true);

      let gender;

      switch (sex) {
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
      
      const personData = {
        name,
        email,
        gender: gender,
        dateOfBirth: birthDate
          ? new Date(birthDate).toISOString().split("T")[0]
          : null,
        naturality,
        nationality: nationality,
        cpf,
      };
      const updatedUser = await updatePerson(user.cpf, personData);
      toast.success("Usuário atualizado com sucesso!");

      if (onUserUpdated) {
        onUserUpdated(updatedUser);
        setTimeout(() => {
          onClose();
        }, 1000);
      }
    } catch (error) {
      // Destaque visual para campo com erro de CPF
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
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>
          <FaUserEdit
            style={{ marginRight: "10px", verticalAlign: "middle" }}
          />
          Editar Usuário
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
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
              value={email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
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
              value={cpf}
              onChange={(e) => handleFieldChange("cpf", e.target.value)}
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
            <label htmlFor="sex">Sexo</label>
            <select
              id="sex"
              name="sex"
              value={sex}
              onChange={(e) => handleFieldChange("sex", e.target.value)}
              className={errors.sex ? "has-error" : ""}
            >
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
            </select>
            {errors.sex && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.sex}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Data de Nascimento</label>
            <input
              id="birthDate"
              type="date"
              name="birthDate"
              value={birthDate}
              onChange={(e) => handleFieldChange("birthDate", e.target.value)}
              className={errors.birthDate ? "has-error" : ""}
            />
            {errors.birthDate && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.birthDate}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="naturality">Naturalidade</label>
            <input
              id="naturality"
              type="text"
              name="naturality"
              value={naturality}
              onChange={(e) => handleFieldChange("naturality", e.target.value)}
              placeholder="Cidade de nascimento"
              className={errors.naturality ? "has-error" : ""}
            />
            {errors.naturality && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.naturality}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nationality">Nacionalidade</label>
            <select
              id="nationality"
              name="nationality"
              value={nationality}
              onChange={(e) => handleFieldChange("nationality", e.target.value)}
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
              title="Cancelar"
              icon={<FaTimes />}
              onClick={onClose}
              colorButton="#777777"
              disabled={loading}
            />
            <Button
              title="Salvar"
              icon={<FaSave />}
              colorButton="#02ffff"
              type="submit"
              loading={loading}
            />
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
}
