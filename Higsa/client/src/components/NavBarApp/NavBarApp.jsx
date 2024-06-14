import { NavLink, useNavigate } from "react-router-dom";
import "./navbar.scss";
import { Button, Container, Navbar, Nav } from "react-bootstrap";
import { useContext } from "react";
import { HigsaContext } from "../../context/ContextProvider/ContextProvider";

export const NavBarApp = () => {
  const { user, setUser } = useContext(HigsaContext);
  const navigate = useNavigate();

  const logout = () => {
    setUser();
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToUserInfo = () => {
    navigate(`/oneUser/${user.user_id}`)
  }

  const goHome = () => {
    user? navigate(`/menus/${user.user_id}`) : navigate('/');
  }


  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid={"xxl"} className="navbar-container">
        <div className="logo">
          <img onClick={goHome} src="/assets/higsa.png" alt="HIGSA Logo" />
        </div>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <NavLink
                className={"link-navbar ms-3 my-2 my-lg-0"}
                to={`/menus/${user.user_id}`}
              >
                Menús
              </NavLink>
            )}
            {user && (
              <NavLink
                className={"link-navbar ms-3 mb-2"}
                to={`/dishes/${user.user_id}`}
              >
                Mis Platos
              </NavLink>
            )}
            {user && user.type === 1 && (
              <NavLink
                className={"link-navbar ms-3 mb-2"}
                to={`/dishes/alldishes`}
              >
                Todos los platos
              </NavLink>
            )}
            {user && user.type === 1 && (
              <NavLink className={"link-navbar ms-3 mb-2"} to={`/admin`}>
                Cáterings
              </NavLink>
            )}
          </Nav>
          <div className="buttons p-2">
            {!user && (
              <Button className="normal-button" onClick={() => navigate("/")}>
                Iniciar sesión
              </Button>
            )}
            {!user && (
              <Button
                className="normal-button"
                onClick={() => navigate("/register")}
              >
                Registro
              </Button>
            )}
            <div>
              {user && (
                <Button className="normal-button" onClick={logout}>
                  Cerrar sesión
                </Button>
              )}
              {user && (
                <button className="user-button" onClick={goToUserInfo}>
                  {user.name.charAt(0)}
                </button>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
