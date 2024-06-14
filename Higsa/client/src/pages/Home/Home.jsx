import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { HigsaContext } from "../../context/ContextProvider/ContextProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./home.scss";
const initialValue = {
  email: "",
  pass: "",
};
export const Home = () => {
  const [login, setLogin] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { setTokenApp, setUser, setIsLogged } = useContext(HigsaContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("estoy en el submit");
    if (!login.email || !login.pass) {
      setMsgError("hay que rellenar todos los campos");
    } else {
      axios
        .post("http://localhost:4000/users/home", login)
        .then((res) => {
          const { token } = res.data;
          const id = jwtDecode(token).id;
          console.log("el id del token", id);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          axios
            .get(`http://localhost:4000/users/oneuser/${id}`)
            .then((result) => {
              console.log("result del token", result);
              localStorage.setItem("token", token);
              setTokenApp(token);
              setUser(result.data);
              setIsLogged(true);
              if (result.data.type === 2) {
                navigate(`/oneuser/${id}`);
              } else {
                navigate("/admin");
              }
            })
            .catch((err) => setMsgError(err.response.data));
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 401) {
            setMsgError(err.response.data);
          } else {
            setMsgError("ups! algo ha ido mal");
          }
        });
    }
  };
  console.log(login);
  //me trae todos los datos controlados
  return (
    <main>
      <div className="page-container">
        <div className="ppal-form">
          <h1 className="mt-4">
            ¡Bienvenido/a a <span className="font-bold">HIGSA!</span>
          </h1>
          <h2 className="p-2">Higiene y seguridad alimentaria</h2>
          <Form className="form">
            <h3 className="titulo">Iniciar sesión</h3>
            <hr className="linea" />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Correo electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
                onChange={handleChange}
                name="email"
                value={login.email}
                className="form-control"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <div className="password-wrapper-login">
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  onChange={handleChange}
                  name="pass"
                  value={login.pass}
                  className="form-control"
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEyeSlash : faEye}
                  onClick={togglePasswordVisibility}
                  className="password-toggle-icon whiteeye-icon mt-3 mx-2"
                />
              </div>
              <span>{msgError}</span>
            </Form.Group>
            <Button className="boton my-3" type="submit" onClick={handleSubmit}>
              Iniciar sesión
            </Button>
            <br />
            ¿No estás registrado/a? Regístrate <Link to="/register">aquí</Link>
            <br />
            <Link to="/forgot">¿Has olvidado la contraseña?</Link>
          </Form>
        </div>
      </div>
    </main>
  );
};
