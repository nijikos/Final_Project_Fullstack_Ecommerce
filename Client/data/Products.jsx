import React from "react";

import axios from "axios";

export default class PersonList extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    axios.get(`http://localhost:3001/products/all`).then((res) => {
      this.setState({ products: res.data });
    });
  }

  render() {
    return this.state.products;
  }
}
