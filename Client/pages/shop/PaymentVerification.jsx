import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { Row } from "react-bootstrap";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import LayoutTwo from "../../components/shop/Layout/LayoutTwo";
import "../../assets/custom/shop/styles.css";
import { useToasts } from "react-toast-notifications";

function PaymentVerification() {
  //basics
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");
  const { addToast } = useToasts();

  //untuk upload files
  const [file, setfile] = useState(""); // untuk si filenya (object file {})
  const [fileName, setfileName] = useState("Choose file"); // untuk nampilin nama aja
  const [uploadedFile, setuploadedFile] = useState({}); //untuk didaptkan dari res dari axios

  //untuk refreshes, redirects, change states notifs etc
  const [redirect, setredirect] = useState(false);
  const [isSent, setisSent] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [haveFile, sethaveFile] = useState(false);

  //untuk data user
  const [userid, setuserid] = useState(null);
  const [invoiceHead, setinvoiceHead] = useState([]);

  // JS NUMBER FORMATTER
  const { JS_NumberFormat } = require("js-number-formatter");
  const numberFormatOptions = {
    op_AllowDecimal: false,
    op_DelimiterChar: ".",
  };

  // untuk ambil id token
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        setuserid(result.data.user_detail.user_id);
        setAddClicked(!addClicked);
      });
  }, []);

  // untuk dapat info invoiceHead, return :  invoice_code, grand total, expired_time
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${userid}/invoicehead`)
      .then((res) => {
        console.log("DATA INVOICE HEDxxxmmm", res.data[0]);
        return setinvoiceHead(res.data[0]);
      });
  }, [addClicked]);

  // untuk show "modal" notification kalau udah ke sent
  const verificationSent = () => {
    setTimeout(() => {
      setisSent(true);
    }, 1300);
  };

  // redirect
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/' />;
    }
  };

  // changes pada choose file
  const onChange = (e) => {
    setfile(e.target.files[0]);
    setfileName(e.target.files[0].name);
    sethaveFile(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (haveFile) {
      verificationSent();
    }
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:3001/users/verify", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("ini res dari axios then : ", res);
        setuploadedFile(res.data);
        console.log("uplaoded file: ", uploadedFile);
      })
      .catch((err) => {
        console.log("ini error axios : ", err);
      });

    axios
      .post(
        `http://localhost:3001/users/invoice/${userid}?invoice_head_id=${invoiceHead.invoice_head_id}`
      )
      .then((res) => {
        console.log("RES dari axios post invoide details: ", res);
      })
      .catch((err) => {
        console.log("ini error axios invoice detail: ", err);
      });

    axios
      .post(`http://localhost:3001/users/notification/${userid}`)
      .then((res) => {
        console.log("RES dari axios post notification: ", res);
      })
      .catch((err) => {
        console.log("ini error axios post notification: ", err);
      });

    const content = "Your order have been listed on Purchase History!";
    addToast(content, {
      appearance: "success",
      autoDismiss: true,
    });
  };

  console.log("invoicehead dari payment verification : ", invoiceHead);

  return (
    <LayoutTwo>
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
                    <Link
                      to={`/purchases/invoice/${invoiceHead.invoice_head_id}`}
                    >
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
          <div style={styles.component}>
            <div style={styles.mainContainer}>
              <div style={styles.verifyHead}>
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
                      <span>
                        Rp.{" "}
                        {JS_NumberFormat(
                          invoiceHead.grand_total,
                          numberFormatOptions
                        )}
                      </span>
                    </li>
                  </ul>
                  <div style={styles.uploadText}>
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
                    <Row>
                      <form action='' onSubmit={(e) => onSubmit(e)}>
                        <div className='upload-box'>
                          <input
                            type='file'
                            name='imageVerification'
                            id='imageVerification'
                            accept='image/*'
                            onChange={(e) => onChange(e)}
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
        )}
      </div>
    </LayoutTwo>
  );
}

//============================ STYLING STYLING STYLING STYLING =============================================
const styles = {
  component: {
    width: "100vw",
    display: "flex",
    // backgroundColor: "floralwhite ",
    justifyContent: "center",
    alignItems: "center",
    padding: "120px 0px 0px",
  },
  mainContainer: {
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  verifyHead: {
    marginBottom: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  uploadText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "24px",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "24px",
  },
  myModal: {
    display: "flex",
    width: "100vw",
    height: "100vh",
  },
};

export default PaymentVerification;

// from traversy tutorial
{
  /* <div>
<button onClick={() => onSubmit()}>CLICK</button>
<h1>Verify Your Purchase</h1>
<p>Please Pay before: </p>
<div>
  <p>invoice number :</p>
  <p>total payment : </p>
  <form action='' onSubmit={(e) => onSubmit(e)}>
    <div>
      <input
        type='file'
        id='verificationImage'
        onChange={(e) => onChange(e)}
      />
      <label htmlFor='verificationImage'>{fileName}</label>
    </div>
    <input type='submit' value='Submit Verification Picture' />
  </form>
  <p>uploaded file: {uploadedFile.fileName}</p>
</div>
</div> */
}
