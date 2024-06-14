/* eslint-disable react/prop-types */
import Card from 'react-bootstrap/Card';
import './cardmenu.scss'

import { useNavigate } from "react-router-dom";

export const CardMenu = ({menu}) => {

  const {user_id, menu_id} = menu;

  const navigate = useNavigate();

  const goToMenuInfo = () => {
    navigate(`/menus/${user_id}/${menu_id}`)
  }

  return (
    <>
     <Card className="Card-Menu" onClick={goToMenuInfo}>
      <Card.Body>
        <Card.Title>
          <img src= {`/assets/images/icons/${menu?.icon_name}`} alt="" />
          <p className= "mt-2" >{menu?.name}</p>
        </Card.Title>
      </Card.Body>
    </Card>
    </>
  );
};

