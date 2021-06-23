import { Fragment } from "react";
import HeaderOne from "../HeaderOne";
import FooterOne from "../FooterOne";

const LayoutOne = ({ children }) => {
  return (
    <Fragment>
      <HeaderOne />
      {children}
      <FooterOne />
    </Fragment>
  );
};

export default LayoutOne;
