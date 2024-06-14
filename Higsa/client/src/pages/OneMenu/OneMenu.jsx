import axios from "axios";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { SelectIcons } from "../../components/SelectIcons/SelectIcons";
import { HigsaContext } from "../../context/ContextProvider/ContextProvider";
import "./onemenu.scss";
import ToastGeneral from "../../components/ToastGeneral/ToastGeneral";
import { AllMenusTable } from "../../components/AllMenusTable/AllMenusTable";
import { AllMenusTableMobile } from "../../components/AllMenusTableMobile/AllMenusTableMobile";
import { useMediaQuery } from "react-responsive";
import EditMenuModal from "../../components/EditMenuModal/EditMenuModal";
import { DuplicarMenuModal } from "../../components/DuplicarMenuMondal/DuplicarMenuMondal";
import { AddDishesModal } from "../../components/AddDishModal/AddDishModal";
import GeneralModal from "../../components/GeneralModal/GeneralModal";
import { MenuModalError } from "../../components/MenuModalError/MenuModalError";
import GenerateExcelModal from "../../components/GenerateExcelModal/GenerateExcelModal";

export const OneMenu = () => {
  const { user_id, menu_id } = useParams();
  const { icons } = useContext(HigsaContext);
  const [menu, setMenu] = useState();
  const [edit, setEdit] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 933 });
  const [planning, setPlanning] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [edited, setEdited] = useState(false);
  const [showDays, setShowDays] = useState(true);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [duplicateMenuName, setDuplicateMenuName] = useState("");
  const [showAddDishModal, setShowAddDishModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [deleteShowModal, setDeleteShowModal] = useState(false);
  const [isVoid, setIsvoid] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showExcelModal, setShowExcelModal] =useState(false)
  const [showExcelToast, setShowExcelToast] = useState(false)
  const [excelPlanning, setExcelPlanning] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/menu/${user_id}/${menu_id}`)
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
    axios
      .get(`http://localhost:4000/menu/${user_id}/${menu_id}/getPlanning`)
      .then((result) => {
        setPlanning(result.data);
      })
      .catch((error) => console.log(error));
  }, [edited]);
  const editMenu = () => {
    setEdit(true);
  };
  const saveChanges = () => {
    axios
      .put(`http://localhost:4000/menu/${user_id}/${menu_id}/edit`, menu)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setEdit(false);
  };
  const deleteMenu = () => {
    axios
      .delete(`http://localhost:4000/menu/${user_id}/${menu_id}/delete`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setShowToast(true);
    setDeleteShowModal(false);
    setTimeout(() => navigate(`/menus/${user_id}`), 3000);
  };
  const handleChange = (event) => {
    setMenu({ ...menu, name: event.target.value });
  };
  const hideModal = () => {
    setShowModal(false);
    setEdited(!edited);
    setShowDays(true);
  };
  //duplico la semana con el nombre por si lo quiere igual o lo quiere cambiar
  const showModalDuplicate = () => {
    if (!isVoid) {
      setDuplicateMenuName(menu.name);
      setShowDuplicateModal(true);
    } else {
      setShowErrorModal(true);
    }
  };
  const hideErrorModal = () => {
    setShowErrorModal(false);
  };
  const createWeek = () => {
    var week = {};
    if (menu.number_of_days === 5) {
      week = {
        week: planning.length + 1,
        user: parseInt(user_id),
        menu: parseInt(menu_id),
        name: "Semana" + " " + (planning.length + 1),
        days: [
          { day: 1, data: [] },
          { day: 2, data: [] },
          { day: 3, data: [] },
          { day: 4, data: [] },
          { day: 5, data: [] },
        ],
      };
      setPlanning([...planning, week]);
    } else if (menu.number_of_days === 7) {
      week = {
        week: planning.length + 1,
        user: parseInt(user_id),
        menu: parseInt(menu_id),
        name: "Semana" + " " + (planning.length + 1),
        days: [
          { day: 1, data: [] },
          { day: 2, data: [] },
          { day: 3, data: [] },
          { day: 4, data: [] },
          { day: 5, data: [] },
        ],
      };
      setPlanning([...planning, week]);
    }
    axios
      .put(`http://localhost:4000/menu/${user_id}/${menu_id}/addWeek`, week)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const hideModalDuplicate = () => {
    setShowDuplicateModal(false);
  };
  //llamado a la db
  const duplicateMenu = () => {
    console.log("estoy aca duplicando tu menu", duplicateMenuName);
    // es tener claro user_id, menu_id, number_of_days
    const data = {
      planning: planning,
      week_days: menu.number_of_days,
      icon_id: menu.icon_id,
      menu_name: duplicateMenuName,
      week_length: planning.length,
    };
    axios
      .put(`http://localhost:4000/menu/duplicar/${user_id}/${menu_id}`, data)
      .then((res) => {
        console.log(res);
        navigate(`/menus/${user_id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleAddDishClick = (day, week) => {
    setSelectedWeek(week);
    setSelectedDay(day);
    setShowAddDishModal(true);
  };
  const handleShowDeleteMenu = () => {
    setDeleteShowModal(!deleteShowModal);
  };

  const handleGenerateExcel = () => {
    console.log("me estoy generando");
    if (excelPlanning.length === 0) {
      axios
        .put(
          `http://localhost:4000/menu/generatexls/${user_id}/${menu_id}`,
          planning
        )
        .then()
        .catch((error) => console.log(error));
    } else {
      axios
        .put(
          `http://localhost:4000/menu/generatexls/${user_id}/${menu_id}`,
          excelPlanning
        )
        .then()
        .catch((error) => console.log(error));
    }
    setShowExcelModal(false)
    setShowExcelToast(true)
  }

  const openExcelModal = () => {
    setShowExcelModal(true);
  };

  const closeExcelModal = () => {
    setShowExcelModal(false);
  };

  return (
    <main>
      <GeneralModal
        onClick={deleteMenu}
        show={deleteShowModal}
        handleClose={handleShowDeleteMenu}
        deleteMenu={deleteMenu}
      >
        ¿Estás seguro/a de borrar este menú?
      </GeneralModal>
      <ToastGeneral show={showToast} position={"bottom-end"}>
        <p className="mb-0">Se ha borrado el menú correctamente.</p>
        <p className="mb-0">Redirigiendo, espere...</p>
      </ToastGeneral>
      <ToastGeneral show={showExcelToast} setShow={setShowExcelToast} position={"bottom-end"}>
        <p className="mb-0">Se ha generado el excel correctamente.</p>
        <p className="mb-0">Cerrando...</p>
      </ToastGeneral>
      <GenerateExcelModal
        show={showExcelModal}
        onHide={closeExcelModal}
        numOfWeeks={excelPlanning.length}
        generateExcel= {handleGenerateExcel}
        setShow = {setShowExcelToast}
      />

      {planning && (
        <EditMenuModal
          show={showModal}
          onHide={hideModal}
          week={selectedWeek}
          planning={planning}
          setPlanning={setPlanning}
          edited={edited}
          setEdited={setEdited}
          showDays={showDays}
          setShowdays={setShowDays}
        />
      )}

      {showDuplicateModal && (
        <DuplicarMenuModal
          show={showDuplicateModal}
          onHide={hideModalDuplicate}
          duplicateMenu={duplicateMenu}
          setDuplicateMenuName={setDuplicateMenuName}
          duplicateMenuName={duplicateMenuName}
        />
      )}

      {showErrorModal && <MenuModalError onHide={hideErrorModal} />}

      {planning && selectedWeek && (
        <AddDishesModal
          show={showAddDishModal}
          onClose={() => setShowAddDishModal(false)}
          // onSave={handleModalSave}
          menu={menu?.menu_id}
          week={selectedWeek?.week}
          day={selectedDay}
          user_id={user_id}
          planning={planning}
          setPlanning={setPlanning}
          handleAddDishClick={handleAddDishClick}
        />
      )}

      <Container fluid={"xxl"}>
        <section className="menu-info py-5 d-flex gap-3">
          {!edit && (
            <Fragment>
              <img
                className="menu-icon"
                src={`/assets/images/icons/${menu?.icon_name}`}
                alt=""
              />
              <h1 className="text-center">{menu?.name}</h1>
              <img
                className="edit-menu-icon"
                onClick={editMenu}
                src="/assets/images/icons/edit.png"
                alt=""
              />
            </Fragment>
          )}
          {icons && edit && (
            <Fragment>
              <SelectIcons
                className="select"
                icons={icons}
                menu={menu}
                setMenu={setMenu}
              />
              <input
                type="text"
                value={menu.name}
                onChange={handleChange}
                name="name"
              />
              <button onClick={saveChanges}> Guardar</button>
            </Fragment>
          )}
        </section>

        <div className="editButtons d-flex gap-4 justify-content-center">
          {!isMobile && (
            <Fragment>
              <button onClick={handleShowDeleteMenu}>
                <img src="/assets/images/icons/trash.png" alt="" />
                Borrar Menu
              </button>
              <button onClick={createWeek}>
                <img src="/assets/images/icons/plus.png" alt="" />
                Añadir nueva semana
              </button>
              <button onClick={openExcelModal}>
                <img src="/assets/images/icons/excel.png" alt="" />
                Generar excel
              </button>
              <button onClick={showModalDuplicate}>
                <img src="/assets/images/icons/duplicate.png" alt="" />
                Duplicar menú
              </button>
            </Fragment>
          )}
          {isMobile && (
            <Fragment>
              <button onClick={handleShowDeleteMenu}>
                <img src="/assets/images/icons/trash.png" alt="" />
              </button>
              <button onClick={createWeek}>
                <img src="/assets/images/icons/plus.png" alt="" />
              </button>
              <button onClick={openExcelModal}>
                <img src="/assets/images/icons/excel.png" alt="" />
              </button>
              <button onClick={showModalDuplicate}>
                <img src="/assets/images/icons/duplicate.png" alt="" />
              </button>
            </Fragment>
          )}
        </div>
        {menu && planning && isMobile && (
          <AllMenusTableMobile
            planning={planning}
            setPlanning={setPlanning}
            menu={menu}
            user_id={user_id}
            menu_id={menu_id}
            setShowModal={setShowModal}
            setShowAddDishModal={setShowAddDishModal}
            setWeek={setSelectedWeek}
            handleAddDishClick={handleAddDishClick}
            setIsvoid={setIsvoid}
            excelPlanning={excelPlanning}
            setExcelPlanning={setExcelPlanning}
          />
        )}
        {menu && planning && !isMobile && (
          <AllMenusTable
            planning={planning}
            setPlanning={setPlanning}
            menu={menu}
            user_id={user_id}
            menu_id={menu_id}
            setShowModal={setShowModal}
            setShowAddDishModal={setShowAddDishModal}
            setWeek={setSelectedWeek}
            handleAddDishClick={handleAddDishClick}
            setIsvoid={setIsvoid}
            excelPlanning={excelPlanning}
            setExcelPlanning={setExcelPlanning}
          />
        )}
      </Container>
    </main>
  );
};
