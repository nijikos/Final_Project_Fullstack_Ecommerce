import React, { Component } from "react";
import { Link } from "react-router-dom";
import LayoutThree from "../../components/shop/Layout/LayoutThree";
import { Container } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import "../../assets/custom/shop/styles.css";
import swal from "sweetalert";
import axios from "axios";

class ForgotPassword extends Component {
  state = {
    email: "",
    forgotpassword_success: false,
    forgotpassword_failed: false,
  };

  forgot(refs) {
    const self = this;
    const formData = new FormData();

    formData.append("email", refs.email.value);
    formData.append("security_answer", refs.security_answer.value);

    axios
      .post("http://localhost:3001/auth/user/change-pass", formData, {})
      .then(function (response) {
        console.log(response.data);

        if (response.data.success) {
          swal(
            "Forget Password Success!",
            "Please check your email",
            "success"
          );
          self.setState({
            forgotpassword_success: true,
          });
        } else {
          swal(
            "Forget Password Failed!",
            "Email and Security Answer not match",
            "error"
          );
          self.setState({
            forgotpassword_failed: true,
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

            <li>Forgot Password</li>
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
                              Forgot Your Password?
                            </h1>
                            <p className='mb-4'>
                              Just enter your email address below and we'll send
                              you a link to reset your password!
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
                              <label htmlFor='inputEmail'>
                                Enter Email Address...
                              </label>
                            </div>
                            <div className='form-label-group'>
                              <input
                                type='text'
                                id='inputSecurityAnswer'
                                className='form-control'
                                placeholder='security_answer'
                                ref='security_answer'
                                required
                              />
                              <label htmlFor='inputSecurityAnswer'>
                                What is your favorite animal?
                              </label>
                            </div>
                            <input
                              className='btn btn-primary btn-user btn-block'
                              type='button'
                              onClick={() => this.forgot(this.refs)}
                              value='SUBMIT'
                            />
                          </form>
                          <div
                            className='text-center mt-3'
                            style={{ color: "blue" }}
                          >
                            <Link className='medium' to='/register'>
                              Create an Account!
                            </Link>
                          </div>
                          <div
                            className='text-center mt-3'
                            style={{ color: "blue" }}
                          >
                            <Link className='medium' to='/login'>
                              Already have an account? Login!
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

export default ForgotPassword;
