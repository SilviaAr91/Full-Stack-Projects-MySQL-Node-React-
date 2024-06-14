/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import "./allmenutablemobile.scss";

export const AllMenusTableMobile = ({
  menu,
  planning,
  setPlanning,
  user_id,
  menu_id,
  setShowModal,
  setWeek,
  handleAddDishClick,
  excelPlanning,
  setExcelPlanning,
}) => {
  const [days, setDays] = useState([]);

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
    axios
      .put(
        `http://localhost:4000/menu/${user_id}/${menu_id}/${week_id}/deleteWeek`
      )
      .then((res) => {
        setPlanning((prevPlanning) =>
          prevPlanning.filter((week) => week.week !== week_id)
        );
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const editWeek = (week) => {
    setShowModal(true);
    setWeek(week);
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
          name: new_name,
        };
        setPlanning((prevPlanning) => [...prevPlanning, newWeek]);
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
  return (
    <section className="menu-table-mobile">
      {planning && (
        <div className="menu-week-mobile mt-5">
          {planning.map((week) => (
            <div className="py-4" key={week.week}>
              <div className="week-number-mobile">
                <input
                  className="ms-3 "
                  name="selectWeek"
                  type="checkbox"
                  value={week.week}
                  onChange={(event) => handleSelectWeek(event, week)}
                />
                <p className="mb-0">Semana {week.week}</p>
                <div className="week-options-mobile">
                  <img
                    onClick={() => editWeek(week)}
                    src="/assets/images/icons/edit.png"
                    alt="Edit"
                  />
                  <img
                    onClick={() => handleDuplicateClick(week.week)}
                    src="/assets/images/icons/duplicarcel.png"
                    alt="Duplicate"
                  />
                  <img
                    onClick={() => deleteWeek(week.week)}
                    src="/assets/images/icons/borrar.png"
                    alt="Delete"
                  />
                </div>
              </div>

              <div className="week-info-mobile">
                <div className="menu-mobile-headers">
                  {days.map((day, index) => (
                    <div key={index}>{day}</div>
                  ))}
                </div>
                <div className="week-days-mobile">
                  {week.days.map((oneday) => (
                    <div key={oneday.day}>
                      {oneday.data.length > 0 ? (
                        oneday.data.map((dish, index) => (
                          <div key={index}>
                            <p className="mb-0">{dish.dish_name}</p>
                          </div>
                        ))
                      ) : (
                        <button
                          onClick={() => handleAddDishClick(oneday.day, week)}
                        >
                          <img src="/assets/images/icons/plus.png" alt="Add" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {planning?.length === 0 && (
        <div className="no-weeks-added">
          <h2>En estos momentos no hay semanas añadidas</h2>
          <img src="/assets/images/icons/delete.png" alt="" />
        </div>
      )}
    </section>
  );
};
