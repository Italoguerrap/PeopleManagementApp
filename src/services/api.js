const API_BASE_URL = "http://localhost:5097/api/v1/People";

async function safeParseJson(response, defaultValue = {}) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const text = await response.text();
    return text ? JSON.parse(text) : defaultValue;
  }
  return defaultValue;
}

function parseBackendValidationError(errorText) {
  let fieldErrors = {};
  let global = null;
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

export async function searchPeople(query = "") {
  try {
    const params = new URLSearchParams();
    if (query) {
      params.append("query", query);
    }
    const response = await fetch(`${API_BASE_URL}?${params.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      mode: "cors",
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error fetching people: ${errorText}`);
    }
    return safeParseJson(response, []);
  } catch (error) {
    console.error("Error in searchPeople:", error);
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
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
    const response = await fetch(`${API_BASE_URL}/${cpf}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(personData),
      mode: "cors",
    });

    if (!response.ok) {
      const errorText = await response.text();
      const { fieldErrors, global } = parseBackendValidationError(errorText);

      if (Object.keys(fieldErrors).length > 0) {
        throw { fieldErrors, global };
      }

      if (errorText.includes("CPF já cadastrado")) {
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
        };
      }
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
    throw error;
  }
}

export async function deletePerson(cpf) {
  if (!cpf) throw new Error("CPF is required");

  try {
    const response = await fetch(`${API_BASE_URL}/${cpf}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
    console.error("Error in deletePerson:", error);
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
