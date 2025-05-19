const API_BASE_URL = "http://localhost:5097/api/v1";
const PEOPLE_ENDPOINT = `${API_BASE_URL}/People`;
const AUTH_ENDPOINT = `${API_BASE_URL}/Auth`;

async function safeParseJson(response, defaultValue = {}) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const text = await response.text();
    return text ? JSON.parse(text) : defaultValue;
  }
  return defaultValue;
}

function getAuthHeader() {
  const token = localStorage.getItem("accessToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function parseBackendValidationError(errorText) {
  let fieldErrors = {};
  let global = null;
    if (typeof errorText === 'string') {
    // Expanded pattern matching for CPF duplication errors
    if (errorText.toLowerCase().includes('cpf') && (
        errorText.includes('já cadastrado') || 
        errorText.includes('já existe') ||
        errorText.includes('pertence a outro') ||
        errorText.includes('duplicate') ||
        errorText.includes('já registrado') ||
        errorText.includes('already exists'))) {
      fieldErrors.cpf = "CPF já cadastrado no sistema. Por favor, utilize outro CPF.";
      return { fieldErrors, global: null };
    }
  }
  
  try {
    const err = JSON.parse(errorText);
    if (err && err.errors) {
      for (const key in err.errors) {
        fieldErrors[key.toLowerCase()] = err.errors[key][0];
      }
      global = err.title || null;
    } else if (err.title) {
      global = err.title;
    } else {
      global = errorText;
    }
  } catch {
    global = errorText;
  }
  return { fieldErrors, global };
}

export const GenderType = {
  Other: 0,
  Female: 1,
  Male: 2,
};

// Authentication functions
export async function login(cpf, password) {
  try {
    const response = await fetch(`${AUTH_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ cpf, password }),
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();
      const { fieldErrors, global } = parseBackendValidationError(errorText);

      if (Object.keys(fieldErrors).length > 0) {
        throw { fieldErrors, global };
      }

      throw { global: global || "Credenciais inválidas" };
    }
    
    return safeParseJson(response, {});
  } catch (error) {
    if (
      error.message &&
      (error.message.includes("Failed to fetch") || error.name === "TypeError")
    ) {
      throw {
        global:
          "Não foi possível conectar ao servidor. Verifique sua conexão de internet ou tente novamente mais tarde.",
      };
    }

    throw error;
  }
}

export function isAuthenticated() {
  const token = localStorage.getItem("accessToken");
  const expiration = localStorage.getItem("tokenExpiration");
  
  if (!token || !expiration) {
    return false;
  }
  
  // Check if token is expired
  const expirationDate = new Date(expiration);
  const now = new Date();
  
  return now < expirationDate;
}

export async function refreshToken() {
  const token = localStorage.getItem("accessToken");
  
  if (!token) {
    return false;
  }
  
  try {
    const response = await fetch(`${AUTH_ENDPOINT}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ token }),
      mode: "cors",
    });
    
    if (!response.ok) {
      // If refresh fails, log the user out
      logout();
      return false;
    }
    
    const data = await safeParseJson(response, {});
    
    if (data.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("tokenExpiration", data.expiration);
      return true;
    }
    
    return false;
  } catch (error) {
    return false;
  }
}

export function logout() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userCpf");
  localStorage.removeItem("tokenExpiration");
}

export async function searchPeople(queryData = {}) {
  try {
    const params = new URLSearchParams();
    
    let queryObj = {};
    
    if (queryData) {
      if (typeof queryData === 'object' && queryData !== null) {
        queryObj = queryData;
      } 
      else if (typeof queryData === 'string' && queryData.trim() !== '') {
        try {
          queryObj = JSON.parse(queryData);
        } catch (e) {
          if (queryData.trim()) {
            queryObj = { name: queryData.trim() };
          }
        }
      }
    }
    
    Object.entries(queryObj).forEach(([key, value]) => {
      if (value && value !== "") {
        const paramName = key.charAt(0).toUpperCase() + key.slice(1);
        params.append(paramName, value);
      }
    });
    
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...getAuthHeader()
    };
    
    const response = await fetch(`${PEOPLE_ENDPOINT}?${params.toString()}`, {
      method: "GET",
      headers,
      mode: "cors",
    });    if (!response.ok) {
      const errorText = await response.text();
      
      try {
        const errorObj = JSON.parse(errorText);
        
        if (errorObj.errors) {
          const errorMessages = [];
          for (const key in errorObj.errors) {
            errorMessages.push(`${key}: ${errorObj.errors[key].join(', ')}`);
          }
          
          if (errorMessages.length > 0) {
            throw new Error(`Validation errors: ${errorMessages.join('; ')}`);
          }
        }
        
        throw new Error(`Error fetching people: ${errorObj.title || JSON.stringify(errorObj)}`);
      } catch (e) {
        if (e.message.includes('Validation errors')) {
          throw e;
        }
        throw new Error(`Error fetching people: ${errorText}`);
      }
    }
    return safeParseJson(response, []);
  } catch (error) {
    if (
      error.message.includes("Failed to fetch") ||
      error.name === "TypeError"
    ) {
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique sua conexão de internet ou tente novamente mais tarde.",
      );
    }
    throw error;
  }
}

export async function addPerson(personData) {
  if (!personData.name) throw { fieldErrors: { name: "Name is required" } };
  if (!personData.email) throw { fieldErrors: { email: "Email is required" } };
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...getAuthHeader()
    };
    
    // Clean the CPF before sending to ensure proper format
    if (personData.cpf) {
      personData.cpf = personData.cpf.replace(/\D/g, '');
    }
    
    const response = await fetch(PEOPLE_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify(personData),
      mode: "cors",
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      const { fieldErrors, global } = parseBackendValidationError(errorText);

      if (Object.keys(fieldErrors).length > 0) {
        throw { fieldErrors, global };
      }      
      
      if (errorText.includes("FluentValidation.ValidationException")) {
        if (errorText.includes("Nome deve conter apenas letras")) {
          throw {
            fieldErrors: {
              name: "O nome deve conter apenas letras, espaços, apóstrofos ou hífens",
            },
          };
        } else if (errorText.includes("CPF que já pertence a outro usuário")) {
          throw {
            fieldErrors: {
              cpf: "CPF já cadastrado no sistema. Por favor, verifique o número informado",
            },
          };
        }
      }
        if (errorText.includes("Este CPF já está cadastrado") || 
          errorText.includes("CPF já cadastrado") || 
          errorText.includes("já existe") || 
          errorText.includes("CPF") && errorText.includes("pertence a outro usuário") ||
          errorText.includes("CPF já existe") ||
          errorText.includes("já registrado") ||
          errorText.toLowerCase().includes("cpf") && errorText.toLowerCase().includes("duplicate")) {
        throw {
          fieldErrors: {
            cpf: "CPF já cadastrado no sistema. Por favor, utilize outro CPF.",
          },
        };
      }

      throw { global: `Erro ao adicionar usuário: ${errorText}` };
    }
    return safeParseJson(response, {});
  } catch (error) {
    if (
      error.message &&
      (error.message.includes("Failed to fetch") || error.name === "TypeError")
    ) {
      throw {
        global:
          "Não foi possível conectar ao servidor. Verifique sua conexão de internet ou tente novamente mais tarde.",
      };
    }

    throw error;
  }
}

export async function updatePerson(cpf, personData) {
  if (!cpf) throw { global: "CPF is required" };
  if (!personData.name) throw { fieldErrors: { name: "Name is required" } };
  if (!personData.email) throw { fieldErrors: { email: "Email is required" } };
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...getAuthHeader()
    };
    
    // Clean the CPF before sending to ensure proper format
    if (personData.cpf) {
      personData.cpf = personData.cpf.replace(/\D/g, '');
    }
    // Clean the original cpf parameter too if it's formatted
    cpf = cpf.replace(/\D/g, '');
    
    const response = await fetch(`${PEOPLE_ENDPOINT}/${cpf}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(personData),
      mode: "cors",
    });    if (!response.ok) {
      const errorText = await response.text();
      const { fieldErrors, global } = parseBackendValidationError(errorText);

      if (Object.keys(fieldErrors).length > 0) {
        throw { fieldErrors, global };
      }

      if (errorText.includes("CPF já cadastrado") || 
          errorText.includes("já está cadastrado") || 
          errorText.includes("pertence a outro usuário") ||
          errorText.includes("já existe")) {
        throw {
          fieldErrors: {
            cpf: "CPF já cadastrado no sistema. Não é possível utilizar um CPF que já pertence a outro usuário.",
          },
        };
      } else if (errorText.includes("CPF inválido")) {
        throw {
          fieldErrors: {
            cpf: "O CPF informado é inválido. Por favor, verifique o número.",
          },
        };
      } else if (errorText.includes("Email")) {
        throw {
          fieldErrors: {
            email:
              "Problema com o e-mail informado. Verifique se está correto ou se já está em uso.",
          },
        };
      } else if (errorText.includes("Data de nascimento")) {
        throw {
          fieldErrors: {
            dateofbirth: "Data de nascimento inválida ou no formato incorreto.",
          },
        };      }
      throw { global: `Erro ao atualizar usuário: ${errorText}` };
    }
    return safeParseJson(response, {});
  } catch (error) {
    if (
      error.message &&
      (error.message.includes("Failed to fetch") || error.name === "TypeError")
    ) {
      throw {
        global:
          "Não foi possível conectar ao servidor. Verifique sua conexão de internet ou tente novamente mais tarde.",
      };
    }
    
    // Verificar se o erro tem uma mensagem relacionada a CPF
    if (error.message && error.message.includes("CPF") && 
       (error.message.includes("já cadastrado") || 
        error.message.includes("já existe") || 
        error.message.includes("pertence a outro"))) {
      throw {
        fieldErrors: {
          cpf: "CPF já cadastrado no sistema. Por favor, utilize outro CPF."
        }
      };
    }
    
    throw error;
  }
}

export async function deletePerson(cpf) {
  if (!cpf) throw new Error("CPF is required");

  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...getAuthHeader()
    };
    
    const response = await fetch(`${PEOPLE_ENDPOINT}/${cpf}`, {
      method: "DELETE",
      headers,
      mode: "cors",
    });
    if (!response.ok) {
      const errorText = await response.text();

      if (errorText.includes("não encontrada")) {
        throw new Error("Usuário não encontrado ou já foi excluído.");
      } else if (errorText.includes("não foi possível excluir")) {
        throw new Error(
          "Não foi possível excluir o usuário. Tente novamente mais tarde.",
        );
      } else {
        throw new Error(`Erro ao excluir usuário: ${errorText}`);
      }
    }
    return safeParseJson(response, {});
  } catch (error) {
    if (
      error.message.includes("Failed to fetch") ||
      error.name === "TypeError"
    ) {
      throw new Error(
        "Não foi possível conectar ao servidor. Verifique sua conexão de internet ou tente novamente mais tarde.",
      );
    }
    throw error;
  }
}

export function formatPersonForDisplay(person) {
  if (!person) return null;

  return {
    ...person,
    genderText: getGenderText(person.gender),
    dateOfBirthFormatted: person.dateOfBirth
      ? new Date(person.dateOfBirth).toLocaleDateString("pt-BR")
      : null,
  };
}

export function getGenderText(genderValue) {
  switch (Number(genderValue)) {
    case GenderType.Female:
      return "Feminino";
    case GenderType.Male:
      return "Masculino";
    case GenderType.Other:
    default:
      return "Outro";
  }
}
