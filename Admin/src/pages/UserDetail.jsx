import React, { Component } from "react";
import axios from "axios";

class UserDetail extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    axios.get("http://localhost:3001/auth/user/").then((result) => {
      this.setState({
        users: result.data,
      });
    });
  }

  render() {
    // const {
    //   match: { params },
    // } = this.props;
    // console.log(params);

    // let userIndex = params.user_id;

    // console.log(userIndex + " = THIS IS INDEXXXX");
    // let i = 1;
    // console.log(this.state.users.slice(0, 1));
    // console.log(this.state.users.slice(1, 2));
    // console.log(this.state.users.slice(userIndex - 1, userIndex));

    // const detailContent = this.state.users
    //   .slice(userIndex - 1, userIndex)
    //   .map((item) => {
    //     let productName = item.no;
    //     let productImage = item.name;
    //     let productPrice = item.price;
    //     let productDescription = item.description;
    //     return (
    //       <div className="detail-wrapper">
    //         <h1 className="product-name">{productName}</h1>
    //         <img
    //           className="product-image"
    //           src={`http://localhost:3001/assets/images/${productImage}`}
    //           alt=""
    //         />
    //         <div className="description-wrapper">
    //           <p>{productPrice}</p>
    //           <p>{productDescription}</p>
    //         </div>
    //       </div>
    //     );
    //   });

    return (
      <div>
        <p>user detail</p>
        <p>name :</p>
        <p>user id :</p>
        <p>email :</p>
        <p>status :</p>
        <p>pending request :</p>
        <p>ongoing transactions :</p>
        <p>canceled orders :</p>
        <p>ongoing transactions :</p>
        <p>completed orders :</p>
        <p>buy request :</p>
        <p>on going transactions :</p>
        <p>order history :</p>

        {/* <h1>Ini component Detail</h1> */}
        {/* {detailContent} */}
      </div>
    );
  }
}

export default UserDetail;
