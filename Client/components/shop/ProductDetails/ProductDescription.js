import { useState, Fragment, useContext, useEffect } from "react";
import { IoIosHeartEmpty, IoIosShuffle } from "react-icons/io";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getProductCartQuantity, setActiveSort } from "../../../lib/product";
import ProductContext from "../../../context/ProductContext";
import UserContext from "../../../context/UserContext";

// {
// product,
// productPrice,
// discountedPrice,
// cartItems,
// wishlistItem,
// compareItem,
// addToast,
// addToCart,
// addToWishlist,
// deleteFromWishlist,
// addToCompare,
// deleteFromCompare,
// }

const ProductDescription = ({ product }) => {
  const { addToCart, qty, setQty, stock, getProductStock } =
    useContext(ProductContext);
  const { userid } = useContext(UserContext);

  useEffect(() => {
    getProductStock(product[0].product_id);
  }, []);

  const addCartQty = () => {
    setQty(qty + 1);
  };
  const minCartQty = () => {
    setQty(qty - 1);
  };

  console.log("product from proddesc: ", product);
  console.log("STOCK: ", stock);

  const { JS_NumberFormat } = require("js-number-formatter");

  return (
    <div className='product-content'>
      <h2 className='product-content__title space-mb--20'>{product[0].name}</h2>
      <div className='product-content__price space-mb--20'>
        <span className='main-price'>
          {JS_NumberFormat(product[0].price, {
            op_AllowDecimal: false,
            op_DelimiterChar: ".",
          })}
        </span>
      </div>
      <div className='product-content__description space-mb--30'>
        <p>{product[0].description}</p>
      </div>

      {/* QTY BUTTON */}
      <div className='product-content__quantity space-mb--40'>
        <div className='product-content__quantity__title'>Quantity</div>
        <div className='cart-plus-minus'>
          <button className='dec qtybutton' onClick={() => minCartQty()}>
            -
          </button>
          <input
            className='cart-plus-minus-box'
            type='text'
            value={qty}
            readOnly
          />
          <button className='inc qtybutton' onClick={() => addCartQty()}>
            +
          </button>
        </div>
        <p style={{ marginLeft: "24px" }}>{stock?.realTimeStock} LEFT </p>
      </div>

      <div className='product-content__button-wrapper d-flex align-items-center'>
        <button
          onClick={() => addToCart(product[0].product_id, userid, qty)}
          className='lezada-button lezada-button--medium product-content__cart space-mr--10'
        >
          Add To Cart
        </button>
      </div>
      <Fragment>
        <div className='product-content__other-info space-mt--50'>
          <table>
            <tbody>
              <tr className='single-info'>
                <td className='title'>Share on: </td>
                <td className='value'>
                  <ul className='social-icons'>
                    <li>
                      <a href='https://www.twitter.com'>
                        <FaTwitter />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.facebook.com'>
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.instagram.com'>
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a href='https://www.youtube.com'>
                        <FaYoutube />
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Fragment>
    </div>
  );
};

export default ProductDescription;
