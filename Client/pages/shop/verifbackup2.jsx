import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Row } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import LayoutTwo from "../../components/shop/Layout/LayoutTwo";
import { useForm } from "react-hook-form";
import "../../assets/custom/shop/styles.css";

function PaymentVerification() {
  const { register, handleSubmit } = useForm();
  const [redirect, setredirect] = useState(false);
  const [isSent, setisSent] = useState(false);

  const verificationSent = () => {
    setisSent(true);
  };

  const cookies = new Cookies();
  const token = cookies.get("jwtToken");
  const [userid, setuserid] = useState(null);
  const [addClicked, setAddClicked] = useState(false);
  const [haveFile, sethaveFile] = useState(false);
  const [selectedFile, setselectedFile] = useState(null);

  //data tampilan
  const [invoiceHead, setinvoiceHead] = useState([]);
  const [warehouseLocation, setwarehouseLocation] = useState("");

  // untuk ambil id token
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        setuserid(result.data.user_detail.user_id);
        setAddClicked(!addClicked);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${userid}/invoicehead`)
      .then((res) => {
        console.log("DATA INVOICE HED", res.data[0]);
        return setinvoiceHead(res.data[0]);
      });
  }, [addClicked]);

  const onFileChange = (event) => {
    sethaveFile(true);
    setselectedFile(event.target.files[0]);
    console.log("SELECTED FILE : ", selectedFile);
    //tutorial upload foto:
  };

  const onSubmit = (data) => {};
  console.log("SELECTED FILE2 : ", selectedFile);

  const kirimPhotoKeBackend = () => {
    console.log("selected file from axios : ", selectedFile);
    axios
      .post(`http://localhost:3001/users/verify`, selectedFile)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />;
    }
  };

  return (
    <LayoutTwo>
      {renderRedirect()}
      <BreadcrumbOne
        pageTitle='Verification'
        backgroundImage='/assets/images/backgrounds/breadcrumb-bg-1.png'
      >
        <ul className='breadcrumb__list'>
          <li>
            <Link tp='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>Verification</li>
        </ul>
      </BreadcrumbOne>
      {/* =================THEME LEZADA  */}
      <div
        style={{
          width: "100vw",
          display: "flex",
          // backgroundColor: "floralwhite ",
          justifyContent: "center",
          alignItems: "center",
          padding: "120px 0px 0px",
        }}
      >
        <div
          style={{
            width: "40%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginBottom: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <h1 style={{ fontWeight: "bold" }}>Verify Your Purchase</h1>
            <p>Please transfer before: {invoiceHead.expired_time} </p>
          </div>
          <div className='col-12 space-mb--50'>
            <div className='checkout-cart-total'>
              <h4>{invoiceHead.invoice_code}</h4>
              <ul>
                <li>
                  Payment Method
                  <span>ATM Bank Transfer</span>
                </li>
                <li>
                  Total Payment
                  <span>Rp. {invoiceHead.grand_total}</span>
                </li>
              </ul>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "24px",
                }}
              >
                <span>Please upload your receipt</span>
              </div>

              <div
                className='lezada-form coupon-form'
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "24px",
                }}
              >
                {/* ================================================= FORM FORM FORM FORM FORM ================================== */}
                {/* ================================================= FORM FORM FORM FORM FORM ================================== */}
                {/* ================================================= FORM FORM FORM FORM FORM ================================== */}
                {/* ================================================= FORM FORM FORM FORM FORM ================================== */}
                {/* ================================================= FORM FORM FORM FORM FORM ================================== */}
                {/* ================================================= FORM FORM FORM FORM FORM ================================== */}
                <Row>
                  <form
                    action=''
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      if (haveFile) {
                        verificationSent();
                        kirimPhotoKeBackend();
                      }
                    }}
                  >
                    <div className='upload-box'>
                      <input
                        type='file'
                        name='imageVerification'
                        id='imageVerification'
                        accept='image/*'
                        onChange={(event) => onFileChange(event)}
                        required
                      />
                    </div>
                    <button
                      type='submit'
                      className='lezada-button lezada-button--medium'
                      data-toggle='modal'
                      data-target='#exampleModalCenter'
                    >
                      Submit Verification Picture
                    </button>
                  </form>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================BOOTSTRAP MODAL  */}
      <div>
        {/* Modal */}
        {isSent ? (
          <div>
            <div
              className='modal-dialog modal-dialog-centered '
              role='document'
            >
              <div className='modal-content'>
                <div className='modal-header d-flex justify-content-center'>
                  <h5 className='modal-title' id='exampleModalLongTitle'>
                    Thank you for your purchase!
                  </h5>
                </div>
                <div className='modal-body'>
                  Your payment verification has been submitted. Please wait for
                  it to be reviewed.
                </div>
                <div className='modal-footer d-flex justify-content-center'>
                  <div className='d-flex flex-column'>
                    <Link to='/user/invoice'>
                      <button
                        type='button'
                        className='lezada-button lezada-button--small'
                        style={{ marginBottom: "8px", width: "300px" }}
                      >
                        View invoice
                      </button>
                    </Link>
                    <Link to='/'>
                      <button
                        type='button'
                        className='lezada-button lezada-button--small'
                        style={{ marginBottom: "8px", width: "300px" }}
                        // onClick={() => setredirect(true)}
                      >
                        Continue Shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p> </p>
        )}
      </div>
    </LayoutTwo>
  );
}

export default PaymentVerification;

// button input onSubmit
{
  /* <input
  type='submit'
  value='Send for verification'
  onClick={(e) => {
    e.preventDefault();
    verificationSent();
  }}
/>; */
}

//original html

// <div>
// <p>Payment Verification</p>
// <form
//   action=''
//   onSubmit={(e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }}
// >
//   <label htmlFor=''>Please uploal your image</label>
//   <input
//     type='file'
//     name='imageVerification'
//     id='imageVerification'
//     accept='image/*'
//     required
//     onChange={() => verificationSent()}
//   />
//   <br />
//   <button type='submit'>Submit Verification Picture</button>
// </form>
// <p>--------------------------------------</p>
// {isSent ? (
//   <p>you have submitted your verification</p>
// ) : (
//   <p>you havent uploaded yet</p>
// )}
// </div>
