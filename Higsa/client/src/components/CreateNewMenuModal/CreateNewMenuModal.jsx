/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { SelectIcons } from "../SelectIcons/SelectIcons";
import axios from "axios";
import "./createnewmenumodal.scss";

const initialValue = {
  name: "",
  icon_id: "",
  icon_name: "",
};

function CreateNewMenuModal(props) {
  const {
    icons,
    setDataFiltered,
    dataFiltered,
    onHide,
    show,
    user_id,
    setCreateMenuToast,
  } = props;

  const [menu, setMenu] = useState(initialValue);

  const handleChange = event => {
    setMenu({ ...menu, name: event.target.value });
  };

  console.log(menu);

  useEffect(() => {
    setMenu({ ...menu, user_id: user_id });
  }, []);

  const handleSubmit = () => {
    axios
      .post("http://localhost:4000/menu/createMenu", menu)
      .then(res => {
        setDataFiltered([...dataFiltered, res.data]);
        console.log(res.data);
      })
      .catch(err => console.log(err));

    props.onHide();
    setCreateMenuToast(true);
  };

  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={onHide}>
        <Modal.Title id="contained-modal-title-vcenter">
          Crear nuevo menú
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="select">
          <label className="d-flex flex-column mb-3">
            Nombre del menú:
            <input
              type="text"
              value={menu.name}
              name="name"
              onChange={handleChange}
              placeholder="Introduce un nombre"
            />
          </label>
          Selecciona una etiqueta
          {icons && (
            <SelectIcons
              className="select"
              icons={icons}
              menu={menu}
              setMenu={setMenu}
            />
          )}
        </form>
      </Modal.Body>
      <Modal.Footer className="create-menu-modal-footer">
        <button className="button-cancel" onClick={props.onHide}>
          Cancelar
        </button>
        <button onClick={handleSubmit}>Aceptar</button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateNewMenuModal;
