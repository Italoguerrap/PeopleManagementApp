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
      if (validateCPF(value, isSubmit)) {
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
  console.error("API error:", error);

  if (error.fieldErrors) {
    setErrors((prev) => ({ ...prev, ...error.fieldErrors }));
    // Exibe o primeiro erro no toast
    const firstError = Object.values(error.fieldErrors)[0];
    if (firstError) toast.error(firstError);
  } else if (error.global) {
    toast.error(error.global);
  } else if (error.message) {
    toast.error(error.message);
  } else {
    toast.error("Ocorreu um erro inesperado");
  }
}
