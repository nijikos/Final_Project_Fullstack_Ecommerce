import React, { useState, useEffect } from "react";
import axios from "axios";

import Cookies from "universal-cookie";
const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const cookies = new Cookies();
  const [cartCount, setcartCount] = useState(0);
  const [notifCount, setnotifCount] = useState(0);
  const [user_detail, setuser_detail] = useState({});
  const [userid, setuserid] = useState(0);
  const [refresh, setrefresh] = useState(false);
  const token = cookies.get("jwtToken");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        console.log("TOKEN NAVABR ICON: ", result.data);
        setuser_detail(result.data.user_detail);
        setuserid(result.data.user_detail.user_id);
        setrefresh(!refresh);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/cart/count/${userid}`)
      .then((result) => {
        // console.log("INI USER ID", user_detail.user_id);
        // console.log("axios ke 2", result.data[0].count);
        setcartCount(result.data[0].count);
        setrefresh(!refresh);
      });
    axios
      .get(`http://localhost:3001/users/count-notification/${userid}`)
      .then((result) => {
        // console.log("INI USER ID", user_detail.user_id);
        // console.log("axios ke 2", result.data[0].count);
        setnotifCount(result.data[0].count);
      });
  }, [refresh]);

  return (
    <CartContext.Provider value={{ cartCount, notifCount }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
