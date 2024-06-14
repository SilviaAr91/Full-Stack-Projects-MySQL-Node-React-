
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { SelectDishesAddDishes } from "../SelectDishesAddDishes/SelectDishesAddDishes";
import './adddishmodal.scss'

export const AddDishesModal = ({
  show,
  onClose,
  day,
  user_id,
  week,
  menu,
  planning,
  setPlanning,
}) => {
  const getDayName = day => {
    let res = "";

    switch (day) {
      case 1:
        res = "Lunes";
        break;
      case 2:
        res = "Martes";
        break;
      case 3:
        res = "Miercoles";
        break;
      case 4:
        res = "Jueves";
        break;
      case 5:
        res = "Viernes";
        break;
      case 6:
        res = "Sábado";
        break;
      case 7:
        res = "Domingo";
        break;
    }

    return res;
  };

  const [dishes, setDishes] = useState();
  const [selectedDishes, setSelectedDishes] = useState();

  useEffect(() => {
    setSelectedDishes(
      {user_id: user_id,
        menu_id: menu, 
        week_id: week,
        day_id: day,
        dishes: []
      }
    )
    axios
      .get(`http://localhost:4000/dishes/${user_id}`)
      .then(res => setDishes(res.data))
      .catch(err => console.log(err));
  }, [day]);

  const handleSubmit = () => {
    // Crear una copia profunda del estado planning para evitar modificar el estado directamente
    const updatedPlanning = [...planning];
    updatedPlanning[week - 1] = {
      ...updatedPlanning[week - 1],
      days: [...updatedPlanning[week - 1].days],
    };
    updatedPlanning[week - 1].days[day - 1] = {
      ...updatedPlanning[week - 1].days[day - 1],
      data: selectedDishes.dishes,
    };
  
    // Actualizar el estado planning con la copia modificada
    setPlanning(updatedPlanning);
  
    // Enviar los datos actualizados al backend
    axios
      .post(`http://localhost:4000/menu/addDishes`, selectedDishes)
      .then(res => {
        console.log(res.data.message); // Mensaje del backend
        onClose();
      })
      .catch(err => console.log(err));
  };

  console.log(selectedDishes);

  return (
    <Modal className="general-modal-style" show={show} onHide={onClose} centered>
      <Modal.Header className="add-dish-header w-100 text-center">
        <Modal.Title>{getDayName(day)}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-buttons-dishes">
        {dishes && (
          <label>
            <p>Plato 1</p>
            <SelectDishesAddDishes
              setSelectedDishes={setSelectedDishes}
              selectedDishes={selectedDishes}
              dishes={dishes}
              id="dish1"
              dishName="Plato 1"
              category={1}
              className='select'
            />
          </label>
        )}
        {dishes && (
          <label >
            <p>Plato 2</p>
            <SelectDishesAddDishes
              setSelectedDishes={setSelectedDishes}
              selectedDishes={selectedDishes}
              dishes={dishes}
              id="dish2"
              dishName="Plato 2"
              category={2}
            />
          </label>
        )}
        {dishes && (
          <label >
            <p>Guarnición</p>
            <SelectDishesAddDishes
              setSelectedDishes={setSelectedDishes}
              selectedDishes={selectedDishes}
              dishes={dishes}
              id="dish3"
              dishName="Guarnición"
              category={3}
            />
          </label>
        )}
        {dishes && (
          <label >
            <p>Postre</p>
            <SelectDishesAddDishes
              setSelectedDishes={setSelectedDishes}
              selectedDishes={selectedDishes}
              dishes={dishes}
              id="dish4"
              dishName="Postre"
              category={4}
            />
          </label>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-general-cancel" variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button className="confirm-general-button" variant="primary" onClick={handleSubmit}>
          Añadir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
