const { body } = require('express-validator')

validateUserRules = [
  // Validaciones usando express-validator
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("lastname").notEmpty().withMessage("El apellido es obligatorio"),
  body("email").isEmail().withMessage("Debe ser un correo válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("cif").notEmpty().withMessage("El CIF es obligatorio"),
  body("address").notEmpty().withMessage("La dirección es obligatoria"),
  body("contact_phone")
    .notEmpty()
    .withMessage("El teléfono de contacto es obligatorio"),
  body("company_name")
    .notEmpty()
    .withMessage("El nombre de la empresa es obligatorio"),
  body("company_phone")
    .notEmpty()
    .withMessage("El teléfono de la empresa es obligatorio"),
  body("password2").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  })]

module.exports = validateUserRules;


/* [
  // Validaciones usando express-validator
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("lastname").notEmpty().withMessage("El apellido es obligatorio"),
  body("email").isEmail().withMessage("Debe ser un correo válido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("cif").notEmpty().withMessage("El CIF es obligatorio"),
  body("address").notEmpty().withMessage("La dirección es obligatoria"),
  body("contact_phone")
    .notEmpty()
    .withMessage("El teléfono de contacto es obligatorio"),
  body("company_name")
    .notEmpty()
    .withMessage("El nombre de la empresa es obligatorio"),
  body("company_phone")
    .notEmpty()
    .withMessage("El teléfono de la empresa es obligatorio"),
  body("password2").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Las contraseñas no coinciden");
    }
    return true;
  }) */