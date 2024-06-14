import { useEffect, useState } from "react";
import axios from "axios";
import "./alldishes.scss";

import { Switch } from "../Switch/Switch";
import { Container } from "react-bootstrap";
import { EditarPlato } from "../EditarPlato/EditarPlato";

export const AllDishesAdmin = () => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEditarModal, setShowEditarModal] = useState(false);
  const [editDish, setEditDish] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = () => {
    axios
      .get("http://localhost:4000/dishes/alldishes") // Endpoint para obtener todos los platos
      .then((res) => {
        setDishes(res.data);
      })
      .catch((err) =>
        console.log("Error al obtener platos del servidor:", err)
      );
  };

  const handleEditDish = (dish) => {
    setEditDish(dish);
    setShowEditarModal(true);
  };

  const filteredDishes =
    searchTerm.length >= 3
      ? dishes.filter((dish) =>
          dish.dish_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : dishes;

  const handleToggle = (dish_id, checked) => {
    let id = dish_id.split("-")[1];

    axios
      .put("http://localhost:4000/dishes/disableddish", { id, checked })
      .then((res) => {
        console.log(res);
        setDishes(
          dishes.map((e) => {
            if (e.dish_id === parseInt(id)) {
              return { ...e, dish_is_disabled: !checked };
            } else {
              return e;
            }
          })
        );
      })
      .catch((err) => console.log("Error al actualizar el plato:", err));
  };

  return (
    <main>
      <h2 className="h2-platos">Platos</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="dish-table-container">
        <table className="dish-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Condicionantes</th>
              <th>Activar/Desactivar</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {filteredDishes.map((dish) => (
              <tr
                key={dish.dish_id}
                className={dish.dish_is_disabled ? "disabled-dish" : ""}
              >
                <td className={dish.dish_is_disabled ? "disabled-dish" : ""}>
                  {dish.dish_name}
                </td>
                <td>{dish.dish_description}</td>
                <td>
                  <Switch
                    id={`switch-${dish.dish_id}`}
                    checked={dish.dish_is_disabled}
                    onChange={handleToggle}
                  />
                </td>
                <td>
                  <img
                    src="/assets/images/icons/edit.png"
                    alt="Edit"
                    className="edit-menu-icon"
                    onClick={() => handleEditDish(dish)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Container className="card-dish-container" fluid={'xxl'}>
        <div className="dish-card-container">
          {filteredDishes.map((dish) => (
            <div className="dish-card" key={dish.dish_id}>
              <div
                className={`dish-header ${
                  dish.dish_is_disabled ? "disabled-dish" : ""
                }`}
              >
                <span className={dish.dish_is_disabled ? "disabled-dish" : ""}>
                  {dish.dish_name}
                </span>
                <div className="action-icons">
                  <button
                    className="edit-button"
                    onClick={() => handleEditDish(dish)}
                  ></button>
                  <img
                    src="/assets/images/icons/lapiz.png"
                    alt="Edit"
                    className="edit-menu-icon"
                    onClick={() => handleEditDish(dish)}
                  />
                </div>
              </div>
              <div className="dish-body">
                <p>Condicionantes: {dish.dish_description}</p>
                <Switch
                  id={`switch-${dish.dish_id}`}
                  checked={dish.dish_is_disabled}
                  onChange={handleToggle}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
      <EditarPlato
        show={showEditarModal}
        handleClose={() => {
          setShowEditarModal(false);
          fetchDishes();
        }}
        editDish={editDish}
        setEditDish={setEditDish}
      />
    </main>
  );
};
