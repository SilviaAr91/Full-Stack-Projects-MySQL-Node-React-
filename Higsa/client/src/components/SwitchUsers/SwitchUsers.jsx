import './switchUsers.scss';

// eslint-disable-next-line react/prop-types
export const SwitchUsers = ({ id, checked, onChange }) => {
  return (
    <div className="switchUsers-container">
      <input
        className="switchUsers-input"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={()=> {onChange(id, checked)}}
      />
      <label className="switchUsers-label" htmlFor={id}></label>
    </div>
  );
}
