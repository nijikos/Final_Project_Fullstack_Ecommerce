import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { SlideDown } from "react-slidedown";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import { getSortedProducts } from "../../lib/product";
import Cookies from "universal-cookie";
import {
  ShopHeader,
  ShopFilter,
  ShopSidebar,
  ShopProducts,
} from "../../components/shop/Shop";
import axios from "axios";
import LayoutOne from "../../components/shop/Layout/LayoutOne";
import LayoutThree from "../../components/shop/Layout/LayoutThree";
import ProductContext from "../../context/ProductContext";
// const LeftSidebar = ({ products })
const cookies = new Cookies();

const Products = ({ category }) => {
  const { products } = useContext(ProductContext);
  const token = cookies.get("jwtToken");
  console.log("CS DARI PRODUCT", products);
  const [layout, setLayout] = useState("grid four-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);

  const pageLimit = 20;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  // //==================SORT PRODUCT
  // useEffect(() => {
  //   let sortedProducts = getSortedProducts(products, sortType, sortValue);
  //   const filterSortedProducts = getSortedProducts(
  //     sortedProducts,
  //     filterSortType,
  //     filterSortValue
  //   );
  //   sortedProducts = filterSortedProducts;
  //   setSortedProducts(sortedProducts);
  //   setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  // }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);
  const renderRedirect = () => {
    return <Redirect to='/' />;
  };
  return (
    <>
      {/* {renderRedirect()} */}
      {token ? (
        <LayoutOne>
          <div>
            <BreadcrumbOne backgroundImage='/assets/images/backgrounds/breadcrumb-bg-1.png'>
              <ul className='breadcrumb__list'>
                <li>
                  <Link href='/' as={process.env.PUBLIC_URL + "/"}>
                    <a>Home</a>
                  </Link>
                </li>

                <li>Shop</li>
              </ul>
            </BreadcrumbOne>
            <div className='shop-page-content'>
              {/* shop page header */}
              <ShopHeader
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                // productCount={products.length}
                // sortedProductCount={products.length}
                shopTopFilterStatus={shopTopFilterStatus}
                setShopTopFilterStatus={setShopTopFilterStatus}
              />

              {/* shop header filter */}
              {/* <SlideDown closed={shopTopFilterStatus ? false : true}>
    <ShopFilter products={products} getSortParams={getSortParams} />
  </SlideDown> */}

              {/* shop page body */}
              <div className='shop-page-content__body space-mt--r130 space-mb--r130'>
                <Container>
                  <Row>
                    <Col
                      lg={3}
                      className='order-2 order-lg-1 space-mt-mobile-only--50'
                    >
                      {/* shop sidebar */}
                      <ShopSidebar
                      // products={products}
                      // getSortParams={getSortParams}
                      />
                    </Col>

                    <Col lg={9} className='order-1 order-lg-2'>
                      {/* shop products */}

                      <ShopProducts
                        layout={layout}
                        // products={products}
                        category={category}
                      />

                      {/* shop product pagination */}
                      <div className='pro-pagination-style'>
                        <Paginator
                          totalRecords={sortedProducts.length}
                          pageLimit={pageLimit}
                          pageNeighbours={2}
                          setOffset={setOffset}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageContainerClass='mb-0 mt-0'
                          pagePrevText='«'
                          pageNextText='»'
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </LayoutOne>
      ) : (
        <LayoutThree>
          <div>
            <BreadcrumbOne backgroundImage='/assets/images/backgrounds/breadcrumb-bg-1.png'>
              <ul className='breadcrumb__list'>
                <li>
                  <Link href='/' as={process.env.PUBLIC_URL + "/"}>
                    <a>Home</a>
                  </Link>
                </li>

                <li>Shop</li>
              </ul>
            </BreadcrumbOne>
            <div className='shop-page-content'>
              {/* shop page header */}
              <ShopHeader
                getLayout={getLayout}
                getFilterSortParams={getFilterSortParams}
                // productCount={products.length}
                // sortedProductCount={products.length}
                shopTopFilterStatus={shopTopFilterStatus}
                setShopTopFilterStatus={setShopTopFilterStatus}
              />

              {/* shop header filter */}
              {/* <SlideDown closed={shopTopFilterStatus ? false : true}>
   <ShopFilter products={products} getSortParams={getSortParams} />
 </SlideDown> */}

              {/* shop page body */}
              <div className='shop-page-content__body space-mt--r130 space-mb--r130'>
                <Container>
                  <Row>
                    <Col
                      lg={3}
                      className='order-2 order-lg-1 space-mt-mobile-only--50'
                    >
                      {/* shop sidebar */}
                      <ShopSidebar
                      // products={products}
                      // getSortParams={getSortParams}
                      />
                    </Col>

                    <Col lg={9} className='order-1 order-lg-2'>
                      {/* shop products */}

                      <ShopProducts
                        layout={layout}
                        // products={products}
                        category={category}
                      />

                      {/* shop product pagination */}
                      <div className='pro-pagination-style'>
                        <Paginator
                          totalRecords={sortedProducts.length}
                          pageLimit={pageLimit}
                          pageNeighbours={2}
                          setOffset={setOffset}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          pageContainerClass='mb-0 mt-0'
                          pagePrevText='«'
                          pageNextText='»'
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </LayoutThree>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // products: state.productData,
  };
};

export default connect(mapStateToProps)(Products);
