import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";

function WarehouseLocation() {
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");
  const [value, setvalue] = useState("8549-6461-2541-0000");
  const [copied, setcopied] = useState(false);
  const [userid, setuserid] = useState(null);
  const [addClicked, setAddClicked] = useState(false);

  //data tampilan
  const [invoiceHead, setinvoiceHead] = useState([]);
  const [warehouseLocation, setwarehouseLocation] = useState("");
  // const [expirydate, setexpirydate] = useState("");
  // const [grandtotal, setgrandtotal] = useState(0);

  // JS NUMBER FORMATTER
  const { JS_NumberFormat } = require("js-number-formatter");
  const numberFormatOptions = { op_DelimiterChar: "." };

  // untuk ambil id token
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        setuserid(result.data.user_detail.user_id);
        setAddClicked(!addClicked);
      });
  }, []);

  useEffect(() => {
    console.log("AMBIL ID FROM TOKEN", userid);
    let id = userid;
    // untuk ambil nama warehouse
    axios.get("http://localhost:3001/jarak/" + id).then((res) => {
      console.log("DATA JARAK", res.data.result);
      setwarehouseLocation(res.data.result);
    });
  }, [addClicked]);

  return (
    <div>
      <p>HI THIS IS WAREHOUSE LOCATION</p>
    </div>
  );
}

export default WarehouseLocation;
