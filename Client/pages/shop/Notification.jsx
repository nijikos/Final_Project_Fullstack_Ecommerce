import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import LayoutTwo from "../../components/shop/Layout/LayoutTwo";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import axios from "axios";
import Cookies from "universal-cookie";
import "../../assets/custom/shop/styles.css";
import NotificationItem from "../../components/shop/Notification/NotificationItem";

function Notification() {
  // for token
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");
  const [userid, setuserid] = useState(null);
  const [user_detail, setuser_detail] = useState({});

  //for refreshes
  const [refresh, setrefresh] = useState(false);

  // from axios
  const [notificationData, setnotificationData] = useState([]);

  // untuk dapat user details (dapat idnya)
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        console.log("TOKEN NAVABR ICON: ", result.data.user_detail);
        console.log("TOKEN NAVABR USER ID: ", result.data.user_detail.user_id);
        setuser_detail(result.data.user_detail);
        setuserid(result.data.user_detail.user_id);
        setrefresh(!refresh);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/notification/${userid}`)
      .then((res) => {
        console.log("res data dari axios get notification : ", res.data);
        setnotificationData(res.data);
      });
  }, [refresh, notificationData]);

  const markAllRead = () => {
    axios
      .patch(`http://localhost:3001/users/notification/read-all/${userid}`)
      .then(() => console.log("all notification read"));
  };

  const renderRedirect = () => {
    return <Redirect to='/login' />;
  };
  return (
    <>
      {token ? (
        <LayoutTwo>
          {/* breadcrumb */}
          <BreadcrumbOne
            pageTitle='Notifications'
            backgroundImage='/assets/images/backgrounds/breadcrumb-bg-2.jpg'
          >
            <ul className='breadcrumb__list'>
              <li>
                <Link to='/'>
                  <a>Home</a>
                </Link>
              </li>

              <li>Notifications</li>
            </ul>
          </BreadcrumbOne>
          <div className='notification-page'>
            <button
              className='notification-delete'
              onClick={() => markAllRead()}
            >
              Mark all as read
            </button>

            {notificationData.map((item, i) => {
              return (
                <NotificationItem
                  id={item.id}
                  title={item.notification_title}
                  content={item.notification_text}
                  status={item.status}
                  time={item.time}
                />
              );
            })}
          </div>
        </LayoutTwo>
      ) : (
        <div>{renderRedirect()}</div>
      )}
    </>
  );
}

export default Notification;
