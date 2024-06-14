import { useContext } from "react";
import { HigsaContext } from "../context/ContextProvider/ContextProvider";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { NavBarApp } from "../components/NavBarApp/NavBarApp";
import { FooterApp } from "../components/Footer/FooterApp";
import { AllMenus } from "../pages/AllMenus/AllMenus";
import { OneMenu } from "../pages/OneMenu/OneMenu";
import { Register } from "../pages/Register/Register";
import { InfoUser } from "../pages/InfoUser/InfoUser";
import { MsjBienvenida } from "../pages/MsjBienvenida/MsjBienvenida";
import { Error } from "../pages/Error/Error";
import { PassRecovery } from "../components/PasswordRecovery/PassRecovery";
import { ForgotPass } from "../components/ForgotPassword/ForgotPass";
import { RegisterMsg } from "../pages/RegisterMsg/RegisterMsg";
import { VerifyUser } from "../components/VerifyUser/VerifyUser";
import { AllCatering } from "../pages/AllCatering/AllCatering";
import { AllDishes } from "../pages/AllDishes/AllDishes";
import { AllDishesAdm } from "../pages/AllDishesAdm/AllDishesAdm";
import { MsjReBienvenida } from "../pages/MsjReBienvenida/MsjReBienvenida";



export const AppRoutes = () => {
  const { user } = useContext(HigsaContext);

  return (
    <BrowserRouter>
      <header>
        <NavBarApp />
      </header>
      <Routes>
        {!user && <Route path="/" element={<Home />} />}
        {user && user.type === 1 && <Route path="/" element={<AllCatering />} />}
        {user && user.type === 2 && <Route path="/" element={<MsjReBienvenida />} />}
        {user && <Route path="/menus/:user_id" element={<AllMenus />} />}
        {user && (
          <Route path="/menus/:user_id/:menu_id" element={<OneMenu />} />
        )}
        {!user && <Route path="/register" element={<Register />} />}

        <Route path="/registration-success" element={<RegisterMsg />} />
        
        {user && user.type === 1 && <Route path="/admin" element={<AllCatering />} />}

        {user && user.type === 1 && (
          <Route path="/infouser/:user_id" element={<InfoUser />} />
        )}
        {user && <Route path="/oneuser/:user_id" element={<InfoUser />} />}
        {!user && <Route path="/mensaje" element={<MsjBienvenida />} />}
        {user && <Route path="/dishes/:user_id" element={<AllDishes />} />}
        {user && user.type === 1 && (<Route path="/dishes/alldishes" element={<AllDishesAdm />} /> )}
        <Route path="/recovery/:token" element={<PassRecovery />} />
        <Route path="/forgot" element={<ForgotPass />} />
        <Route path="/users/verify/:token" element={<VerifyUser />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <footer>
        <FooterApp />
      </footer>
    </BrowserRouter>
  );
};
