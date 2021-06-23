import React from "react";
import { Container } from "react-bootstrap";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

// IMPORT STYLE
import "../../assets/custom/shop/styles.css";

// IMPORT COMPONENTS

function Account() {
  const { path } = useRouteMatch();

  return (
    <div>
      {/* NAVIGATION BAR WITH SEARCHBAR */}
      <p>this is account</p>
      {/* ROUTING HALAMAN SHOP */}
      <Container className='wide'>
        <Link to='/transaction'>
          <button>TO Transactions</button>
        </Link>
        {/* NANTI HASIL PATH LINK = /SHOP/... */}
        {/* <Route path={`${path}`} exact component={} />
        <Route path={`${path}/two`} component={} /> */}
      </Container>
    </div>
  );
}

export default Account;
