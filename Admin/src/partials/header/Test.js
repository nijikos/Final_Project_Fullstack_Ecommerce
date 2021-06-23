import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import {
  IoIosSearch,
  IoMdPerson,
  IoIosCart,
  IoIosNotifications,
} from "react-icons/io";

const cookies = new Cookies();

class Icons extends Component {
  state = {
    login: true,
    user_detail: {},
  };

  componentWillMount() {
    const token = cookies.get("jwtToken");

    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        console.log(result);
        this.setState({
          user_detail: result.data.user_detail,
        });
      });
  }

  logout() {
    cookies.remove("jwtToken");

    this.setState({
      login: false,
    });
  }

  loginRedirect = () => {
    if (!this.state.login) {
      return <Redirect to="/login" />;
    }
  };

  render() {
    return (
      <div>
        {this.loginRedirect()}
        <div className="header-content__icons space-pl--15">
          <ul className="d-none d-lg-block">
            <li>
              <button>
                <IoIosNotifications />
              </button>
            </li>
            <li>
              <button>
                <IoIosCart />
              </button>
            </li>
            <li class="nav-item dropdown alert alert-secondary">
              <a
                class="nav-item dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {this.state.user_detail.first_name}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Transaction
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" onClick={() => this.logout()}>
                  Logout
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Icons;
