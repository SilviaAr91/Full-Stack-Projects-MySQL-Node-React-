import { Form, Button } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import "./forgotpass.scss";
export const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:4000/users/forgotPass", { email })
      .then((res) => {
        console.log("data recibida del back", res.data);
        setMessage("Mail enviado");
      })
      .catch((err) => {
        setMessage("Error al enviar email");
      });
  };
  return (
    <div className="page-container-forgot">
      <h1 className="forgot-title">Ingrese el email</h1>
      <Form className="form-forgot">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Introduce el email"
            value={email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div className="boton-container">
          <Button onClick={handleSubmit} className="boton">
            Aceptar
          </Button>
        </div>
        {message && <div>{message}</div>}
      </Form>
    </div>
  );
};
