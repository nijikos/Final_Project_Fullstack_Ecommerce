import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminLayoutOne from "../components/Layout/AdminLayoutOne";
import DashboardCard from "../components/Layout/DashboardCard";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import Cookies from "universal-cookie";
import { Redirect } from "react-router-dom";

function Dashboard() {
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");

  const [dashboardData, setdashboardData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/dashboard`)
      .then((res) => setdashboardData(res.data[0]));
  }, []);

  const renderRedirect = () => {
    return <Redirect to='/' />;
  };

  return (
    <>
      {token ? (
        <AdminLayoutOne>
          <WelcomeBanner />
          <div className='grid grid-cols-12 gap-6'>
            <DashboardCard
              imgurl='https://img.icons8.com/fluent/48/000000/group.png'
              label='Total Users'
              data={dashboardData.total_users}
            />
            <DashboardCard
              imgurl='https://img.icons8.com/color/48/000000/lift-cart-here.png'
              label='Total Products'
              data={dashboardData.total_products}
            />
            <DashboardCard
              imgurl='https://img.icons8.com/color/48/000000/payment-history.png'
              label='Pending Payment Confirmation'
              data={dashboardData.waiting_confirmation}
            />
            <DashboardCard
              imgurl='https://img.icons8.com/color/48/000000/receipt.png'
              label='Ongoing Transactions'
              data={dashboardData.on_going}
            />
          </div>
        </AdminLayoutOne>
      ) : (
        <div>{renderRedirect()}</div>
      )}
    </>
  );
}

export default Dashboard;
