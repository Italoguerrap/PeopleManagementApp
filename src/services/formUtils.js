import { toast } from "react-toastify";
import { validateEmail, validateName, validateCPF } from "./validation";

export function validateField(fieldName, value, isSubmit = false) {
  let error = null;

  if (isSubmit == false) return error;

  switch (fieldName) {
    case "name":
      if (!value?.trim()) {
        error = "Nome é obrigatório";
      } else if (!validateName(value)) {
        error =
          "O nome deve conter apenas letras, espaços, apóstrofos ou hífens";
      }
      break;

    case "email":
      if (!value?.trim()) {
        error = "Email é obrigatório";
      } else if (!validateEmail(value)) {
        error = "Email inválido";
      }
      break;

    case "cpf":
      if (!value?.trim()) {
        error = "CPF é obrigatório";
      } else if (!validateCPF(value, isSubmit)) {
        error = "CPF inválido";
      }
      break;
  }

  return error;
}

export function validateForm(formData) {
  const errors = {};
  let isValid = true;

  const nameError = validateField("name", formData.name);
  if (nameError) {
    errors.name = nameError;
    isValid = false;
  }

  const emailError = validateField("email", formData.email);
  if (emailError) {
    errors.email = emailError;
    isValid = false;
  }

  const cpfError = validateField("cpf", formData.cpf);
  if (cpfError) {
    errors.cpf = cpfError;
    isValid = false;
  }

  return { errors, isValid };
}

export function handleApiError(error, setErrors) {
  
  if (error.fieldErrors) {
    setErrors((prev) => ({ ...prev, ...error.fieldErrors }));
    
    let priorityError = null;
    if (error.fieldErrors.cpf) {
      priorityError = error.fieldErrors.cpf;
      // Adiciona um destaque visual de erro para o campo CPF
      const cpfInput = document.getElementById('cpf');
      if (cpfInput) {
        cpfInput.classList.add('has-error');
        // Aplica uma animação suave para chamar atenção
        cpfInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
          cpfInput.style.animation = '';
        }, 500);
      }
    } else if (error.fieldErrors.email) {
      priorityError = error.fieldErrors.email;
    } else if (error.fieldErrors.name) {
      priorityError = error.fieldErrors.name;
    } else {
      priorityError = Object.values(error.fieldErrors)[0];
    }
    
    if (priorityError) {
      toast.error(priorityError);
    }
  } else if (error.global) {
    toast.error(error.global);
  } else if (error.message) {

    if (error.message && error.message.toLowerCase().includes("cpf") && 
        (error.message.includes("já cadastrado") || 
         error.message.includes("já existe") ||
         error.message.includes("pertence a outro") ||
         error.message.includes("duplicate") ||
         error.message.includes("já registrado") ||
         error.message.includes("already exists"))) {
      const cpfError = "CPF já cadastrado no sistema. Por favor, utilize outro CPF.";
      setErrors((prev) => ({ ...prev, cpf: cpfError }));
      toast.error(cpfError);
    } else {
      toast.error(error.message);
    }
  } else {
    toast.error("Ocorreu um erro inesperado");
  }
}
