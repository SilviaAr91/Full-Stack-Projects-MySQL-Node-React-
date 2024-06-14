/* eslint-disable react/prop-types */
import { ToastContainer } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

function ToastGeneral({children, show, position, setShow}) {
  return (
    <ToastContainer position={position}>
      <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Aviso</strong>
          </Toast.Header>
          <Toast.Body>{children}</Toast.Body>
        </Toast>
    </ToastContainer>
  );
}

export default ToastGeneral;