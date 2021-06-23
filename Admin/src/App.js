import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

import { focusHandling } from "cruip-js-toolkit";
import "./charts/ChartjsConfig";

// import context
import { ProductProvider } from "./context/ProductContext";
import { AdminProvider } from "./context/AdminContext";

// Import pages
import Dashboard from "./pages/Dashboard.jsx";
import Users from "./pages/Users.jsx";
import Login from "./pages/Login.jsx";
import UserDetail from "./pages/UserDetail.jsx";
import Products from "./pages/Products.js";
import Transactions from "./pages/Transactions.jsx";
import SalesReport from "./pages/SalesReport.jsx";
import Shipping from "./pages/Shipping.jsx";
import InvoiceDetail from "./pages/InvoiceDetail.jsx";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";

import AddProduct from "./pages/dashboard/AddProduct";
import EditProduct from "./pages/dashboard/EditProduct";
import ListProducts from "./pages/dashboard/ListProducts";
import Request from "./pages/dashboard/Request";
import Warehouse from "./pages/dashboard/Warehouse";

import "./App.css";
import InvoiceVerify from "./pages/InvoiceVerify";
import Perpindahan from "./pages/Perpindahan";
function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  return (
    <AdminProvider>
      <ProductProvider>
        <Switch>
          <Route exact path='/'>
            <Login />
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
          {/* <Route path="/login">
        <Login />
      </Route> */}
          <Route exact path='/users'>
            <Users />
          </Route>
          <Route exact path='/users/detail/:user_id?'>
            <UserDetail />
          </Route>
          <Route exact path='/products'>
            <Products />
          </Route>
          <Route exact path='/transactions'>
            <Transactions />
          </Route>
          <Route exact path='/sales/report'>
            <SalesReport />
          </Route>
          <Route exact path='/shipping/:invoice_id'>
            <Shipping />
          </Route>
          <Route exact path='/invoice/:invoice_id'>
            <InvoiceDetail />
          </Route>
          <Route exact path='/invoice/verify/:invoice_id'>
            <InvoiceVerify />
          </Route>
          <Route exact path='/stock-transfer'>
            <Perpindahan />
          </Route>
          <Route exact path='/forgetpassword'>
            <ForgetPassword />
          </Route>
          <Route exact path='/resetpassword'>
            <ResetPassword />
          </Route>
          <Route path='/admin/products/add' exact component={AddProduct} />
          <Route
            path='/admin/products/edit/:productId'
            exact
            component={EditProduct}
          />
          <Route path='/admin/products/all' exact component={ListProducts} />
          <Route path='/admin/requests/all' exact component={Request} />
          <Route path='/admin/warehouses' exact component={Warehouse} />
        </Switch>
      </ProductProvider>
    </AdminProvider>
  );
}

export default App;
