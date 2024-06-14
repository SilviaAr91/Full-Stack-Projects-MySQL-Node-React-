import { Form, Button } from "react-bootstrap";
import "./passrecovery.scss";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export const PassRecovery = () => {
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden");
      return;
    }
    axios
      .put("http://localhost:4000/users/passwordRecovery", { password, token })
      .then((res) => {
        console.log("data recibida del back");
        setMessage("Contraseña cambiada correctamente");
        navigate("/");
      })
      .catch((err) => {
        setMessage("Error al cambiar la contraseña");
      });
  };
  return (
    <div className="page-container-recovery">
      <h1 className="recovery-title">Contraseña nueva</h1>
      <Form className="form-recovery" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Introduce contraseña"
            value={password}
            onChange={handleChangePassword}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Repetir Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Repite la contraseña"
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
          />
        </Form.Group>
        {message && <div className="message">{message}</div>}
        <div className="boton-container-recovery">
          <Button className="boton-recovery" variant="primary" type="submit">
            Aceptar
          </Button>
        </div>
      </Form>
    </div>
  );
};
