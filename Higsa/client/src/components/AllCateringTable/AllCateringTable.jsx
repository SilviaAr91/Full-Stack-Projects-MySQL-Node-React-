/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import axios from "axios";
import "./allCateringTable.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { SwitchUsers } from "../SwitchUsers/SwitchUsers";
import { useMediaQuery } from "react-responsive";

export const AllCateringTable = () => {
  const [catering, setCatering] = useState([]);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useMediaQuery({maxWidth: 912})

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/admin")
      .then((res) => {
        const fetchedCatering = res.data.result;
        if (fetchedCatering) {
          setCatering(
            fetchedCatering.map((user) => ({
              ...user,
            }))
          );
        } else {
          console.error("es un array", fetchedCatering);
        }
      })
      .catch((err) => {
        console.error("Error", err);
      });
  }, []);

  const handleToggle = (user_id, checked) => {
    let id = user_id.split("-")[1];
    axios
      .put("http://localhost:4000/users/disableUsers", { id, checked })
      .then((res) => {
        console.log(res);
        setCatering(
          catering.map((user) => {
            if (user.user_id === parseInt(id)) {
              return { ...user, user_is_disabled: !checked };
            } else {
              return user;
            }
          })
        );
      })
      .catch((err) => console.log("Error al actualizar el plato:", err));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleUserClick = (user_id) => {
    navigate(`/infouser/${user_id}`);
  };

  const filteredCatering = catering.filter(
    (user) =>
      searchQuery.length < 3 ||
      user.company_name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  return (
    <main className="main-ppal-catering container-xxl">
      
      <div className="header-ppal">
          <h1 className="CateTitle">Cáterings</h1>
      </div>
      <div className="search-bar">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="search-icon">
              <img src="./assets/images/icons/search.png" alt="Search Icon" />
            </span>
          </div>
        </div>

    
      {!isMobile && <div className="main-content">
      <div className="content-tabla">
        
          <div className="table-container">
            <table>
              <thead className="thead-table">
                <tr>
                  <th>Logo del cátering</th>
                  <th>Nombre del cátering</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {filteredCatering.length > 0 ? (
                  filteredCatering.map((user) => (
                    <tr
                      key={user.user_id}
                      className={user.user_is_disabled ? "disabled-user" : ""}
                    >
                      <td>
                        <img src="./assets/higsa.png" alt="Logo" />
                      </td>
                      <td>
                        <OverlayTrigger
                           overlay={
                           <Tooltip id={`tooltip-${user.user_id}`}>
                              Haz "click" para más información
                            </Tooltip>
                          }
                        >
                          <button
                            className={
                              user.user_is_disabled
                                ? "button-information2"
                                : "button-information1"
                            }
                            onClick={() => handleUserClick(user.user_id)}
                          >
                            {user.company_name}
                          </button>
                        </OverlayTrigger>
                      </td>
                      <td
                        className={user.user_is_disabled ? "disabled-user" : ""}
                      >
                        {user.email}
                      </td>
                      <td
                        className={user.user_is_disabled ? "disabled-user" : ""}
                      >
                        {user.company_phone}
                      </td>
                      <td>
                        <SwitchUsers
                          id={`switch-${user.user_id}`}
                          checked={user.user_is_disabled}
                          onChange={handleToggle}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      No hay coincidencias para:{" "}
                      <p className="text-danger">"{searchQuery}"</p>Revise el
                      nombre de busqueda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>}
      {isMobile && <Container className="py-5" fluid={'xxl'}>
        <div className="user-card-container">
          {filteredCatering.length > 0 ? (
            filteredCatering.map((user) => (
              <div className="user-card" key={user.user_id}>
                <div>
                  <OverlayTrigger
                    overlay={
                      <Tooltip id={`tooltip-${user.user_id}`}>
                        Haz "click" para más información
                      </Tooltip>
                    }
                  >
                    <button
                      className={
                        user.user_is_disabled
                          ? "button-information2"
                          : "button-information1"
                      }
                      onClick={() => handleUserClick(user.user_id)}
                    >
                      {user.company_name}
                    </button>
                  </OverlayTrigger>
                </div>
                <div className={user.user_is_disabled ? "disabled-user" : ""}>
                  {user.email}
                </div>
                <div className={user.user_is_disabled ? "disabled-user" : ""}>
                  {user.company_phone}
                </div>
                <div>
                  <img src="./assets/higsa.png" alt="Logo" />
                </div>
                <div className="user-body">
                  <SwitchUsers
                    id={`switch-${user.user_id}`}
                    checked={user.user_is_disabled}
                    onChange={handleToggle}
                  />
                </div>
              </div>
            ))
          ) : (
            <div>
              <div colSpan="5" className="no-results">
                No hay coincidencias para:{" "}
                <p className="text-danger">"{searchQuery}"</p>Revise el nombre
                de busqueda.
              </div>
            </div>
          )}
        </div>
      </Container>}
    </main>
  );
};
