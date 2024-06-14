import React from "react";
import { Modal, Button } from "react-bootstrap";

export const MenuModalError = ({ onHide }) => {
  return (
    <Modal show={true} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Menú Incompleto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          No se pueden duplicar menús incompletos. Por favor, completa todas las
          secciones antes de duplicar.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
