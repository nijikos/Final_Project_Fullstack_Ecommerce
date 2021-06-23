import React, { useState, useEffect } from "react";
import axios from "axios";

//import custom hooks
import useInputState from "../hooks/useInputState";

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
  const [warehouse, setWarehouse] = useState([]);
  const [productTable, setProductTable] = useState([]);

  // admin add products
  const [productSKU, handleProductSKUChange, resetSKU] = useInputState("");
  const [productCategoryId, handleProductCategoryIdChange, resetCategoryId] =
    useInputState("");
  const [productName, handleNameChange, resetName] = useInputState("");
  const [productPrice, handlePriceChange, resetPrice] = useInputState("");
  const [productDesc, handleDescChange, resetDesc] = useInputState("");
  const [productCategory, handleCategoryChange, resetCategory] =
    useInputState("");
  const [productModal, handleProductModalChange, resetProductModal] =
    useInputState("");

  // update stock per warehouse
  const [stockKelapaGading, handleStockKelapaGading, resetStockKelapaGading] =
    useInputState();
  const [stockKemayoran, handleStockKemayoran, resetStockKemayoran] =
    useInputState();
  const [stockPalmerah, handleStockPalmerah, resetStockPalmerah] =
    useInputState();
  const [stockCakung, handleStockCakung, resetStockCakung] = useInputState();
  const [stockPasarMinggu, handleStockPasarMinggu, resetStockPasarMinggu] =
    useInputState();

  //update image URL'
  const [imageUrl1, handleImageUrl1Change, resetImageUrl1] = useInputState();
  const [imageUrl2, handleImageUrl2Change, resetImageUrl2] = useInputState();
  const [imageUrl3, handleImageUrl3Change, resetImageUrl3] = useInputState();

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

  const searchProductTable = (productTable, q) => {
    if ((q = "null")) {
      return productTable;
    } else {
      console.log("cs dari search productTable : ", productTable);
      const data = productTable[0] && Object.keys(productTable[0]);
      return console.log(data);
      // products.filter((p) => p.name.toLowerCase().indexOf(q) >= -1);
    }
  };

  const getWarehouse = () => {
    axios
      .get("http://localhost:3001/admin/warehouse")
      .then((res) => {
        setWarehouse(res.data);
      })
      .catch((err) => console.log(err));
  };

  const addProduct = (
    id,
    productSKU,
    productCategoryId,
    productName,
    productPrice,
    productDesc,
    productModal
  ) => {
    let productData = {
      id: id,
      sku: productSKU,
      category_id: productCategoryId,
      name: productName,
      price: productPrice,
      description: productDesc,
      modal: productModal,
    };

    axios
      .patch("http://localhost:3001/admin/products/add", productData)
      .then((res) => {
        console.log("add product res data", res.data);
      })
      .catch((err) => console.log(err));
  };

  const addProduct2 = (
    productSKU,
    productCategoryId,
    productName,
    productPrice,
    productDesc,
    productModal,
    stockKelapaGading,
    stockKemayoran,
    stockPalmerah,
    stockCakung,
    stockPasarMinggu,
    imageUrl1,
    imageUrl2,
    imageUrl3
  ) => {
    let productData = {
      sku: productSKU,
      category_id: productCategoryId,
      name: productName,
      price: productPrice,
      description: productDesc,
      modal: productModal,
      stockKelapaGading,
      stockKemayoran,
      stockPalmerah,
      stockCakung,
      stockPasarMinggu,
      imageUrl1,
      imageUrl2,
      imageUrl3,
    };

    axios
      .patch("http://localhost:3001/admin/products/add2", productData)
      .then((res) => {
        console.log("add product res data", res.data);
      })
      .catch((err) => console.log(err));
  };

  const addProductStock = (
    id,
    stockKelapaGading,
    stockKemayoran,
    stockPalmerah,
    stockCakung,
    stockPasarMinggu
  ) => {
    let productData = {
      id,
      stockKelapaGading,
      stockKemayoran,
      stockPalmerah,
      stockCakung,
      stockPasarMinggu,
    };
    console.log("product data dari addproductStock :", productData);

    axios
      .patch("http://localhost:3001/admin/products/addStock", productData)
      .then((res) => {
        console.log("add product stock res data", res.data);
      })
      .catch((err) => console.log(err));
  };

  const addProductImage = (id, imageUrl1, imageUrl2, imageUrl3) => {
    let productData = {
      id,
      imageUrl1,
      imageUrl2,
      imageUrl3,
    };

    axios
      .patch(
        "http://localhost:3001/admin/products/addProductImage",
        productData
      )
      .then((res) => {
        console.log("add product image res data", res.data);
      })
      .catch((err) => console.log(err));
  };

  const getProductTable = () => {
    axios
      .get("http://localhost:3001/admin/products/getProductTable")
      .then((res) => {
        console.log("ini res data product table : ", res.data);
        setProductTable(res.data);
      })
      .catch((err) => console.log(err));
  };

  const editProduct = (
    id,
    productSKU,
    productCategoryId,
    productName,
    productPrice,
    productDesc,
    productModal,
    stockKelapaGading,
    stockKemayoran,
    stockPalmerah,
    stockCakung,
    stockPasarMinggu,
    imageUrl1,
    imageUrl2,
    imageUrl3
  ) => {
    let productData = {
      sku: productSKU,
      category_id: productCategoryId,
      name: productName,
      price: productPrice,
      description: productDesc,
      modal: productModal,
      stockKelapaGading,
      stockKemayoran,
      stockPalmerah,
      stockCakung,
      stockPasarMinggu,
      imageUrl1,
      imageUrl2,
      imageUrl3,
    };

    axios
      .patch("http://localhost:3001/admin/products/add2", productData)
      .then((res) => {
        console.log("add product res data", res.data);
      })
      .catch((err) => console.log(err));
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
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log("current products from gridlistwrapper :", currentProducts);

  //   ============ CALLING ALL INIT STATE =============
  useEffect(() => {
    // getProducts();
    getCategory();
    getdbProducts();
    getWarehouse();
    getProductTable();
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
        searchProductTable,
        q,
        setQ,
        loading,
        currentProducts,
        productsPerPage,
        paginate,
        currentPage,
        warehouse,
        addProduct,
        addProduct2,
        productName,
        handleNameChange,
        resetName,
        productPrice,
        handlePriceChange,
        resetPrice,
        productDesc,
        handleDescChange,
        resetDesc,
        productCategory,
        handleCategoryChange,
        resetCategory,
        productSKU,
        handleProductSKUChange,
        resetSKU,
        productCategoryId,
        handleProductCategoryIdChange,
        resetCategoryId,
        productModal,
        handleProductModalChange,
        resetProductModal,
        addProductStock,
        stockKelapaGading,
        handleStockKelapaGading,
        resetStockKelapaGading,
        stockKemayoran,
        handleStockKemayoran,
        resetStockKemayoran,
        stockPalmerah,
        handleStockPalmerah,
        resetStockPalmerah,
        stockCakung,
        handleStockCakung,
        resetStockCakung,
        stockPasarMinggu,
        handleStockPasarMinggu,
        resetStockPasarMinggu,
        addProductImage,
        imageUrl1,
        handleImageUrl1Change,
        resetImageUrl1,
        imageUrl2,
        handleImageUrl2Change,
        resetImageUrl2,
        imageUrl3,
        handleImageUrl3Change,
        resetImageUrl3,
        productTable,
        setProductTable,
        editProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
