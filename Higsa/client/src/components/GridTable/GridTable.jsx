import React from 'react';
import './gridtable.scss';

export const GridTable = ({ title, data }) => {
  return (
    <div className="grid-component">
      <h3>{title}</h3>
      {data?.map((field, index) => (
        <div key={index} className="field">
          <div className="title">{field.title}</div>
          <div className="data">{field.data}</div>
        </div>
      ))}
    </div>
  );
};