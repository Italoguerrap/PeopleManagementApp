import { useState, useEffect } from "react";
import {
  ModalOverlay,
  ModalContent,
  ButtonContainer,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  RememberMeContainer,
  GeneralError
} from "./styles";
import { Button } from "../../components/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSignInAlt, FaTimes } from "react-icons/fa";
import { formatCPF } from "../../services/validation";
import { login } from "../../services/api";
import { saveUserPreference, getRememberedUser } from "../../services/authUtils";

export function LoginModal({ onClose, onLoginSuccess }) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    cpf: "",
    password: "",
  });

  // Load remembered user on mount
  useEffect(() => {
    const rememberedUser = getRememberedUser();
    if (rememberedUser) {
      setFormData(prev => ({ ...prev, cpf: rememberedUser }));
      setRememberMe(true);
    }
  }, []);

  function handleChange(e) {
    let { name, value } = e.target;

    if (name === "cpf") {
      value = formatCPF(value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  function handleRememberMeChange(e) {
    setRememberMe(e.target.checked);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Validate form
    const newErrors = {};
    if (!formData.cpf) {
      newErrors.cpf = "CPF é obrigatório";
    }
    
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const result = await login(formData.cpf, formData.password);
      
      localStorage.setItem("accessToken", result.accessToken);
      localStorage.setItem("userCpf", result.cpf);
      localStorage.setItem("tokenExpiration", result.expiration);
      
      saveUserPreference(formData.cpf, rememberMe);
      
      toast.success("Login realizado com sucesso!");
      
      setTimeout(() => {
        onLoginSuccess(result);
        onClose();
      }, 1500);    } catch (error) {
      
      if (error.fieldErrors && Object.keys(error.fieldErrors).length > 0) {
        setErrors(error.fieldErrors);
      }
      
      toast.error("Usuário ou senha incorreta");
      
      setErrors({
        general: "Verifique suas credenciais e tente novamente."
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {loading && (
          <LoadingOverlay>            <LoadingSpinner />
            <LoadingText>Autenticando...</LoadingText>
          </LoadingOverlay>
        )}
        <h2>
          <FaSignInAlt
            style={{ marginRight: "10px", verticalAlign: "middle" }}
          />
          Login
        </h2>

        <form onSubmit={handleSubmit}>
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
            )}          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua senha"
              className={errors.password ? "has-error" : ""}
            />
            {errors.password && (
              <div className="error-message">
                <FaTimes size={12} />
                {errors.password}
              </div>
            )}
          </div>

          {errors.general && (
            <GeneralError>
              <FaTimes size={12} />
              {errors.general}
            </GeneralError>
          )}          <RememberMeContainer>
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
              />
              <span>Lembrar meu usuário</span>
            </label>
          </RememberMeContainer>

          <ButtonContainer>
            <Button
              type="button"
              title="Cancelar"
              icon={<FaTimes />}
              onClick={onClose}
              colorButton="#777777"
              disabled={loading}
            />
            <Button
              type="submit"
              title={loading ? "Autenticando..." : "Entrar"}
              icon={<FaSignInAlt />}
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
