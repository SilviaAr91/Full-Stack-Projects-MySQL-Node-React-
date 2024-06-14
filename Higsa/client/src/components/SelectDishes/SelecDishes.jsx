/* eslint-disable react/prop-types */
import Select from 'react-select';
import { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const SelectDishes = ({ dishes, selected, week, day }) => {

  const {user_id, menu_id} = useParams();
  const [selectedOption, setSelectedOption] = useState();
  const [options, setOptions] = useState([]);

  const handleChange = (event, name) => {

    let dataPre = {}

    if(name.name === 'dish') {
   
      setSelectedOption(event)

      dataPre = 
      {
        user_id: user_id,
        menu_id: menu_id,
        week_id: week.week,
        day_id: day,
        dish_id: selectedOption.value.dish_id,
        category_id: selected.category_id
      }
    }
    
    const newDishId = event.value.dish_id;
    const newCategoryId = selected.category_id;
    axios
      .put('http://localhost:4000/menu/editWeek', {dataPre, newDishId, newCategoryId})
      .then(res => {console.log(res)})
      .catch(err => console.log(err))
  };


  useEffect(() => {
    setSelectedOption({value: selected, label: selected.dish_name, id: selected.user_id});
    const optionstemp = dishes.map(dish => ({
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