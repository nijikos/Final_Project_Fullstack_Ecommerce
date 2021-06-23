import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
function Checkout() {
  const cookies = new Cookies();

  const [addAddressClicked, setaddAddressClicked] = useState(false);
  const [isSubmitted, setisSubmitted] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState();
  const [userAddress, setuserAddress] = useState("You have no address yet");
  const [userCity, setuserCity] = useState("");
  const [userPostal, setuserPostal] = useState("");
  //DATA USER SELAIN ADRESS:
  const [fullName, setfullName] = useState("");
  const [hasAddress, sethasAddress] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addClicked, setAddClicked] = useState(false);
  const [user_detail, setuser_detail] = useState({});
  const [userid, setuserid] = useState(null);
  const [shippingFee, setshippingFee] = useState(25000);
  let cartTotalPrice = 0;
  // JS NUMBER FORMATTER
  const { JS_NumberFormat } = require("js-number-formatter");
  const numberFormatOptions = {
    op_AllowDecimal: false,
    op_DelimiterChar: ".",
  };

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
        setAddClicked(!addClicked);
      });
  }, []);

  // untuk dapat list cart
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${userid}/cart`).then((res) => {
      console.log("RES DATA DARI CART.JS : ", res.data);
      setCartItems(res.data);
    });
  }, [addClicked]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .patch("http://localhost:3001/users/checkout/21", {
        address,
        city,
        postal,
      })
      .then((res) => {
        setisSubmitted(true);
        setaddAddressClicked(!addAddressClicked);
        console.log("AXIOS PATCH :", res.data);
      });
  };

  const handleAddressButton = () => {
    setaddAddressClicked(!addAddressClicked);
  };

  return (
    <div style={{ margin: "100px" }}>
      <h1>CHECKOUT</h1>
      <button onClick={() => handleAddressButton()}>Add/Change Address</button>
      {addAddressClicked ? (
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "500px",
              gap: "20px",
            }}
          >
            <label htmlFor=''>Address</label>
            <input
              required
              type='text'
              placeholder='Address'
              name='address'
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <label htmlFor=''>City</label>
            <input
              required
              type='text'
              placeholder='City'
              name='city'
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <label htmlFor=''>Postal Code</label>
            <input
              required
              type='number'
              placeholder='Postal Code'
              name='postal'
              value={postal}
              onChange={(e) => {
                setPostal(e.target.value);
              }}
            />
            <input type='submit' value='REGISTER' />
            {isSubmitted ? (
              <p>Your Addressed Has Been Added/Changed</p>
            ) : (
              <div></div>
            )}
          </div>
        </form>
      ) : (
        <div></div>
      )}

      <h3>Order Summary</h3>
      <p>=============================</p>

      {cartItems.map((item, id) => {
        cartTotalPrice += item.price * item.quantity;

        return (
          <p>
            {item.name} {item.price} x {item.quantity} ={" "}
            {item.price * item.quantity}
          </p>
        );
      })}
      <p>=============================</p>
      <p>
        Cart total: Rp. {JS_NumberFormat(cartTotalPrice, numberFormatOptions)}
      </p>
      <p>
        Shipping Fee: Rp. {JS_NumberFormat(shippingFee, numberFormatOptions)}
      </p>
      <p>
        Total: Rp.{" "}
        {JS_NumberFormat(cartTotalPrice + shippingFee, numberFormatOptions)}
      </p>
      <p>=============================</p>
      <div>
        <p>Your Address:</p>
        {hasAddress ? (
          <>
            <p>{fullName}</p>
            <p>{userAddress}</p>
            <p>{userCity}</p>
            <p>{userPostal}</p>
          </>
        ) : (
          "Please Add Your Address First"
        )}
      </div>
      <p>=============================</p>

      <p>=============================</p>
      <Link to='/cart'>
        <button type='button'>Cancel transaction</button>
      </Link>
      <br />
      <Link to='/cart/transfer'>
        <button type='button'>PROCEED TO CHECKOUT</button>
      </Link>
      <div style={{ height: "600px", width: "1px" }}></div>
    </div>
  );
}

export default Checkout;

// awalnya untuk supaya ada show actual name. tp tidak dibutuhkan lagi karena nanti pakai billing address
// useEffect(() => {
//   axios.get("http://localhost:3001/users/detail/21").then((res) => {
//     console.log("GET USERS DETAIL : ", res.data[0]);
//     if (res.data[0].postal_code != null) {
//       sethasAddress(true);
//     }
//     let userdata = res.data[0];
//     setfullName(`${userdata.first_name} ${userdata.last_name}`);
//     setuserAddress(`${userdata.address}`);

//     setuserCity(`${userdata.city}`);
//     setuserPostal(`${userdata.postal_code}`);
//   });
// }, [addAddressClicked]);
