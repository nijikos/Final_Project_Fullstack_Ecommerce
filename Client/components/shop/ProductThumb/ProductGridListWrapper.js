import { Fragment, useContext, useState, useEffect } from "react";

import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import ProductContext from "../../../context/ProductContext";
import { addToCart } from "../../../redux/actions/cartActions";
import ProductGridList from "./ProductGridList";
import Pagination from "./Pagination";

const ProductGridWrapper = ({
  // products,
  bottomSpace,
  addToCart,
  cartItems,
  category,
}) => {
  const { JS_NumberFormat } = require("js-number-formatter");
  const { products, loading, currentProducts, productsPerPage, paginate } =
    useContext(ProductContext);
  console.log("dari gridlistwrapper :", products);
  const { addToast } = useToasts();

  // // untuk pagination
  // const [loading, setLoading] = useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [productsPerPage, setProductsPerPage] = useState(10);

  // useEffect(() => {
  //   products ? setLoading(false) : setLoading(true);
  // }, []);

  // // change page for paginate
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // // get current posts
  // const indexOfLastProduct = currentPage * productsPerPage;
  // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // const currentProducts = products.slice(
  //   indexOfFirstProduct,
  //   indexOfLastProduct
  // );
  // console.log("current products from gridlistwrapper :", currentProducts);

  if (loading) {
    return <h2>Loading...</h2>;
  } else {
    return (
      <Fragment>
        {products &&
          currentProducts.map((product) => {
            const productPrice = JS_NumberFormat(product.price, {
              op_AllowDecimal: false,
              op_DelimiterChar: ".",
            });
            const cartItem = cartItems.filter(
              (cartItem) => cartItem.id === product.id
            )[0];

            return (
              <ProductGridList
                key={product.id}
                currentProducts={currentProducts}
                product={product}
                productPrice={productPrice}
                cartItem={cartItem}
                bottomSpace={bottomSpace}
                addToCart={addToCart}
                addToast={addToast}
                cartItems={cartItems}
                category={category}
                product_id={product.id}
                loading={loading}
              />
            );
          })}
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={products?.length}
          paginate={paginate}
        />
      </Fragment>
    );
  }
};
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    wishlistItems: state.wishlistData,
    compareItems: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      selectedProductColor,
      selectedProductSize
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          selectedProductColor,
          selectedProductSize
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridWrapper);
