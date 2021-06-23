import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

//IMPORT ELEMENTS
import Logo from "../../elements/shop/navbarmain/Logo";

import Icons from "../../elements/shop/navbarmain/Icons";

const NavigationBar = () => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.querySelector("header");
    setHeaderTop(header.offsetTop);
    setHeaderHeight(header.offsetHeight);
    window.addEventListener("scroll", handleScroll);
    scroll > headerTop
      ? (document.body.style.paddingTop = `${headerHeight}px`)
      : (document.body.style.paddingTop = 0);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <div>
      <header
        className={`topbar-shadow ${scroll > headerTop ? "is-sticky" : ""}`}
      >
        <Container className='wide'>
          <div
            className='header-content d-flex align-items-center justify-content-between position-relative space-py-mobile-only--30'
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            <Logo />
            <Icons />
          </div>
        </Container>
      </header>
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     cartItems: state.cartData,
//   };
// };

export default NavigationBar;
