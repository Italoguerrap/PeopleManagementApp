export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateName(name) {
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  return nameRegex.test(name);
}

export function validateCPF(cpf, isSubmit = false) {
  if (!isSubmit && (cpf === null || cpf === undefined || cpf === "")) return true;
  
  if (isSubmit && (cpf === null || cpf === undefined || cpf === "")) return false;

  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) return false;

  if (/^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let dv1 = resto > 9 ? 0 : resto;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let dv2 = resto > 9 ? 0 : resto;

  return (parseInt(cpf.charAt(9)) === dv1 && parseInt(cpf.charAt(10)) === dv2);
}

export function formatCPF(value) {
  value = value.replace(/\D/g, "");

  if (value.length <= 11) {
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  return value;
}

export function formatDate(dateString) {
  if (!dateString) return "";

  try {
    return new Date(dateString).toLocaleDateString("pt-BR");
  } catch (e) {
    return "";
  }
}

export function extractValidationErrors(errorText) {
  const errors = {};

  if (errorText.includes("FluentValidation.ValidationException")) {
    if (errorText.includes("Name:")) {
      const nameMatch = errorText.match(/Name: (.*?)(?=\. Severity|$)/);
      if (nameMatch && nameMatch[1]) {
        errors.name = nameMatch[1].trim();
      }
    }

    if (errorText.includes("CPF:")) {
      const cpfMatch = errorText.match(/CPF: (.*?)(?=\. Severity|$)/);
      if (cpfMatch && cpfMatch[1]) {
        errors.cpf = cpfMatch[1].trim();
      }
    }

    if (errorText.includes("Email:")) {
      const emailMatch = errorText.match(/Email: (.*?)(?=\. Severity|$)/);
      if (emailMatch && emailMatch[1]) {
        errors.email = emailMatch[1].trim();
      }
    }

    if (errorText.includes("DateOfBirth:")) {
      const dateMatch = errorText.match(/DateOfBirth: (.*?)(?=\. Severity|$)/);
      if (dateMatch && dateMatch[1]) {
        errors.dateOfBirth = dateMatch[1].trim();
      }
    }
  }

  return errors;
}
