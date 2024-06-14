import React from "react";
import axios from "axios";
import { useState } from "react";
import "./successfulRegistration.css";

export const SuccessfulRegistration = () => {
  return (
    <>
      <section className="container-success-registration font-style1">
        <h1 className="text-center">¡Bienvenido/a!</h1>
        <hr className="custom-hr-register" />
        <div className="font-style-register-2 text-center p-2">
          ¡Gracias por registrarte en Higsa! 
          </div>
         <p className= "font-style-register-2 mt-3 text-center"> Hemos enviado un enlace de validación a tu
          dirección de correo electrónico para proceder con el inicio de sesión de tu usuario </p>
          </section>
          </>
         
       
      
   
  );
};
