/* eslint-disable no-unused-vars */
import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import "./allmenus.scss";
import CreateNewMenuModal from "../../components/CreateNewMenuModal/CreateNewMenuModal";
import { CardMenu } from "../../components/CardMenu/CardMenu";
import { HigsaContext } from "../../context/ContextProvider/ContextProvider";
import { useParams } from "react-router-dom";
import ToastGeneral from "../../components/ToastGeneral/ToastGeneral";

export const AllMenus = () => {
  const [data, setData] = useState();
  const [filter, setFilter] = useState("");
  const [dataFiltered, setDataFiltered] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { icons, setIcons } = useContext(HigsaContext);
  const [createMenuToast, setCreateMenuToast] = useState(false)
  const { user_id } = useParams();

  useEffect(() => {
    console.log(user_id);

    axios
      .get(`http://localhost:4000/menu/${user_id}`)
      .then((res) => {
        console.log(res);
        setData(res.data);
        setDataFiltered(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    setFilter(event.target.value);

    if (event.target.value.length >= 3) {
      setDataFiltered(
        data.filter((menu) => {
          return menu.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase());
        })
      );
    } else {
      setDataFiltered(data);
    }
  };

  return (
    <Fragment>
      <main>
        <section className="allMenus container-xxl">
          <h1 className="text-center py-4">Menús</h1>

          <ToastGeneral show={createMenuToast} setShow={setCreateMenuToast} position={"bottom-end"}>
            <p className="mb-0">Se ha creado el menú corréctamente</p>
            <p className="mb-0">Cerrando...</p>
          </ToastGeneral>

          <CreateNewMenuModal
            show={showModal}
            onHide={() => setShowModal(false)}
            icons={icons}
            setDataFiltered={setDataFiltered}
            dataFiltered={dataFiltered}
            user_id={user_id}
            setCreateMenuToast = {setCreateMenuToast}
          />
          <section className="menuCards py-5">
            <input
              className="search"
              type="search"
              placeholder="Buscar..."
              value={filter}
              onChange={handleChange}
            />
            <button
              className="newMenu"
              onClick={() => setShowModal(!showModal)}
            >
              <img src="/assets/images/icons/plus.png" alt="" />
              Crear nuevo menú
            </button>
            {dataFiltered?.map((menu) => {
              return (
                <CardMenu key={`${menu.menu_id}${menu.user_id}`} menu={menu} />
              );
            })}
          </section>
        </section>
      </main>
    </Fragment>
  );
};
