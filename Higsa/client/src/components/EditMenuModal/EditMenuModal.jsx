/* eslint-disable react/prop-types */

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './editmenu.scss'
import { useState } from 'react';
import { SelectDishes } from '../SelectDishes/SelecDishes';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function EditMenuModal(props) {
  const {
    onHide,
    show,
    week,
    planning,
    edited,
    setEdited,
    showDays,
    setShowdays,
  } = props;
  const [dayDishes, setDayDishes] = useState(0);
  const [dishes, setDishes] = useState();
  const { user_id } = useParams();
  const [selectedDay, setSelectedDay] = useState(1);
  //holi

  const getDayName = (day) => {
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

  const getDishCategory = (index) => {
    let result = "akjhsdjkhasd";
    console.log(index)
    switch (index) {
      case 0:
        result = "Plato 1";
        console.log(result)
        break;
      case 1:
        result = "Plato 2";
        console.log(result)
        break;
      case 2:
        result = "Guarnición";
        console.log(result)
        break;
      case 3:
        result = "Postre";
        console.log(result)
        break;
    }
    return result;
  }

  const editWeek = (event) => {
    axios
      .get(`http://localhost:4000/dishes/${user_id}`)
      .then(res => setDishes(res.data))
      .catch(err => console.log(err))

    setShowdays(false)
    setDayDishes(planning[week?.week-1].days[event.target.value-1].data)
    setSelectedDay(event.target.value)
  }
  return (
    <Modal
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Menú
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <section className='edit-week-buttons'>
          {showDays && week.days?.map(day => {
            console.log(day)
            return(
              <button onClick={editWeek} key={day.day} value={day.day} disabled={day.data.length === 0 }>{getDayName(day.day)}</button>
            )
          }
          )}
          {!showDays && 
            <form className='edit-week-form'>
              {dishes &&
              
              dayDishes?.map((day, index) => {
                return(
                  <label key={index}>
                    <p>{getDishCategory(index)}</p>
                    <SelectDishes
                      
                      dishes = {dishes}
                      selected ={day}
                      week = {week}
                      day = {selectedDay}
                      dish = {index}
                      edited = {edited}
                      setEdited = {setEdited}
                                     />
                  </label>
                );
              })}
            </form>
          }
        </section>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditMenuModal;
