import React from "react";
import { Link } from "react-router-dom";

function Buttons() {
  return (
    <div>
      <button type="button" className="btn btn-light">
        <Link to="/login">Login</Link>
      </button>{" "}
      <button type="button" className="btn btn-secondary">
        <Link to="/register">Register</Link>
      </button>
    </div>
  );
}

export default Buttons;
