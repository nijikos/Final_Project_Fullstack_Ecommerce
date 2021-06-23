import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../../assets/custom/shop/styles.css";
import axios from "axios";

function NotificationItem({ id, title, content, status, time }) {
  const [read, setread] = useState(false);

  const dateFormat = require("dateformat");

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:3001/users/notification/${id}`).then(() => {
      console.log("Notification Delete Success From FrontEnd");
    });
  };

  return (
    <>
      <div
        className={
          status == "read" ? "notification-read" : "notification-container"
        }
        onClick={() => {
          axios
            .patch(`http://localhost:3001/users/notification/${id}`)
            .then((res) => {
              console.log("notification status patched");
            });
        }}
      >
        <div className='notification-text'>
          <p className='notification-title'>{title}</p>
          <p>{content}</p>
          <p>{dateFormat(time, "shortDate")}</p>
          <p className='notification-status'>{status}</p>
        </div>
        <div>
          <button
            className='notification-delete'
            onClick={() => deleteHandler(id)}
          >
            remove
          </button>
        </div>
      </div>
    </>
  );
}

export default NotificationItem;
