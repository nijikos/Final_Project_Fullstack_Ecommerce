import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import StickyBox from "react-sticky-box";
import LayoutTwo from "../../components/shop/Layout/LayoutTwo";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import {
  ImageGallerySticky,
  ProductDescription,
  ProductDescriptionTab,
} from "../../components/shop/ProductDetails";
import ProductContext from "../../context/ProductContext";

// ================================================================================
const ProductDetail = (props) => {
  const { dbproducts } = useContext(ProductContext);
  const { addToast } = useToasts();
  let { product_id } = useParams();
  // let test = useParams();
  // console.log("ini test dari product details", test);
  console.log("INI ID DARI PRODCUT DETAIL USEPARAMS: ", product_id);
  console.log("PROD DETAIL PRODUCTS dbproducts:", dbproducts);
  let filteredProducts = dbproducts.filter((e) => {
    return e.product_id == product_id;
  });

  console.log("this is filtered products: ", filteredProducts);

  if (filteredProducts.length > 0) {
    return (
      <LayoutTwo>
        {/* {stock} */}
        {/* breadcrumb */}
        <BreadcrumbOne
          pageTitle={filteredProducts[0].name}
          backgroundImage='/assets/images/backgrounds/breadcrumb-bg-1.png'
        >
          <ul className='breadcrumb__list'>
            <li>
              <Link href='/' as={process.env.PUBLIC_URL + "/"}>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link
                href='/shop/left-sidebar'
                as={process.env.PUBLIC_URL + "/shop/left-sidebar"}
              >
                <a>Shop</a>
              </Link>
            </li>
            <li>{filteredProducts[0].name}</li>
          </ul>
        </BreadcrumbOne>
        {/* product details */}
        <div className='product-details space-mt--r100 space-mb--r100'>
          <Container>
            <Row>
              <Col lg={6} className='space-mb-mobile-only--50'>
                {/* image gallery sticky */}
                <ImageGallerySticky
                  product={filteredProducts}
                  addToast={addToast}
                />
              </Col>

              <Col lg={6}>
                <StickyBox offsetTop={90} offsetBottom={20}>
                  {/* product description */}
                  <ProductDescription
                    product={filteredProducts}
                    productPrice={`filteredProducts[0].price`}
                    // cartItems={cartItems}
                    // cartItem={cartItem}
                    addToast={addToast}
                    // addToCart={addToCart}
                  />
                </StickyBox>
              </Col>
            </Row>
            <Row>
              <Col>
                {/* product description tab */}
                <ProductDescriptionTab product={filteredProducts} />
              </Col>
            </Row>
          </Container>
        </div>
      </LayoutTwo>
    );
  } else {
    return <div>Fetching Products</div>;
  }
};

export default ProductDetail;

// import React from "react";
// import { useParams } from "react-router-dom";

// function ProductDetail() {
//   let { id } = useParams();
//   let test = useParams();
//   console.log(id);
//   console.log(test);
//   return <div>hello from product details</div>;
// }

// export default ProductDetail;
