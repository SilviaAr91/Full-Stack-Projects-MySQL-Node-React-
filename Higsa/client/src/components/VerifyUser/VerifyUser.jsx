import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export const VerifyUser = () => {
  const [verified, setVerified] = useState(false);
  const [called, setCalled] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!called) {
      setCalled(true);
      axios
        .get(`http://localhost:4000/users/verify/${token}`)
        .then((res) => {
          if (res.data.token) {
            const { token } = res.data;
            localStorage.setItem("token", token);
            setVerified(true);
          }
        })
        .catch((err) => {
          console.log("Usuario no verificado,", err);
        });
    }
  }, [called, token, navigate]);

  const navigateToHome = () => {
    navigate("/");
  };

  if (verified) {
    return (
      <div className="fondo">
        <section className="container-success-registration font-style1 text-center">
          <h1>Te has verificado correctamente</h1>
          <hr className="custom-hr-register" />
          <h5 className="font-style-register-2 p-3">
            Ahora puedes proceder con el inicio de sesión desde la página
            principal
          </h5>
          <Button onClick={navigateToHome}>Ir a inicio de sesión </Button>
        </section>
      </div>
    );
  }

  if (verified === false)
    return (
      <div className="fondo">
        <section className="container-success-registration font-style1 text-center">
          <h1>Verificación fallida</h1>
          <hr className="custom-hr-register" />
          <h5 className="font-style-register-2 p-3">
            Vuelve a intentarlo de nuevo. Si el problema persiste, contacta con
            el administrador.
          </h5>
        </section>
      </div>
    );
};
