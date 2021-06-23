import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  IoIosSearch,
  IoMdPerson,
  IoIosCart,
  IoIosNotifications,
} from "react-icons/io";
import CartContext from "../../../context/CartContext";

const cookies = new Cookies();

function Icons() {
  const [login, setlogin] = useState(true);
  const { cartCount, notifCount } = useContext(CartContext);
  // const [cartCount, setcartCount] = useState(0);
  const [user_detail, setuser_detail] = useState({});
  const [refresh, setrefresh] = useState(false);
  const token = cookies.get("jwtToken");

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        console.log("TOKEN NAVABR ICON: ", result.data);
        setuser_detail(result.data.user_detail);
        setrefresh(!refresh);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/users/cart/count/${user_detail.user_id}`)
  //     .then((result) => {
  //       console.log("INI USER ID", user_detail.user_id);
  //       console.log("axios ke 2", result.data[0].count);
  //       setcartCount(result.data[0].count);
  //     });
  // }, [refresh]);

  const logout = () => {
    cookies.remove("jwtToken");

    setlogin(false);
  };

  const loginRedirect = () => {
    if (!login) {
      return <Redirect to='/' />;
    }
  };

  return (
    <div>
      {loginRedirect()}
      <div className='header-content__icons space-pl--15'>
        <ul className='d-none d-lg-block'>
          <li>
            <Link to='/my-account/notifications'>
              <button>
                <IoIosNotifications />
                {notifCount > 0 ? (
                  <span className='count'>{notifCount}</span>
                ) : (
                  <></>
                )}
              </button>
            </Link>
          </li>
          <li>
            <Link to='/cart'>
              <button>
                <IoIosCart />
                <span className='count'>{cartCount}</span>
              </button>
            </Link>
          </li>
          <li className='nav-item dropdown alert alert-secondary'>
            <a
              className='nav-item dropdown-toggle'
              href='#'
              id='navbarDropdown'
              role='button'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              {user_detail.first_name}
            </a>
            <div className='dropdown-menu' aria-labelledby='navbarDropdown'>
              <Link to='/my-account'>
                <a className='dropdown-item'>My Account</a>
              </Link>
              <div className='dropdown-divider'></div>
              <a className='dropdown-item' onClick={() => logout()}>
                Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Icons;
