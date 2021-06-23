// import { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import {
//   Link,
//   Route,
//   useRouteMatch,
//   useParams,
//   Redirect,
// } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
// import Paginator from "react-hooks-paginator";
// import { SlideDown } from "react-slidedown";
// import LayoutOne from "../../components/shop/Layout/LayoutOne";
// import LayoutThree from "../../components/shop/Layout/LayoutThree";
// import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
// // import { getSortedProducts } from "../../lib/product";
// import {
//   ShopHeader,
//   ShopFilter,
//   ShopSidebar,
//   ShopProducts,
// } from "../../components/shop/Shop";
// import axios from "axios";
// import Cookies from "universal-cookie";
// // const LeftSidebar = ({ products })
// import Products from "./Products";
// import ProductDetail from "./ProductDetail";

// const LeftSidebar = () => {
//   const { path } = useRouteMatch();
//   const cookies = new Cookies();
//   const token = cookies.get("jwtToken");
//   // axios
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [redirect, setredirect] = useState(false);
//   const [refresh, setrefresh] = useState(false);

//   useEffect(() => {
//     axios.get("http://localhost:3001/products/all").then((res) => {
//       console.log("res data: ", res.data);
//       const fetchedProducts = res.data;
//       setProducts(fetchedProducts);
//       setredirect(true);
//     });

//     axios.get(`http://localhost:3001/products/categories/1`).then((res) => {
//       console.log("res data dari category id: ", res.data);
//       setCategory(res.data);
//     });
//   }, []);

//   console.log("CS DARI SHOP", products);
//   let useEffectTrigger = true;

//   const renderRedirect = () => {
//     return <Redirect to='/' />;
//   };

//   return (
//     <>
//       {renderRedirect()}
//       {token ? (
//         <LayoutOne>
//           <Route path={`/product/:id`}>
//             <ProductDetail
//               products={products}
//               category={category}
//               trigger={useEffectTrigger}
//             />
//           </Route>
//           <Route path={`${path}`} exact>
//             <Products products={products} category={category} />
//           </Route>
//         </LayoutOne>
//       ) : (
//         <LayoutThree>
//           <Route path={`/product/:id`}>
//             <ProductDetail
//               products={products}
//               category={category}
//               trigger={useEffectTrigger}
//             />
//           </Route>
//           <Route path={`${path}`} exact>
//             <Products products={products} category={category} />
//           </Route>
//         </LayoutThree>
//       )}
//     </>
//   );
// };

// // {`${match.url}/product/:product_id`}
// export default LeftSidebar;

// // /shop/product/:product_id
