import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./editarplato.scss";
import axios from "axios";

export const EditarPlato = ({ show, handleClose, editDish }) => {
  const [edit, setEdit] = useState({});

  useEffect(() => {
    if (editDish) {
      setEdit(editDish);
    }
  }, [editDish]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEdit({ ...edit, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!edit.dish_id) {
      console.error("El ID del plato está indefinido");
      return;
    }
    axios
      .put(`http://localhost:4000/dishes/editdish/${edit.dish_id}`, edit) // Asegúrate de enviar los datos
      .then((res) => {
        console.log("Respuesta del servidor:", res.data);
        handleClose();
      })
      .catch((err) => console.log("Error al enviar datos al servidor:", err));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="general-modal-style"
    >
      <div className="general-modal-style">
        <h3 className="text-center mt-3">Editar plato</h3>
        <hr />
        <Modal.Body className="modal-body">
          <form className="general-modal-style" onSubmit={onSubmit}>
            <div className="text-center">
              <label htmlFor="dish_name" className="text-center">
                Nombre del Plato
              </label>
              <input
                type="text"
                id="dish_name"
                name="dish_name"
                className="form-control"
                value={edit.dish_name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="text-center">
              <label htmlFor="dish_description" className="form-label">
                Descripción del Plato
              </label>
              <input
                type="text"
                id="dish_description"
                name="dish_description"
                className="form-control"
                value={edit.dish_description || ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group-buttons">
              <Button type="submit" className="btn btn-primary confirm-general-button">
                Guardar
              </Button>
              <Button
                type="button"
                className="btn btn-secondary button-general-cancel"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
};
