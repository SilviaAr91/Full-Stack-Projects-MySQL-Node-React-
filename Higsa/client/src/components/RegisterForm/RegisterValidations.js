export const validateRegisterField = async (name, value, formData) => {
  let errorMessage = "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name === "company_name" && value.length > 100) {
    errorMessage =
      "El nombre de la empresa no puede contener más de 100 caracteres";
  } else if (name === "password" && value.length < 8) {
    errorMessage = "La contraseña debe contener al menos 8 caracteres";
  } else if (name === "cif" && value.length != 9) {
    errorMessage = "El CIF debe contener 9 caracteres";
  } else if (name === "address" && value.length > 100) {
    errorMessage = "La dirección no puede contener más de 100 caracteres";
  } else if (name === "address2" && value.length > 100) {
    errorMessage =
      "La dirección adicional no puede contener más de 100 caracteres";
  } else if (name === "name" && value.length > 100) {
    errorMessage =
      "El nombre de la persona de contacto no puede contener más de 100 caracteres";
  } else if (name === "lastname" && value.length > 100) {
    errorMessage =
      "El apellido de la persona de contacto no puede contener más de 100 caracteres";
  } else if (name === "contact_phone" && value.length > 20) {
    errorMessage =
      "El teléfono de contacto no puede contener más de 20 caracteres";
  } else if (name === "contact_phone" && isNaN(value)) {
    errorMessage = "Este campo debe ser numérico";
  } else if (name === "company_phone" && value.length > 20) {
    errorMessage =
      "El teléfono de la empresa no puede contener más de 20 caracteres";
  } else if (name === "company_phone" && isNaN(value)) {
    errorMessage = "Este campo debe ser numérico";
  } else if (name === "email" && value.length > 100) {
    errorMessage =
      "El correo electrónico no puede contener más de 100 caracteres";
  } else if (name === "email" && !emailRegex.test(value)) {
    errorMessage = "El correo electrónico debe tener un formato válido";
  } else if (name === "password2" && formData.password !== value) {
    errorMessage = "Las contraseñas no coinciden";
  } else if (name === "email" && formData.emailExists) {
    errorMessage = "El correo electrónico ya está registrado";
  }

  return errorMessage;
};
