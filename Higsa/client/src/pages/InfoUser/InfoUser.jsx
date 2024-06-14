import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { EditarCatering } from "../../components/EditarCatering/EditarCatering";
import { GridTable } from "../../components/GridTable/GridTable";
import "./infouser.scss";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { HigsaContext } from "../../context/ContextProvider/ContextProvider";

export const InfoUser = () => {
  const { user_id } = useParams();
  const { user } = useContext(HigsaContext);
  const [userSelect, setUserSelect] = useState();
  const [companyData, setCompanyData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/oneuser/${user_id}`)
      .then((res) => {
        setCompanyData([
          { title: "Nombre", data: res.data.company_name },
          { title: "CIF", data: res.data.cif },
          { title: "Dirección", data: res.data.address },
          { title: "Teléfono", data: res.data.company_phone },
        ]);
        setContactData([
          { title: "Nombre", data: res.data.name },
          { title: "Apellido", data: res.data.lastname },
          { title: "Teléfono", data: res.data.contact_phone },
          { title: "Correo", data: res.data.email },
        ]);
        setUserSelect(res.data);
      })
      .catch(() => console.log("Error al obtener datos del usuario"));
  }, [user_id]);

  useEffect(() => {
    if (!showForm) {
      axios
        .get(`http://localhost:4000/users/oneuser/${user_id}`)
        .then((res) => {
          setCompanyData([
            { title: "Nombre", data: res.data.company_name },
            { title: "CIF", data: res.data.cif },
            { title: "Dirección", data: res.data.address },
            { title: "Teléfono", data: res.data.company_phone },
          ]);
          setContactData([
            { title: "Nombre", data: res.data.name },
            { title: "Apellido", data: res.data.lastname },
            { title: "Teléfono", data: res.data.contact_phone },
            { title: "Correo", data: res.data.email },
          ]);
          setUserSelect(res.data);
        })
        .catch(() => console.log("Error al actualizar datos del usuario"));
    }
  }, [showForm, user_id]);

  const handleUserClick = () => {
    navigate(`/menus/${user_id}`);
  };

  return (
    <>
      <div className="h2-info-user">
        <h2>{userSelect?.company_name}</h2>
      </div>
      <main>
        <div className="container">
          <GridTable title="Datos de empresa" data={companyData} />
          <GridTable title="Datos de contacto" data={contactData} />
          {user.user_id == user_id && (
            <Button className="edit-button" onClick={() => setShowForm(true)}>
              Editar
            </Button>
          )}
          {user.type == 1 && (
            <Button className="edit-button" onClick={handleUserClick}>
              Ir a menú del usuario
            </Button>
          )}
        </div>
      </main>
      {user.user_id == user_id && (
        <EditarCatering showForm={showForm} setShowForm={setShowForm} user={userSelect} />
      )}
    </>
  );
};
