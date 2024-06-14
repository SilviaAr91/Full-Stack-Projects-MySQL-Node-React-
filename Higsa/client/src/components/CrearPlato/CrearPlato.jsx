import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import "./crearplato.scss";

export const CrearPlato = ({ show, handleClose, fetchDishes, userId }) => {
  const [dishName, setDishName] = useState("");
  const [dishDescription, setDishDescription] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    const dish = {
      dish_name: dishName,
      dish_description: dishDescription,
    };

    if (userId) {
      dish.user_id = userId;
    }

    axios
      .post("http://localhost:4000/dishes", dish)
      .then((res) => {
        fetchDishes(); // Actualiza la lista de platos
        handleClose();
      })
      .catch((err) => console.log("Error al crear el plato:", err));
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="crear-plato-modal general-modal-style"
    >
      <div className="modal-content">
        <h3 className="text-center pt-3">Crear Nuevo Plato</h3>
        <hr />
        <Modal.Body className="modal-body">
          <form className="form-container-crear-plato" onSubmit={handleSave}>
            <div className="form-group-single">
              <label htmlFor="dish_name" className="form-label">
                Nombre del Plato
              </label>
              <input
                type="text"
                id="dish_name"
                name="dish_name"
                className="form-control"
                placeholder="Ingrese el nombre del plato"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
              />
            </div>
            <div className="form-group-single">
              <label htmlFor="dish_description" className="form-label">
                Descripción del Plato
              </label>
              <input
                type="text"
                id="dish_description"
                name="dish_description"
                className="form-control"
                placeholder="Ingrese la descripción del plato"
                value={dishDescription}
                onChange={(e) => setDishDescription(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center flex-wrap">
              <Button
                type="button"
                className="button-general-cancel "
                onClick={handleClose}
              >
                Cancelar
              </Button>
              <Button type="submit" className="confirm-general-button">
                Guardar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </div>
    </Modal>
  );
};
