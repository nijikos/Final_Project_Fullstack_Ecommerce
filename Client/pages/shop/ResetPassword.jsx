import React, { Component } from "react";
import { Link } from "react-router-dom";
import LayoutThree from "../../components/shop/Layout/LayoutThree";
import { Container } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import "../../assets/custom/shop/styles.css";
import axios from "axios";
import swal from "sweetalert";

class ResetPassword extends Component {
  state = {
    email: "",
    resetpassword_success: false,
    resettpassword_failed: false,
  };

  reset(refs) {
    const self = this;
    const formData = new FormData();

    formData.append("email", refs.email.value);
    formData.append("password", refs.password.value);

    axios
      .patch("http://localhost:3001/auth/user/resetpassword", formData, {})
      .then(function (response) {
        console.log(response.data);

        if (response.data.success) {
          swal(
            "Reset Password Success!",
            "Please login with New Password",
            "success"
          );
          self.setState({
            resetpassword_success: true,
          });
        } else {
          swal(
            "Reset Password Failed!",
            "Please insert correct Email and New Password",
            "error"
          );
          self.setState({
            resetpassword_failed: true,
          });
        }
      })
      .catch(function (err) {});
  }

  render() {
    return (
      <LayoutThree>
        <BreadcrumbOne backgroundImage='/assets/images/backgrounds/breadcrumb-bg-2.jpg'>
          <ul className='breadcrumb__list'>
            <li>
              <Link href='/' as={process.env.PUBLIC_URL + "/"}>
                <a>User</a>
              </Link>
            </li>

            <li>Reset Password</li>
          </ul>
        </BreadcrumbOne>
        <Container>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-5'>
                <div className='card card-signin my-5'>
                  <div className='card-body p-0'>
                    <div className='row'>
                      <div className='col-lg'>
                        <div className='p-5'>
                          <div className='text-center'>
                            <h1 className='h4 text-gray-900 font-weight-bold mb-3'>
                              Reset Your Password
                            </h1>
                            <p className='mb-4'>
                              Just enter your email and new password. Then try
                              to login again.
                            </p>
                          </div>
                          <form className='form-signin'>
                            <div className='form-label-group text-left'>
                              <input
                                type='email'
                                id='inputEmail'
                                className='form-control'
                                placeholder='Email address'
                                ref='email'
                                required
                                autoFocus
                              />
                              <label htmlFor='inputEmail'>Re-Enter Email</label>
                            </div>
                            <div className='form-label-group'>
                              <input
                                type='password'
                                id='inputPassword'
                                className='form-control'
                                placeholder='Password'
                                ref='password'
                                required
                              />
                              <label htmlFor='inputPassword'>
                                Enter New Password{" "}
                              </label>
                            </div>
                            <input
                              className='btn btn-primary btn-user btn-block'
                              type='button'
                              onClick={() => this.reset(this.refs)}
                              value='SUBMIT'
                            />
                          </form>
                          <div
                            className='text-center mt-3'
                            style={{ color: "blue" }}
                          >
                            <Link className='medium' to='/login'>
                              Go to Login
                            </Link>
                          </div>
                        </div>
                      </div>
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

export default ResetPassword;
