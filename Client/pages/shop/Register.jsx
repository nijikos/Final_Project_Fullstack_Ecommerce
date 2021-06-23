import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import LayoutThree from "../../components/shop/Layout/LayoutThree";
import { Container } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import "../../assets/custom/shop/styles.css";
import swal from "sweetalert";

class UserRegister extends Component {
  state = {
    redirect: false,
    register_success: false,
    register_failed: false,
  };

  register(refs) {
    const self = this;
    const formData = new FormData();

    formData.append("first_name", refs.first_name.value);
    formData.append("last_name", refs.last_name.value);
    formData.append("email", refs.email.value);
    formData.append("password", refs.password.value);
    formData.append("security_answer", refs.security_answer.value);

    axios
      .post("http://localhost:3001/auth/user/register", formData, {})
      .then(function (response) {
        console.log(response.data);

        if (response.data.success) {
          swal(
            "Register Success!",
            "Please check your email and verify account",
            "success"
          );
          self.setState({
            register_success: true,
          });
        } else {
          swal("Register Failed!", "Email already taken, try another", "error");
          self.setState({
            register_failed: true,
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

            <li>Register</li>
          </ul>
        </BreadcrumbOne>
        <Container>
          <div>
            <div className='container'>
              <div className='row'>
                <div className='col-sm-9 col-md-7 col-lg-5 mx-auto'>
                  <div className='card card-signin my-4'>
                    <div className='card-body'>
                      <h5 className='card-title text-center font-weight-bold'>
                        Create an Account!
                      </h5>
                      <form className='form-signin text-left mt-3'>
                        <div className='form-label-group'>
                          <input
                            type='text'
                            id='inputFirstName'
                            className='form-control'
                            placeholder='first_name'
                            ref='first_name'
                            required
                            autoFocus
                          />
                          <label htmlFor='inputFirstName'>First Name</label>
                        </div>
                        <div className='form-label-group'>
                          <input
                            type='text'
                            id='inputLastName'
                            className='form-control'
                            placeholder='last_name'
                            ref='last_name'
                            required
                          />
                          <label htmlFor='inputLastName'>Last Name</label>
                        </div>
                        <div className='form-label-group'>
                          <input
                            type='text'
                            id='inputEmail'
                            className='form-control'
                            placeholder='email'
                            ref='email'
                            required
                          />
                          <label htmlFor='inputEmail'>Email</label>
                        </div>
                        <div className='form-label-group'>
                          <input
                            type='password'
                            id='inputPassword'
                            className='form-control'
                            placeholder='password'
                            ref='password'
                            required
                          />
                          <label htmlFor='inputPassword'>Password</label>
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
                          onClick={() => this.register(this.refs)}
                          value='REGISTER'
                        />
                        <div className='text-center mt-3'>
                          <Link
                            to='/forgotpassword'
                            className='medium'
                            style={{ color: "blue" }}
                          >
                            Forgot Password ?
                          </Link>
                        </div>
                        <div className='text-center mt-3'>
                          <Link
                            to='/login'
                            className='medium'
                            style={{ color: "blue" }}
                          >
                            Already have an account? Login!
                          </Link>
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

export default UserRegister;
