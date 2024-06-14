/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import axios from 'axios';
import './modalNewMenu.scss';

const initialDishValue = {
  dish_name: "",
  dish_description: "",
  dish_condition: ""
};

function CreateDishModal(props) {
  const { onHide, show, handleSave } = props;
  
  const [dish, setDish] = useState(initialDishValue);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDish({ ...dish, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .post('http://localhost:4000/dishes/createdish', dish)
      .then(() => handleSave())
      .catch(err => console.log(err));

    onHide();
  };

  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear Plato
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='select'>
          <label className='d-flex flex-column mb-3'>
            Nombre del Plato:
            <input 
              type="text" 
              value={dish.dish_name} 
              name='dish_name' 
              onChange={handleChange}
            />
          </label>
          <label className='d-flex flex-column mb-3'>
            Descripción del Plato:
            <input 
              type="text" 
              value={dish.dish_description} 
              name='dish_description' 
              onChange={handleChange}
            />
          </label>
          <label className='d-flex flex-column mb-3'>
            Condicionantes:
            <input 
              type="text" 
              value={dish.dish_condition} 
              name='dish_condition' 
              onChange={handleChange}
            />
          </label>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
        <Button onClick={handleSubmit}>Aceptar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateDishModal;
