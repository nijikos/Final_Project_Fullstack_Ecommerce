import { Fragment } from "react";
import HeaderTwo from "../HeaderTwo";
import FooterOne from "../FooterOne";

const LayoutTwo = ({ children }) => {
  return (
    <Fragment>
      <HeaderTwo />
      {children}
      <FooterOne />
    </Fragment>
  );
};

export default LayoutTwo;
