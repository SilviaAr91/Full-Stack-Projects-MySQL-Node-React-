/* eslint-disable react/prop-types */
import Select from 'react-select';
import { Fragment, useEffect, useState } from 'react';

export const SelectDishesAddDishes = ({ dishes, dishName, id, selectedDishes, setSelectedDishes, category }) => {

  const [selectedOption, setSelectedOption] = useState();
  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    const selectedOptionTemp = {
      value: event.value.dish_id,
      label: event.value.dish_name,
      id: event.value.dish_id
    };
    setSelectedOption(selectedOptionTemp);

    // Añadir o sustituir el plato seleccionado en el array de dishes en selectedDishes
    setSelectedDishes(prevSelectedDishes => {
      const updatedDishes = prevSelectedDishes.dishes ? [...prevSelectedDishes.dishes] : [];

      // Encontrar el índice del plato con el mismo id
      const index = updatedDishes.findIndex(dish => dish.id === id);

      if (index !== -1) {
        // Sustituir el plato existente
        updatedDishes[index] = { ...event.value, id, category };
      } else {
        // Añadir un nuevo plato
        updatedDishes.push({ ...event.value, id, category });
      }

      return {
        ...prevSelectedDishes,
        dishes: updatedDishes
      };
    });
  };

  useEffect(() => {

    setSelectedOption({
      value: '',
      label: dishName,
      id: ''
    })

    const optionstemp = dishes?.map(dish => ({
      value: dish,
      label: dish.dish_name,
      id: dish.user_id
    }));
    
    setOptions(optionstemp);
  }, []);

  return (
    <Fragment>
      <Select 
        className='select'
        options={options}
        value={selectedOption}
        name='dish' 
        onChange={handleChange}
      />
    </Fragment>
    
  );
};