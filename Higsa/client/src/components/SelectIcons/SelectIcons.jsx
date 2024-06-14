/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Select from 'react-select';
import { useEffect, useState } from 'react';

export const SelectIcons = ({ icons, menu, setMenu }) => {
  const [selectedOption, setSelectedOption] = useState("none");
  const [options, setOptions] = useState([]);

  const handleChange = (event) => {
    setSelectedOption(event.value);
    console.log(event.value)
    setMenu({ ...menu, icon_id: event.id, icon_name: event.value});
  };

  useEffect(() => {
    let optionstemp = [];
    icons?.forEach(icon => {
      optionstemp.push({
        value: icon.icon_name,
        label: <div><img src={`/assets/images/icons/${icon.icon_name}`} alt="" />{icon.icon_label}</div>,
        id: icon.icon_id,
        display: <div><img src={`/assets/images/icons/${icon.icon_name}`} alt="" />{icon.icon_label}</div>
      });
    });
    setOptions(optionstemp);
  }, [icons]);

  return (
    <Select 
      className='select'
      options={options.map(option => ({ value: option.value, label: option.display, id:option.id }))}
      value={options.filter(option => option.value === selectedOption)}
      name='icon' 
      onChange={handleChange}
    />
  );
};