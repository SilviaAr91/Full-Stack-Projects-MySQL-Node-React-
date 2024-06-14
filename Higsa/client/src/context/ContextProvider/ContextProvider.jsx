import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export const HigsaContext = createContext();
export const ContextProvider = ({ children }) => {
  const [tokenApp, setTokenApp] = useState();
  const [isLogged, setIsLogged] = useState(false);
  const [icons, setIcons] = useState()
  const [user, setUser] = useState();
  const [categories, setCategories] = useState()

  useEffect(() => {
    let tokenLocalStore = localStorage.getItem("token");
    if (tokenLocalStore) {
      const { id } = jwtDecode(tokenLocalStore);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${tokenLocalStore}`;
      
      axios
        .get(`http://localhost:4000/users/oneUser/${id}`)
        .then((res) => {
          setUser(res.data);
          setIsLogged(true);
          setTokenApp(tokenLocalStore);
        })
        .catch((err) => console.log(err));
      
      axios
        .get('http://localhost:4000/getIcons')
        .then(res => setIcons(res.data))
        .catch(err => console.log(err))

      axios 
        .get('http://localhost:4000/dishes/getCategories')
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
    }
  }, []);
  
  return (

    <HigsaContext.Provider

      value={{
        user,
        setUser,
        tokenApp,
        setTokenApp,
        isLogged,
        setIsLogged,
        icons,
        setIcons,
        categories,
        setCategories
      }}
    >

      {children}
    </HigsaContext.Provider>
  );
};