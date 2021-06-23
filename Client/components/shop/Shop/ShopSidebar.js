import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import {
  getIndividualCategories,
  getIndividualColors,
  getIndividualTags,
  setActiveSort,
  getProducts,
  getDiscountPrice,
} from "../../../lib/product";
import ProductContext from "../../../context/ProductContext";

const ShopSidebar = ({ getSortParams }) => {
  useEffect(() => {
    getProductsByCategory(0, sort);
  }, []);

  const { products, getProductsByCategory, category, sort } =
    useContext(ProductContext);
  console.log("category dari dalam shop sidebar :", category);
  console.log("products from shop sidebar : ", products);
  return (
    <div className='shop-sidebar'>
      {/* category list */}
      <div className='single-sidebar-widget space-mb--40'>
        <h2 className='single-sidebar-widget__title space-mb--30'>
          Categories
        </h2>
        {category.length > 0 ? (
          <ul className='single-sidebar-widget__list single-sidebar-widget__list--category'>
            <li>
              <input
                type='radio'
                onClick={() => {
                  getProductsByCategory(0, sort);
                }}
                value='allCategories'
                name='category'
                id='category'
              />
              <label style={{ marginLeft: "12px" }} for='category'>
                All Categories
              </label>
            </li>
            {category.map((category, i) => {
              return (
                <li key={i}>
                  <input
                    type='radio'
                    value={category.name}
                    name='category'
                    id='category'
                    onClick={() => {
                      getProductsByCategory(category.id, sort);
                    }}
                  />
                  <label style={{ marginLeft: "12px" }} for='category'>
                    {category.name}
                  </label>
                  {/* {category.name}
                  </input> */}
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

export default ShopSidebar;
