import React from 'react';
import './switch.scss';

export const Switch = ({ id, checked, onChange }) => {


  return (
    <div className="switch-container">
      <input
        className="switch-input"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={()=> {onChange(id, checked)}}
      />
      <label className="switch-label" htmlFor={id}></label>
    </div>
  );
};