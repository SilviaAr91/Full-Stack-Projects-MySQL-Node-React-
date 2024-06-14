import axios from "axios";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./registerform.css";
import { DesktopRegisterForm } from "./DesktopRegisterForm";
import { MobileRegisterForm } from "./MobileRegisterForm";
import { validateRegisterField } from "./RegisterValidations";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    company_name: "",
    cif: "",
    address: "",
    address2: "",
    company_phone: "",
    email: "",
    name: "",
    lastname: "",
    contact_phone: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailExists, setEmailExists] = useState(null);

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 });
  const isMobile = useMediaQuery({ maxWidth: 1224 });

  const handleChange = async (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    const errorMessage = await validateRegisterField(name, value, formData);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    if (name === "email") {
      try {
        const response = await axios.get(
          `http://localhost:4000/users/check-email/${value}`
        );
        setEmailExists(response.data.exists);
      } catch (error) {
        console.error("Error al verificar el correo electrónico:", error);
        setEmailExists(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisibility) => !prevVisibility);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario", formData);
    axios
      .post("http://localhost:4000/users/register", formData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          console.log("Registro exitoso");
          window.location.href = "/registration-success";
        } else {
          console.error("Error al registrar");
        }
      })
      .catch((error) => {
        console.error("Error de red: " + error.error);
      });
  };

  return (
    <section>
      {isMobile && (
        <MobileRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          step={step}
          setStep={setStep}
          errors={errors}
          passwordVisible={passwordVisible}
          togglePasswordVisibility={togglePasswordVisibility}
          emailExists={emailExists}
        />
      )}
      {isDesktopOrLaptop && (
        <DesktopRegisterForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          togglePasswordVisibility={togglePasswordVisibility}
          errors={errors}
          passwordVisible={passwordVisible}
          emailExists={emailExists}
        />
      )}
    </section>
  );
};
