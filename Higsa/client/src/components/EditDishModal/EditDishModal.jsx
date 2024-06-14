/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './modalNewMenu.scss';

const initialEditDishValue = {
  dish_name: "",
  dish_description: "",
  dish_condition: ""
};

function EditDishModal(props) {
  const { onHide, show, handleSave, dish } = props;
  
  const [dishData, setDishData] = useState(initialEditDishValue);

  useEffect(() => {
    if (dish) {
      setDishData({
        dish_name: dish.dish_name,
        dish_description: dish.dish_description,
        dish_condition: dish.dish_condition
      });
    }
  }, [dish]);

  console.log(dish)

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDishData({ ...dishData, [name]: value });
  };

  const handleSubmit = () => {
    axios
      .put(`http://localhost:4000/dishes/${dish.dish_id}`, dishData)
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
          Modificar Plato
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='select'>
          <label className='d-flex flex-column mb-3'>
            Nombre del Plato:
            <input 
              type="text" 
              value={dishData.dish_name} 
              name='dish_name' 
              onChange={handleChange}
            />
          </label>
          <label className='d-flex flex-column mb-3'>
            Descripción del Plato:
            <input 
              type="text" 
              value={dishData.dish_description} 
              name='dish_description' 
              onChange={handleChange}
            />
          </label>
          <label className='d-flex flex-column mb-3'>
            Condicionantes:
            <input 
              type="text" 
              value={dishData.dish_condition} 
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

export default EditDishModal;