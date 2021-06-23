import React, { Component } from "react";
import { Link } from "react-router-dom";
import image from "../../assets/verificate.jpg";

export class VerificationUser extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center mt-5'>
        <div className='mt-5'>
          <div className='mt-5'>
            <div className='mt-5'>
              <div className='card' style={{ width: "18rem" }}>
                <img src={image} className='card-img-top' alt='...' />
                <div className='card-body'>
                  <h5 className='card-title text-center'>Account Verified</h5>
                  <p className='card-text text-center'>
                    Enjoy your shopping in Fnichure
                  </p>
                  <Link
                    to='/login'
                    className='btn btn-primary d-flex justify-content-center'
                  >
                    Go to Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerificationUser;
