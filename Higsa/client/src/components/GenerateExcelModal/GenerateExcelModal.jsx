/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import './excelmodal.scss'

function GenerateExcelModal(props) {
  const {numOfWeeks, generateExcel} = props;
  console.log(numOfWeeks)

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Aviso
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{numOfWeeks} semanas seleccionadas </h4>
        {numOfWeeks > 0 && <p>
          Se generará un excel con las semanas seleccionadas en el orden seleccionado. ¿Estás de acuerdo?
        </p>}
        {numOfWeeks === 0 && <p>
          Se generará un excel con todas las semanas. ¿Estás de acuerdo?
        </p>}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex w-100 gap-4">
          <Button className="cancel-button" onClick={props.onHide}>Close</Button>
          <Button className="generate-button" onClick={generateExcel}>Generar</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default GenerateExcelModal;
