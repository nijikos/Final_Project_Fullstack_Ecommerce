import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MdViewComfy, MdApps } from "react-icons/md";
import { setActiveLayout } from "../../../lib/product";
import ProductContext from "../../../context/ProductContext";

const ShopHeader = ({
  sortedProductCount,
  productCount,
  getLayout,
  layoutClass,
}) => {
  const {
    products,
    setSort,
    selectedCategory,
    getProductsByCategory,
    sort,
    productsPerPage,
    currentPage,
  } = useContext(ProductContext);
  console.log("products from shopheader :", products);

  const productPerPageNumber =
    parseInt(currentPage) * parseInt(productsPerPage);
  console.log(currentPage);

  const sortByPrice = (val) => {
    console.log("sortbyprice clicked", val);
    if (val == "default") {
      console.log("default selected");
      setSort("default");
    } else if (val == "priceHighToLow") {
      console.log("high to low selected");
      setSort("priceHighToLow");
      // getProductsByCategory(selectedCategory, sort);
    } else if (val == "priceLowToHigh") {
      console.log("low to high selected");
      setSort("priceLowToHigh");
      // getProductsByCategory(selectedCategory, sort);
    }
    getProductsByCategory(selectedCategory, sort);
  };

  // console.log(
  //   "cs test sorting :",
  //   products.sort((a, b) => a.price - b.price)
  // );

  return (
    <div className='shop-header'>
      <Container className={layoutClass ? layoutClass : ""}>
        <Row className='align-items-center'>
          <Col md={5} className='text-center text-md-left'>
            Showing{" "}
            {productPerPageNumber <= products?.length
              ? productPerPageNumber
              : products?.length}{" "}
            of {products?.length} result
          </Col>

          <Col md={7}>
            <div className='shop-header__filter-icons justify-content-center justify-content-md-end'>
              <div className='single-icon filter-dropdown'>
                <select
                  onChange={(e) =>
                    // getFilterSortParams("filterSort", e.target.value)
                    // sortProductsByPrice(e.target.value)
                    sortByPrice(e.target.value)
                  }
                >
                  <option value='default'>Default</option>
                  <option value='priceHighToLow'>Price - High to Low</option>
                  <option value='priceLowToHigh'>Price - Low to High</option>
                </select>
              </div>

              <div className='single-icon grid-icons d-none d-lg-block'>
                <button
                  onClick={(e) => {
                    getLayout("grid three-column");
                    setActiveLayout(e);
                  }}
                >
                  <MdApps />
                </button>

                <button
                  className='active'
                  onClick={(e) => {
                    getLayout("grid four-column");
                    setActiveLayout(e);
                  }}
                >
                  <MdViewComfy />
                </button>
              </div>

              {/* <div className="single-icon advance-filter-icon">
                <button
                  onClick={() => setShopTopFilterStatus(!shopTopFilterStatus)}
                  className={shopTopFilterStatus ? "active" : ""}
                >
                  <IoMdFunnel /> Filter
                </button>
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopHeader;
