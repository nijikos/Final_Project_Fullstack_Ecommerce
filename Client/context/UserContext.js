import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const UserContext = React.createContext();

export const UserProvider = (props) => {
  //token
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  //data untuk axios
  const [user_detail, setuser_detail] = useState({});
  const [userid, setuserid] = useState(null);

  const [addClicked, setAddClicked] = useState(false);

  // untuk dapat user details (dapat idnya)
  useEffect(() => {
    const token = cookies.get("jwtToken");

    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        console.log("TOKEN NAVABR ICON: ", result.data.user_detail);
        console.log("TOKEN NAVABR USER ID: ", result.data.user_detail.user_id);
        setuser_detail(result.data.user_detail);
        setuserid(result.data.user_detail.user_id);
      });
  }, []);

  return (
    <UserContext.Provider value={{ userid, token }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
