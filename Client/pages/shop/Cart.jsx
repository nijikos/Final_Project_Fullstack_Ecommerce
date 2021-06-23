import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
} from "../../redux/actions/cartActions";
import { IoIosClose, IoMdCart } from "react-icons/io";
import LayoutTwo from "../../components/shop/Layout/LayoutTwo";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import axios from "axios";
import Cookies from "universal-cookie";
import "../../assets/custom/shop/styles.css";

const Cart = () => {
  let cartTotalPrice = 0;
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");
  const [userid, setuserid] = useState(null);
  const [user_detail, setuser_detail] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [addClicked, setAddClicked] = useState(false);
  const [cartSubTotal, setcartSubTotal] = useState(0);

  // untuk pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(cartItems.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cartItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if ((pages.length = minPageNumberLimit)) {
    pageDecrementBtn = <li> &hellip; </li>;
  }

  // JS NUMBER FORMATTER
  const { JS_NumberFormat } = require("js-number-formatter");

  // untuk dapat user details (dapat idnya)
  useEffect(() => {
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
      axios
        .get(`http://localhost:3001/users/${userid}/cart/subtotal`)
        .then((res) => {
          console.log("CART SUB TOTAL : ", res.data[0].sub_total);
          setcartSubTotal(res.data[0].sub_total);
        });
    });
  }, [addClicked]);

  // dari lexada untuk overlay abu2
  useEffect(() => {
    document.querySelector("body").classList.remove("overflow-hidden");
  });

  const addCartQty = (user_id, product_id) => {
    let data = { quantity: 1 };
    axios
      .patch(
        `http://localhost:3001/users/${user_id}/cart?type=add&product_id=${product_id}`,
        data
      )
      .then((res) => {
        console.log("res dari add cart qty: ", res.data);
        setAddClicked(!addClicked);
      });
  };

  const minCartQty = (user_id, product_id) => {
    let data = { quantity: 1 };
    axios
      .patch(
        `http://localhost:3001/users/${user_id}/cart?type=min&product_id=${product_id}`,
        data
      )
      .then((res) => {
        console.log("res dari add cart qty: ", res.data);
        setAddClicked(!addClicked);
      });
  };

  const deleteFromCart = (user_id, product_id) => {
    axios
      .delete(
        `http://localhost:3001/users/${user_id}/cart?type=min&product_id=${product_id}`
      )
      .then((res) => {
        console.log("res dari delete cart qty: ", res.data);
        setAddClicked(!addClicked);
      });
  };
  console.log("cartitems: ", cartItems);

  const renderData = (cartItems) => {
    return (
      <>
        {cartItems.map((product, i) => {
          cartTotalPrice += product.price * product.quantity;
          return (
            <tr key={i}>
              <td className='product-thumbnail'>
                <Link to={`/product/${product.product_id}`}>
                  <a>
                    <img src={product.url} className='img-fluid' alt='' />
                  </a>
                </Link>
              </td>
              <td className='product-name'>
                <Link to={`/product/${product.product_id}`}>
                  <a>{product.name}</a>
                </Link>
              </td>

              <td className='product-price'>
                <span className='price'>
                  Rp.{" "}
                  {JS_NumberFormat(product.price, {
                    op_AllowDecimal: false,
                    op_DelimiterChar: ".",
                  })}
                </span>
              </td>

              <td className='product-quantity'>
                <div className='cart-plus-minus'>
                  <button
                    className='dec qtybutton'
                    onClick={() =>
                      minCartQty(product.user_id, product.product_id)
                    }
                  >
                    -
                  </button>
                  <input
                    className='cart-plus-minus-box'
                    type='text'
                    value={product.quantity}
                    readOnly
                  />
                  <button
                    className='inc qtybutton'
                    onClick={() => {
                      if (
                        product.sum_stock - product.reserved_stock >
                        product.quantity
                      ) {
                        addCartQty(product.user_id, product.product_id);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
                <p style={{ marginTop: "8px" }}>
                  {product.sum_stock - product.reserved_stock} left
                </p>
              </td>

              <td className='total-price'>
                <span className='price'>
                  Rp.{" "}
                  {JS_NumberFormat(product.price * product.quantity, {
                    op_AllowDecimal: false,
                    op_DelimiterChar: ".",
                  })}
                </span>
              </td>

              <td className='product-remove'>
                <button
                  onClick={() =>
                    deleteFromCart(product.user_id, product.product_id)
                  }
                >
                  <IoIosClose />
                </button>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  const renderRedirect = () => {
    return <Redirect to='/login' />;
  };

  return (
    <>
      {token ? (
        <LayoutTwo>
          {/* breadcrumb */}
          <BreadcrumbOne
            pageTitle='Cart'
            backgroundImage='/assets/images/backgrounds/breadcrumb-bg-2.jpg'
          >
            <ul className='breadcrumb__list'>
              <li>
                <Link to='/'>
                  <a>Home</a>
                </Link>
              </li>

              <li>Cart</li>
            </ul>
          </BreadcrumbOne>

          {/* cart content */}
          <div className='cart-content space-mt--30 space-mb--30'>
            <Container>
              {cartItems && cartItems.length >= 1 ? (
                <Row>
                  <Col lg={12}>
                    {/* cart table */}
                    <table className='cart-table'>
                      <thead>
                        <tr>
                          <th className='product-name' colSpan='2'>
                            Product
                          </th>
                          <th className='product-price'>Price</th>
                          <th className='product-quantity'>Quantity</th>
                          <th className='product-subtotal'>Total</th>
                          <th className='product-remove'>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>{renderData(currentItems)}</tbody>
                    </table>
                  </Col>
                  {/* ========================  BUTTON PAGINATION =================== */}
                  <div className='pageNumberContainer'>
                    <ul className='pageNumbers'>
                      <li>
                        <button
                          onClick={handlePrev}
                          disabled={currentPage == pages[0] ? true : false}
                        >{`<<`}</button>
                      </li>
                      {pageDecrementBtn}
                      {renderPageNumbers}
                      {pageIncrementBtn}
                      <li>
                        <button
                          onClick={handleNext}
                          disabled={
                            currentPage == pages[pages.length - 1]
                              ? true
                              : false
                          }
                        >{`>>`}</button>
                      </li>
                    </ul>
                  </div>
                  {/* ========================  BUTTON PAGINATION =================== */}
                  <Col lg={12} className='space-mb--r100'></Col>
                  <Col lg={5} className='ml-auto'>
                    <div className='cart-calculation-area'>
                      <h2 className='space-mb--40'>Cart totals</h2>
                      <table className='cart-calculation-table space-mb--40'>
                        <tbody>
                          <tr>
                            <th>SUBTOTAL</th>
                            <td className='subtotal'>
                              Rp.{" "}
                              {JS_NumberFormat(cartSubTotal, {
                                op_AllowDecimal: false,
                                op_DelimiterChar: ".",
                              })}
                            </td>
                          </tr>
                          <tr>
                            <th>SHIPPING FEE</th>
                            <td className='subtotal'>
                              Rp.{" "}
                              {JS_NumberFormat(25000, {
                                op_AllowDecimal: false,
                                op_DelimiterChar: ".",
                              })}
                            </td>
                          </tr>
                          <tr>
                            <th>TOTAL</th>
                            <td className='total'>
                              Rp.{" "}
                              {JS_NumberFormat(cartSubTotal + 25000, {
                                op_AllowDecimal: false,
                                op_DelimiterChar: ".",
                              })}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className='cart-calculation-button text-center'>
                        <Link to={`/cart/checkout`}>
                          <a className='lezada-button lezada-button--medium'>
                            proceed to checkout
                          </a>
                        </Link>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col>
                    <div className='item-empty-area text-center'>
                      <div className='item-empty-area__icon space-mb--30'>
                        <IoMdCart />
                      </div>
                      <div className='item-empty-area__text'>
                        <p className='space-mb--30'>No items found in cart</p>
                        <Link to='/'>
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
      ) : (
        <div>{renderRedirect()}</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item, addToast, quantityCount) => {
      dispatch(addToCart(item, addToast, quantityCount));
    },
    decreaseQuantity: (item, addToast) => {
      dispatch(decreaseQuantity(item, addToast));
    },
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
    deleteAllFromCart: (addToast) => {
      dispatch(deleteAllFromCart(addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
