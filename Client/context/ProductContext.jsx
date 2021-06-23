import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const ProductContext = React.createContext();

export const ProductProvider = (props) => {
  // ============ STATE ============
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [dbproducts, setDbProducts] = useState([]);
  const [sort, setSort] = useState("default");
  const [selectedCategory, setSelectedCategory] = useState();
  const [stock, setStock] = useState();
  const [qty, setQty] = useState(1);
  const [q, setQ] = useState(null);

  // ============ CALLING AXIOS TO SET STATE =============
  const getProducts = () => {
    axios.get("http://localhost:3001/products/all").then((res) => {
      console.log("res data dari getProducts: ", res.data);
      const fetchedData = res.data;
      setProducts(fetchedData);
    });
  };

  const getCategory = () => {
    axios.get(`http://localhost:3001/product/categories`).then((res) => {
      console.log("res data dari category id: ", res.data.result);
      setCategory(res.data.result);
      // console.log("category after useEffect: ", category);
    });
  };

  const getProductsByCategory = (category_id, sort) => {
    axios
      .get(
        `http://localhost:3001/product/filter?category=${category_id}&sort=${sort}`
      )
      .then((res) => {
        console.log("res dari getProductsByCategory : ", res.data);
        setProducts(res.data.result);
      });
  };

  const sortProductsByPrice = (sort_params) => {
    axios
      .get(`http://localhost:3001/product/sort/${sort_params}`)
      .then((res) => {
        console.log("res data dari sortProductsByPrice : ", res.data.result);
        setProducts(res.data.result);
      });
  };

  const getdbProducts = (product_id) => {
    axios
      .get(`http://localhost:3001/product/:${product_id}`)
      .then((res) => {
        console.log("PRODUCT DETAIL RES DATA ", res.data);
        const fetchedProducts = res.data.result;
        // setStock(res.data.stock);
        setDbProducts(fetchedProducts);
        // console.log(dbproducts);
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (product_id, user_id, qty) => {
    let data = {
      product_id: product_id,
      qty: qty,
      user_id: user_id,
    };

    axios
      .patch(`http://localhost:3001/product/addtocart`, data)
      .then((res) => {
        console.log("add cart res data", res.data);
      })
      .catch((err) => console.log(err));
  };

  const getCartCount = () => [
    axios
      .get("http://localhost:3001/cart/count/:user_id")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err)),
  ];

  const getProductStock = (product_id) => {
    axios
      .get(`http://localhost:3001/product/stock/${product_id}`)
      .then((res) => {
        console.log("hellooo: ", res.data);
        setStock(res.data);
      })
      .catch((err) => console.log(err));
  };

  const search = (products, q) => {
    if ((q = "null")) {
      return products;
    } else {
      console.log("cs dari search : ", products);
      const data = products[0] && Object.keys(products[0]);
      return console.log(data);
      // products.filter((p) => p.name.toLowerCase().indexOf(q) >= -1);
    }
  };

  // untuk pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    products ? setLoading(false) : setLoading(true);
  }, []);

  // change page for paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log("current products from gridlistwrapper :", currentProducts);

  //   ============ CALLING ALL INIT STATE =============
  useEffect(() => {
    // getProducts();
    getCategory();
    getdbProducts();
    // getProductStock();
    // addToCart();
  }, []);

  useEffect(() => {
    console.log("cs dari useEffect :", sort);
    getProducts();
    getProductsByCategory();
    // addToCart();
  }, [sort]);

  // **************** RETURN *********************
  return (
    <ProductContext.Provider
      value={{
        getProductsByCategory,
        getProducts,
        sortProductsByPrice,
        addToCart,
        setQty,
        qty,
        dbproducts,
        category,
        products,
        setProducts,
        sort,
        setSort,
        selectedCategory,
        setSelectedCategory,
        stock,
        getProductStock,
        search,
        q,
        setQ,
        loading,
        currentProducts,
        productsPerPage,
        paginate,
        currentPage,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
