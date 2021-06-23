import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { IoMdCash } from "react-icons/io";
import LayoutTwo from "../../components/shop/Layout/LayoutTwo";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";

const Checkout = () => {
  //token
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  //data untuk axios
  const [user_detail, setuser_detail] = useState({});
  const [userid, setuserid] = useState(null);

  //data tabel billing address
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [postal, setPostal] = useState();

  //data user
  const [cartItems, setCartItems] = useState([]);
  const [shippingFee, setshippingFee] = useState(25000);
  const [wallet, setwallet] = useState(0);
  let cartTotalPrice = 0;
  let grandTotal = 0;

  // handler
  const [isSubmitted, setisSubmitted] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [testChecked, settestChecked] = useState("nothing is checked");

  // JS NUMBER FORMATTER
  const { JS_NumberFormat } = require("js-number-formatter");
  const numberFormatOptions = { op_AllowDecimal: false, op_DelimiterChar: "." };

  // word wrapper for long text (product name)
  const wrap = require("word-wrap");

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

  // untuk dapat list cart
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${userid}/cart`).then((res) => {
      setCartItems(res.data);
    });
  }, [addClicked]);

  // untuk dapat isi wallet
  useEffect(() => {
    axios.get(`http://localhost:3001/users/${userid}/wallet`).then((res) => {
      console.log("RES DARI AXIOSGETWALLET : ", res);
      setwallet(res.data.wallet);
    });
  }, [addClicked]);

  // untuk kirim data user dari form ke backend
  const handleCheckout = (e) => {
    // e.preventDefault();
    axios
      .patch(`http://localhost:3001/users/checkout/${userid}`, {
        firstName,
        lastName,
        email,
        phone,
        address,
        selectedCity,
        postal,
        grandTotal,
        testChecked,
      })
      .then((res) => {
        setisSubmitted(true);

        console.log("AXIOS PATCH :", res.data);
      });
    console.log("method dari checkout : ", testChecked);
  };

  return (
    <LayoutTwo>
      <BreadcrumbOne
        pageTitle='Checkout'
        backgroundImage='/assets/images/backgrounds/breadcrumb-bg-1.png'
      >
        <ul className='breadcrumb__list'>
          <li>
            <Link tp='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>Checkout</li>
        </ul>
      </BreadcrumbOne>
      <div className='checkout-area space-mt--r130 space-mb--r130'>
        <Container>
          {cartItems && cartItems.length >= 1 ? (
            <Row>
              <Col>
                <div className='lezada-form'>
                  <form className='checkout-form'>
                    <div className='row row-40'>
                      <div className='col-lg-7 space-mb--20'>
                        {/* Billing Address */}
                        <div id='billing-form' className='space-mb--40'>
                          <h4 className='checkout-title'>Billing Address</h4>
                          <div className='row'>
                            <div className='col-md-6 col-12 space-mb--20'>
                              <label>First Name*</label>
                              <input
                                type='text'
                                placeholder='First Name'
                                required
                                value={firstName}
                                onChange={(e) => {
                                  setfirstName(e.target.value);
                                }}
                              />
                            </div>
                            <div className='col-md-6 col-12 space-mb--20'>
                              <label>Last Name*</label>
                              <input
                                type='text'
                                placeholder='Last Name'
                                required
                                value={lastName}
                                onChange={(e) => {
                                  setlastName(e.target.value);
                                }}
                              />
                            </div>
                            <div className='col-md-6 col-12 space-mb--20'>
                              <label>Email Address*</label>
                              <input
                                type='email'
                                placeholder='Email Address'
                                required
                                value={email}
                                onChange={(e) => {
                                  setemail(e.target.value);
                                }}
                              />
                            </div>
                            <div className='col-md-6 col-12 space-mb--20'>
                              <label>Phone no*</label>
                              <input
                                type='text'
                                placeholder='Phone number'
                                required
                                value={phone}
                                onChange={(e) => {
                                  setphone(e.target.value);
                                }}
                              />
                            </div>
                            <div className='col-12 space-mb--20'>
                              <label>Address*</label>
                              <input
                                type='text'
                                placeholder='Address line'
                                required
                                value={address}
                                onChange={(e) => {
                                  setAddress(e.target.value);
                                }}
                              />
                            </div>
                            <div className='col-md-6 col-12 space-mb--20'>
                              <label>Country*</label>
                              <select>
                                <option>Indonesia</option>
                              </select>
                            </div>
                            <div className='col-md-6 col-12 space-mb--20'>
                              <label>Town/City*</label>
                              <select
                                value={selectedCity}
                                onChange={(e) => {
                                  const selectedCityOption = e.target.value;
                                  setSelectedCity(selectedCityOption);
                                }}
                              >
                                <option>Select City</option>
                                <option value='Jakarta Utara'>
                                  Jakarta Utara
                                </option>
                                <option value='Jakarta Pusat'>
                                  Jakarta Pusat
                                </option>
                                <option value='Jakarta Barat'>
                                  Jakarta Barat
                                </option>
                                <option value='Jakarta Timur'>
                                  Jakarta Timur
                                </option>
                                <option value='Jakarta Selatan'>
                                  Jakarta Selatan
                                </option>
                              </select>
                              {/* <input
                                type='text'
                                placeholder='Town/City'
                                required
                                value={city}
                                onChange={(e) => {
                                  setCity(e.target.value);
                                }}
                              /> */}
                            </div>
                            <div className='col-md-6 col-12 space-mb--20'>
                              <label>Zip Code*</label>
                              <input
                                type='text'
                                placeholder='Zip Code'
                                required
                                value={postal}
                                onChange={(e) => {
                                  setPostal(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-lg-5'>
                        <div className='row'>
                          {/* Cart Total */}
                          <div className='col-12 space-mb--50'>
                            <h4 className='checkout-title'>Cart Total</h4>
                            <div className='checkout-cart-total'>
                              <h4>
                                Product <span>Total</span>
                              </h4>
                              <ul style={{ borderBottom: "none" }}>
                                {cartItems.map((item, id) => {
                                  cartTotalPrice += item.price * item.quantity;
                                  grandTotal = cartTotalPrice + shippingFee;
                                  return (
                                    <>
                                      <li key={id}>
                                        <span
                                          style={{
                                            display: "flex",
                                            flexDirection: "row",
                                          }}
                                        >
                                          <span
                                            style={{
                                              paddingRight: "50px",
                                            }}
                                          >
                                            {item.name} X {item.quantity}
                                          </span>

                                          <span
                                            style={{
                                              minWidth: "90px",
                                              textAlign: "right",
                                            }}
                                          >
                                            Rp.{" "}
                                            {JS_NumberFormat(
                                              item.price,
                                              numberFormatOptions
                                            )}
                                          </span>
                                        </span>
                                      </li>
                                    </>
                                  );
                                })}
                              </ul>
                              <p>
                                Sub Total{" "}
                                <span>
                                  Rp.{" "}
                                  {JS_NumberFormat(
                                    cartTotalPrice,
                                    numberFormatOptions
                                  )}
                                </span>
                              </p>
                              <p>
                                Shipping Fee{" "}
                                <span>
                                  Rp.{" "}
                                  {JS_NumberFormat(
                                    shippingFee,
                                    numberFormatOptions
                                  )}
                                </span>
                              </p>
                              <h4>
                                Grand Total{" "}
                                <span>
                                  Rp.{" "}
                                  {JS_NumberFormat(
                                    cartTotalPrice + shippingFee,
                                    numberFormatOptions
                                  )}
                                </span>
                              </h4>
                            </div>
                          </div>
                          {/* Payment Method */}
                          <div className='col-12'>
                            <h4 className='checkout-title'>Payment Method</h4>
                            <div className='checkout-payment-method'>
                              <form>
                                <div className='single-method'>
                                  <input
                                    type='radio'
                                    id='payment_check'
                                    name='payment-method'
                                    value='bank'
                                    onChange={testChecked === "bank"}
                                    onClick={() => settestChecked("bank")}
                                  />
                                  <label htmlFor='payment_check'>
                                    BCA BANK TRANSFER
                                  </label>
                                </div>
                                <div className='single-method'>
                                  <input
                                    type='radio'
                                    id='payment_bank'
                                    name='payment-method'
                                    value='wallet'
                                    onChange={testChecked === "wallet"}
                                    onClick={() => settestChecked("wallet")}
                                  />
                                  <label htmlFor='payment_bank'>
                                    WALLET (Rp. {wallet})
                                  </label>
                                </div>
                              </form>
                            </div>
                            {/* <Link to='/cart/transfer'>
                              <button
                                className='lezada-button lezada-button--medium space-mt--20'
                                onClick={() => handleCheckout()}
                              >
                                Place order
                              </button>
                            </Link> */}
                            {testChecked == "bank" && (
                              <Link to='/cart/transfer'>
                                <button
                                  className='lezada-button lezada-button--medium space-mt--20'
                                  onClick={(e) => handleCheckout(e)}
                                >
                                  Place order
                                </button>
                              </Link>
                            )}
                            {testChecked == "wallet" && (
                              <Link to='/cart/wallet'>
                                <button
                                  className='lezada-button lezada-button--medium space-mt--20'
                                  onClick={(e) => handleCheckout(e)}
                                >
                                  Place order
                                </button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <div className='item-empty-area text-center'>
                  <div className='item-empty-area__icon space-mb--30'>
                    <IoMdCash />
                  </div>
                  <div className='item-empty-area__text'>
                    <p className='space-mb--30'>
                      No items found in cart to checkout
                    </p>
                    <Link
                      href='/shop/left-sidebar'
                      as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
                    >
                      <a className='lezada-button lezada-button--medium'>
                        Shop Now
                      </a>
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

export default connect(mapStateToProps)(Checkout);
