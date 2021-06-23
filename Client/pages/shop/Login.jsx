import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import LayoutThree from "../../components/shop/Layout/LayoutThree";
import { Container } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import "../../assets/custom/shop/styles.css";
import swal from "sweetalert";

const cookies = new Cookies();

class Login extends Component {
  state = {
    redirect: false,
    login_failed: false,
    isPasswordShown: false,
  };

  login(refs) {
    const self = this;
    const formData = new FormData();
    formData.append("email", refs.email.value);
    formData.append("password", refs.password.value);
    this.setState({ user_email: refs.email.value });

    axios
      .post("http://localhost:3001/auth/user/login", formData, {})
      .then(function (response) {
        console.log(response.data);

        if (response.data.success) {
          cookies.set("jwtToken", response.data.token, { path: "/" });
          self.setState({ redirect: true });
        } else {
          swal("Login Failed!", "Email and Password not match", "error");
          self.setState({
            login_failed: true,
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });

    axios
      .patch("http://localhost:3001/auth/user/login", formData, {})
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />;
    }
  };

  render() {
    const { isPasswordShown } = this.state;
    return (
      <LayoutThree>
        <BreadcrumbOne backgroundImage='/assets/images/backgrounds/breadcrumb-bg-2.jpg'>
          <ul className='breadcrumb__list'>
            <li>
              <Link href='/' as={process.env.PUBLIC_URL + "/"}>
                <a>User</a>
              </Link>
            </li>

            <li>Login</li>
          </ul>
        </BreadcrumbOne>
        <Container>
          <div>
            {this.renderRedirect()}
            <div className='container'>
              <div className='row'>
                <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                  <div className='card card-signin my-5'>
                    <div className='card-body'>
                      <h5 className='card-title text-center font-weight-bold mb-4'>
                        User Login Area
                      </h5>
                      <form className='form-signin'>
                        <div className='form-label-group text-left'>
                          <input
                            type='text'
                            id='inputEmail'
                            className='form-control'
                            placeholder='Email address'
                            ref='email'
                            required
                            autoFocus
                          />
                          <label htmlFor='inputEmail'>Email</label>
                        </div>
                        <div className='form-label-group text-left'>
                          <input
                            type={isPasswordShown ? "text" : "password"}
                            id='inputPassword'
                            className='form-control'
                            placeholder='Password'
                            ref='password'
                            required
                          />
                          <label htmlFor='inputPassword'>Password</label>
                        </div>
                        <div className='custom-control custom-checkbox mb-3'>
                          <input
                            type='checkbox'
                            className='custom-control-input'
                            id='customCheck1'
                            onClick={this.togglePasswordVisiblity}
                          />
                          <label
                            className='custom-control-label'
                            htmlFor='customCheck1'
                          >
                            Show password
                          </label>
                        </div>
                        <input
                          className='btn btn-lg btn-primary btn-block text-uppercase'
                          onClick={() => this.login(this.refs)}
                          value='Login'
                        />
                        <div
                          className='text-center mt-3'
                          style={{ color: "blue" }}
                        >
                          <Link to='/forgotpassword'>Forgot Password?</Link>
                        </div>

                        <div
                          className='text-center mt-3'
                          style={{ color: "blue" }}
                        >
                          <Link to='/register'>Create an Account!</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </LayoutThree>
    );
  }
}

export default Login;
