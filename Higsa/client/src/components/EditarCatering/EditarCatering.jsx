import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./editarcatering.scss";

// eslint-disable-next-line react/prop-types
export const EditarCatering = ({ showForm, setShowForm, user }) => {
  const [edit, setEdit] = useState({});

  useEffect(() => {
    if (user) {
      setEdit(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:4000/users/editUser", edit)
      .then((res) => {
        console.log("Respuesta del servidor:", res.data);
        setShowForm(false);
      })
      .catch((err) => console.log("Error al enviar datos al servidor:", err));
  };

  return (
    <Modal
      show={showForm}
      onHide={() => setShowForm(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="custom-modal-edit-user"
    >
      <h3>Edición de usuario</h3>
      <hr />
      <Modal.Body className="modal-body">
        <form className="form-container-edit-user" onSubmit={onSubmit}>
          <h4 className="p-2">Datos del cátering</h4>
          <div className="form-group-pair">
            <label htmlFor="company_name" className="form-label">
              <div className="mb-1">Nombre</div>
              <input
                type="text"
                id="company_name"
                placeholder="Enter company name"
                name="company_name"
                value={edit?.company_name || ""}
                onChange={handleChange}
                className="form-control"
              />
            </label>
            <label htmlFor="company_phone" className="form-label">
              <div className="mb-1">Teléfono</div>
              <input
                type="text"
                id="company_phone"
                placeholder="Enter company phone"
                name="company_phone"
                value={edit?.company_phone || ""}
                onChange={handleChange}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group-pair">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                name="email"
                value={edit?.email || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter address"
                name="address"
                value={edit?.address || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <h4>Datos de contacto</h4>
          <div className="form-group-pair">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                name="name"
                value={edit?.name || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                id="lastname"
                placeholder="Enter lastname"
                name="lastname"
                value={edit?.lastname || ""}
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="mb-3 form-group-single">
            <label htmlFor="contact_phone" className="form-label">
              Teléfono de Contacto
            </label>
            <input
              type="text"
              id="contact_phone"
              placeholder="Enter contact phone"
              name="contact_phone"
              value={edit?.contact_phone || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group-buttons">
            <button type="submit" className="btn btn-primary">
              Editar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
