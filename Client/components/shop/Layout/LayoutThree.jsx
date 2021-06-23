import { Fragment } from "react";
import HeaderThree from "../HeaderThree";
import FooterOne from "../FooterOne";

const LayoutThree = ({ children }) => {
  return (
    <Fragment>
      <HeaderThree />
      {children}
      <FooterOne />
    </Fragment>
  );
};

export default LayoutThree;
