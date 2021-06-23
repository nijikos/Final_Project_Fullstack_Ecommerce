import { Fragment, useState, useContext, useEffect } from "react";
import { Col } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { IoIosHeartEmpty, IoIosShuffle, IoIosSearch } from "react-icons/io";
import { Tooltip } from "react-tippy";
import ProductModal from "./ProductModal";
// import UserContext from "../../../context/UserContext";
import ProductContext from "../../../context/ProductContext";
import Cookies from "universal-cookie";
import axios from "axios";
import UserContext from "../../../context/UserContext";

const ProductGridList = ({
  product,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
  bottomSpace,
  addToWishlist,
  deleteFromWishlist,
  addToCompare,
  deleteFromCompare,
  addToast,
  cartItems,
  product_id,
}) => {
  // const { userid } = useContext(UserContext);
  const { addToCart } = useContext(ProductContext);
  const { userid, token } = useContext(UserContext);

  //token
  // const cookies = new Cookies();
  // const token = cookies.get("jwtToken");

  //data untuk axios
  // const [user_detail, setuser_detail] = useState({});
  // const [userid, setuserid] = useState(null);

  // untuk dapat user details (dapat idnya)
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/auth/token/decode/${token}`)
  //     .then((result) => {
  //       setuser_detail(result.data.user_detail);
  //       setuserid(result.data.user_detail.user_id);
  //     });
  // }, []);

  // const addToCart = (product_id, user_id, qty) => {
  //   let data = {
  //     product_id: product_id,
  //     qty: qty,
  //     user_id: 1,
  //   };
  //   axios
  //     .patch(`http://localhost:3001/product/addtocart`, data)
  //     .then((res) => {
  //       console.log("add cart res data", res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // console.log("user id cs: ", userid);
  console.log("product token : ", token);
  const renderRedirect = () => {
    return <Redirect to='/login' />;
  };

  const [modalShow, setModalShow] = useState(false);
  return (
    <Fragment>
      {/* {renderRedirect()} */}
      <Col lg={3} md={6} className={bottomSpace ? bottomSpace : ""}>
        <div className='product-grid'>
          {/*=======  single product image  =======*/}
          <div className='product-grid__image'>
            <Link to={`/product/${product.product_id}`}>
              <a className='image-wrap'>
                <img
                  src={product.url}
                  className='img-fluid'
                  alt={product.name}
                />
              </a>
            </Link>
            <div className='product-grid__floating-badges'>
              {/* {product.stock === 0 ? (
                <span className='out-of-stock'>out</span>
                ) : (
                  ""
                )} */}
            </div>
            <div className='product-grid__floating-icons'></div>
          </div>

          {/*=======  single product content  =======*/}
          <div className='product-grid__content'>
            <div className='title'>
              <h3>
                <a>{product.name}</a>
              </h3>
              {/* add to cart */}
              {product.affiliateLink ? (
                <a href={product.affiliateLink} target='_blank'>
                  Buy now
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link href={`/product/${product_id}`}>
                  <a>Select Option</a>
                </Link>
              ) : token ? (
                <button
                  onClick={() => addToCart(product.product_id, userid, 1)}
                >
                  Add to cart
                </button>
              ) : (
                <button>
                  <Link to='/login' style={{ color: "red" }}>
                    Add to cart
                  </Link>
                </button>
              )}
            </div>
            <div className='price'>
              <span className='main-price'>Rp {productPrice}</span>
            </div>
          </div>
        </div>
      </Col>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitems={cartItems}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        deletefromwishlist={deleteFromWishlist}
        addtocompare={addToCompare}
        deletefromcompare={deleteFromCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

export default ProductGridList;
