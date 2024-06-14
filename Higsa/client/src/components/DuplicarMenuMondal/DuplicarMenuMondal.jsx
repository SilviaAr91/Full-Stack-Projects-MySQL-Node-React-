import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./duplicarMenu.scss";
export const DuplicarMenuModal = ({
  show,
  onHide,
  duplicateMenu,
  duplicateMenuName,
  setDuplicateMenuName,
  setIsvoid,
}) => {
  const handleNameChange = (e) => {
    setDuplicateMenuName(e.target.value);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Duplicar Menú</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="texto-info">Ingrese el nombre del menú duplicado</p>
        <input
          type="text"
          value={duplicateMenuName}
          onChange={handleNameChange}
          placeholder="Nuevo nombre para el menú"
          className="input-field-duplicar"
        />
      </Modal.Body>
      <Modal.Footer className="modal-footer-duplicar">
        <Button variant="secondary" onClick={onHide}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={duplicateMenu}>
          Duplicar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
