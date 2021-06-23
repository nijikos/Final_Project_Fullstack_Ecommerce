import React, { useState, useEffect } from "react";
import axios from "axios";

//import custom hooks
import useInputState from "../hooks/useInputState";

const AdminContext = React.createContext();

export const AdminProvider = (props) => {
  const [requestTable, setRequestTable] = useState();

  const getRequestTable = () => {
    axios
      .get("http://localhost:3001/admin/requests/all")
      .then((res) => {
        console.log("ini res data request table : ", res.data);
        setRequestTable(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRequestTable();
  }, []);

  // Get Initial Values for Editing Products
  const [initialValue, setInitialValue] = useState();

  const getInitialValue = (productId) => {
    // axios
    //   .get(`http://localhost:3001/admin/productDetails/${productId}`)
    //   .then((res) => {
    //     console.log("get initval", res.data);
    //     setInitialValue(res.data);
    //   })
    //   .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3001/admin/productDetails/37`)
      .then((res) => {
        console.log("get initval", res.data);
        setInitialValue(res.data);
      })
      .catch((err) => console.log(err));
  };

  console.log("INITIAL VALUE FROM ADMIN CONTEXT : ", initialValue);

  return (
    <AdminContext.Provider
      value={{ requestTable, setRequestTable, initialValue, getInitialValue }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContext;
