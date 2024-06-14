import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function GeneralModal({ children, show, handleClose, deleteMenu }) {
  return (
    <>
      <Modal show={show} onHide={handleClose} className="general-modal-style">
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer className="d-flex justify-content-center ">
          <Button className=" confirm-general-button" onClick={handleClose}>
            Cerrar
          </Button>
          <Button className="button-general-cancel" onClick={deleteMenu}>
            Borrar Menú
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GeneralModal;
