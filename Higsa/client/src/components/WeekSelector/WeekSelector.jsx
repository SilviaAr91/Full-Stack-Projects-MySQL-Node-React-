import { useState, useEffect } from 'react';
import axios from 'axios';

const WeekSelector = ({ userId, menuId }) => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/${userId}/${menuId}/getPlanning`)
      .then((res) => {
        console.log("Respuesta del servidor:", res.data);
        setWeeks(res.data);
      })
      .catch((err) => console.log("Error al obtener las semanas del servidor:", err));
  }, [userId, menuId]);

  const handleWeekSelection = (weekId, selected) => {
    setWeeks(prevState =>
      prevState.map(week =>
        week.week_id === weekId ? { ...week, selected: !selected } : week
      )
    );
  };

  const saveWeekSelections = () => {
    const selectedWeeks = weeks.filter(week => week.selected).map(week => week.week_id);
    axios
      .post(`http://localhost:4000/${userId}/${menuId}/saveWeekSelections`, { selections: selectedWeeks })
      .then((res) => {
        console.log("Seleccion de semanas guardadas:", res.data);
        
      })
      .catch((err) => console.log("Error al guardar las selecciones de semanas:", err));
  };

  return (
    <div>
      <h1>Selector de Semanas</h1>
      {weeks.map(week => (
        <div key={week.week_id}>
          <label>
            <input
              type="checkbox"
              checked={week.selected || false}
              onChange={() => handleWeekSelection(week.week_id, week.selected)}
            />
            {week.name}
          </label>
        </div>
      ))}
      <button onClick={saveWeekSelections}>Guardar Selecciones</button>
    </div>
  );
};

export default WeekSelector;
