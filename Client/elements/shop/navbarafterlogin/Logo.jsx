import React from "react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <div className='header-content__logo d-flex align-items-center space-pr--15'>
      <Link to='/'>
        <h1>fnichure</h1>
      </Link>
    </div>
  );
}

export default Logo;
