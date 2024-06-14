/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./allmenustable.scss";
import axios from "axios";

export const AllMenusTable = ({
  menu,
  planning,
  setPlanning,
  user_id,
  menu_id,
  setShowModal,
  setWeek,
  handleAddDishClick,
  setIsvoid,
  excelPlanning,
  setExcelPlanning,
}) => {
  const [days, setDays] = useState(); // Renombrado el estado local

  useEffect(() => {
    if (menu.number_of_days === 5) {
      setDays(["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"]);
    } else {
      setDays([
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo",
      ]);
    }
  }, [menu.number_of_days]);

  const deleteWeek = (week_id) => {
    setPlanning(planning.filter((week) => week.week !== week_id));
    axios
      .put(
        `http://localhost:4000/menu/${user_id}/${menu_id}/${week_id}/deleteWeek`
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const editWeek = (week_id) => {
    setShowModal(true);
    setWeek(week_id);
  };

  const duplicateWeek = (week_id, new_week_id, new_name) => {
    axios
      .post(
        `http://localhost:4000/menu/${user_id}/${menu_id}/${week_id}/duplicateWeek`,
        { new_week_id, new_name }
      )
      .then(() => {
        const weekToDuplicate = planning.find((week) => week.week === week_id);
        const newWeek = {
          ...weekToDuplicate,
          week: new_week_id,
        };
        setPlanning([...planning, newWeek]);
      })
      .catch((err) => console.log(err));
  };

  const handleDuplicateClick = (week_id) => {
    const new_week_id =
      planning.length > 0
        ? Math.max(...planning.map((week) => week.week)) + 1
        : 1;
    const new_name = `Semana ${new_week_id}`;
    duplicateWeek(week_id, new_week_id, new_name);
  };

  const handleSelectWeek = (event, week) => {
    if (event.target.checked) {
      setExcelPlanning((prevExcelPlanning) => [...prevExcelPlanning, week]);
    } else {
      setExcelPlanning((prevExcelPlanning) =>
        prevExcelPlanning.filter((w) => w !== week)
      );
    }
  };

  console.log(excelPlanning);

  return (
    <section className="menu-table py-5">
      <div className="menu-headers">
        {days?.map((day, index) => {
          return <div key={index}>{day}</div>;
        })}
      </div>
      {planning && (
        <div className="menu-week">
          {planning?.map((week) => {
            return (
              <div className="week-info" key={week.week}>
                <div className="week-number">
                  <p className="mb-0 pb-3">Semana {week.week}</p>
                </div>

                <div className="week-days">
                  {setIsvoid(false)}
                  {week.days?.map((oneday, index) => {
                    return (
                      <div className="week-dishes" key={index}>
                        <ul>
                          {oneday.data.length > 0 &&
                            oneday.data?.map((dish, index) => (
                              <li key={index} className="mb-2">
                                {dish.dish_name}
                              </li>
                            ))}
                        </ul>

                        {oneday.data.length === 0 && (
                          <button
                            onClick={() => handleAddDishClick(oneday.day, week)}
                          >
                            <img src="/assets/images/icons/plus.png" alt="" />
                            {setIsvoid(true)}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="week-options">
                  <img
                    onClick={() => editWeek(week)}
                    src="/assets/images/icons/edit.png"
                    alt=""
                  />
                  <img
                    onClick={() => handleDuplicateClick(week.week)}
                    src="/assets/images/icons/duplicate.png"
                    alt=""
                  />
                  <img
                    onClick={() => deleteWeek(week.week)}
                    src="/assets/images/icons/trash.png"
                    alt=""
                  />
                </div>
                <input
                  className="ms-3"
                  name="selectWeek"
                  type="checkbox"
                  value={week.week}
                  onChange={(event) => handleSelectWeek(event, week)}
                />
              </div>
            );
          })}
        </div>
      )}
      {planning?.length === 0 && (
        <div className="no-weeks-added">
          <h2>En estos momentos no hay semanas añadidas</h2>
          <img src="/assets/images/icons/delete.png" alt="" />
          {setIsvoid(true)}
        </div>
      )}
    </section>
  );
};
