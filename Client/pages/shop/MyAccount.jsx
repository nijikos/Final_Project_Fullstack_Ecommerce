import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Container, Row, Col } from "react-bootstrap";
import { FaCloudDownloadAlt, FaRegEdit } from "react-icons/fa";
import LayoutOne from "../../components/shop/Layout/LayoutOne";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import axios from "axios";
import Cookies from "universal-cookie";
import { IoMdCheckmark } from "react-icons/io";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const MyAccount = () => {
  // cookies and user details
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");
  const [user_detail, setuser_detail] = useState({}); // from token
  const [userDetail, setuserDetail] = useState({}); // from axios (new data)
  const [userid, setuserid] = useState(null);

  //for refreshes, redirects, etc
  const [addClicked, setAddClicked] = useState(false);
  const [addWalletClicked, setaddWalletClicked] = useState(false);
  const [walletAdded, setwalletAdded] = useState(false);
  const [refresh, setrefresh] = useState(false);

  // form handler
  const [addWalletInput, setaddWalletInput] = useState(50000);

  // from axios
  const [orderData, setorderData] = useState([]);
  const [userData, setuserData] = useState({});

  // JS NUMBER FORMATTER
  const { JS_NumberFormat } = require("js-number-formatter");
  const numberFormatOptions = {
    op_AllowDecimal: false,
    op_DelimiterChar: ".",
  };

  // untuk dapat user details (dapat idnya)
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        setuser_detail(result.data.user_detail);
        setuserid(result.data.user_detail.user_id);
        setAddClicked(!addClicked);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/orders/${userid}`)
      .then((res) => {
        axios
          .get(`http://localhost:3001/users/detail/account/${userid}`)
          .then((res) => setuserDetail(res.data[0]));

        console.log("RES DATA DARI ORDERS : ", res.data);
        setorderData(res.data);
        setrefresh(!refresh);
      })
      .catch((err) => console.log(err));
  }, [addClicked, userDetail]);

  const addWalletHandler = (e) => {
    e.preventDefault();
    let data = { amount: addWalletInput };
    setTimeout(() => {
      axios
        .patch(`http://localhost:3001/users/addwallet/${userid}`, data)
        .then((res) => {
          console.log(res);
          setTimeout(() => {
            setwalletAdded(false);
            setaddWalletClicked(false);
            setaddWalletInput(50000);
            setwalletAdded(true);
          }, 100);
        });
    }, 1000);
  };

  console.log("axios userDetail ", userDetail);
  console.log("ORDER DATAAA: ", orderData);
  console.log("value dari input wallet : ", addWalletInput);
  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne
        pageTitle='My Account'
        backgroundImage='/assets/images/backgrounds/breadcrumb-bg-2.jpg'
      >
        <ul className='breadcrumb__list'>
          <li>
            <Link href='/' as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>My Account</li>
        </ul>
      </BreadcrumbOne>

      <div className='my-account-area space-mt--r130 space-mb--r130'>
        <Container>
          <Tab.Container defaultActiveKey='dashboard'>
            <Nav
              variant='pills'
              className='my-account-area__navigation space-mb--r60'
            >
              <Nav.Item>
                <Nav.Link eventKey='dashboard' className='greyLink'>
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey='orders' className='greyLink'>
                  Orders
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey='dashboard'>
                <div>
                  {userDetail ? (
                    <div className='my-account-area__content'>
                      {" "}
                      <h3>Your Details</h3>
                      <strong>Name : </strong>
                      <p>
                        {userDetail.first_name} {userDetail.last_name}
                      </p>
                      <strong>Email : </strong>
                      <p>{userDetail.email}</p>
                      <strong>Wallet Amount : </strong>
                      <p>
                        Rp.{" "}
                        {JS_NumberFormat(
                          userDetail.wallet,
                          numberFormatOptions
                        )}
                        <button
                          className='lezada-button lezada-button--small'
                          style={{ display: "block", margin: "12px 0px" }}
                          onClick={() => setaddWalletClicked(!addWalletClicked)}
                        >
                          Add Wallet Amount
                        </button>
                      </p>
                      {addWalletClicked && (
                        <div>
                          <form
                            action=''
                            style={st.addwalletcontainer}
                            onSubmit={(e) => addWalletHandler(e)}
                          >
                            <h2
                              htmlFor='inputWalletAmmount'
                              style={{ textAlign: "center" }}
                            >
                              Rp.{" "}
                              {JS_NumberFormat(
                                addWalletInput,
                                numberFormatOptions
                              )}
                            </h2>
                            <span
                              style={{ textAlign: "center", fontSize: "12px" }}
                            >
                              (minimal Rp. 50.000)
                            </span>
                            <input
                              type='number'
                              name='inputWalletAmmount'
                              id='inputWalletAmmount'
                              style={st.addwalletInput}
                              value={addWalletInput}
                              onChange={(e) =>
                                setaddWalletInput(e.target.value)
                              }
                            />

                            <p style={{ fontSize: "0.6em" }}>
                              Please send the amount to this BANK ACCOUNT:
                            </p>
                            <p style={{ fontSize: "0.6em" }}>
                              PT. Fnichure Sejahtera Indonesia
                            </p>
                            <p style={{ fontSize: "0.6em" }}>
                              BCA : 8549-6461-2541-0000
                            </p>

                            <input
                              type='submit'
                              value='Add Wallet Amount'
                              className='lezada-button lezada-button--small'
                            />
                          </form>
                        </div>
                      )}
                      {walletAdded && (
                        <p style={{ color: "#a6bf84" }}>Wallet Added!</p>
                      )}
                      <strong>Account Status :</strong>
                      <p>{userDetail.status}</p>
                    </div>
                  ) : (
                    <p>fetching data ...</p>
                  )}
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey='orders'>
                <div className='my-account-area__content'>
                  <h3>Purchase History</h3>
                  <div className='myaccount-table table-responsive text-center'>
                    <table className='table table-bordered'>
                      <thead className='thead-light'>
                        <tr>
                          <th>Order</th>
                          <th>Date Ordered</th>
                          <th>Ordered Expired</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Invoice Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orderData.map((orders, i) => {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>
                                {orders.created_time
                                  .slice(0, 19)
                                  .split("T")[0] +
                                  " , " +
                                  orders.created_time
                                    .slice(0, 19)
                                    .split("T")[1]}
                              </td>
                              <td>
                                {orders.expired_time
                                  .slice(0, 19)
                                  .split("T")[0] +
                                  " , " +
                                  orders.expired_time
                                    .slice(0, 19)
                                    .split("T")[1]}
                              </td>
                              {orders.shipping_status == "not sent" ? (
                                <td>On Process</td>
                              ) : (
                                <td>Shipped</td>
                              )}
                              <td>
                                Rp.{" "}
                                {JS_NumberFormat(
                                  orders.grand_total,
                                  numberFormatOptions
                                )}
                              </td>
                              <Tippy content='View Invoice'>
                                <Link to={`/purchases/invoice/${orders.id}`}>
                                  <td style={{ border: "none" }}>
                                    <a
                                      style={{
                                        textDecoration: "underline",
                                        textDecorationColor: "darkgrey",
                                      }}
                                    >
                                      {orders.invoice_code}
                                    </a>
                                  </td>
                                </Link>
                              </Tippy>
                              {orders.payment_status == "unpaid" && (
                                <>
                                  {orders.expired == 0 ? (
                                    <td>
                                      {orders.payment_method == "bank" && (
                                        <Link to={`cart/transfer/${orders.id}`}>
                                          <button className='lezada-button lezada-button--small'>
                                            Confirm Payment
                                          </button>{" "}
                                        </Link>
                                      )}
                                      {orders.payment_method == "wallet" && (
                                        <Link to={`cart/wallet/${orders.id}`}>
                                          <button className='lezada-button lezada-button--small'>
                                            Confirm Payment
                                          </button>{" "}
                                        </Link>
                                      )}
                                    </td>
                                  ) : (
                                    <td>expired</td>
                                  )}
                                </>
                              )}
                              {orders.payment_status == "paid" && (
                                <td>
                                  <IoMdCheckmark /> Paid
                                </td>
                              )}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </LayoutOne>
  );
};

const st = {
  addwalletcontainer: {
    backgroundColor: "#ededed",
    display: "flex",
    flexDirection: "column",
    padding: "32px",
    gap: "12px",
    width: "320px",
    margin: "30px 0px",
  },
  addwalletInput: {
    height: "32px",
  },
};
export default MyAccount;
