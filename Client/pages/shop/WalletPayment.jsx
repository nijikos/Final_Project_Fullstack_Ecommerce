import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
import LayoutTwo from "../../components/shop/Layout/LayoutTwo";
import { useToasts } from "react-toast-notifications";
import "../../assets/custom/shop/styles.css";

function WalletPayment() {
  //basic needs
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");
  const { invoice_head_id } = useParams();
  const { addToast } = useToasts();

  //dari token
  const [user_detail, setuser_detail] = useState({});
  const [userDetail, setuserDetail] = useState({}); // from axios (new data)

  // from axios
  const [invoiceHead, setinvoiceHead] = useState([]);
  const [userid, setuserid] = useState(null);
  const [addClicked, setAddClicked] = useState(false);
  const [walletCredit, setwalletCredit] = useState(0);
  const [paymentTotal, setpaymentTotal] = useState(0);
  const [warehouseLocation, setwarehouseLocation] = useState("");

  // refresher
  const [isPaid, setisPaid] = useState(false); // untuk nampilin thanks for buying

  // untuk ambil id token
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        setuser_detail(result.data.user_detail);
        setuserid(result.data.user_detail.user_id);
        setAddClicked(!addClicked);
      });
  }, []);

  useEffect(() => {
    if (userid) {
      axios
        .get(`http://localhost:3001/users/${userid}/invoicehead`)
        .then((res) => {
          axios
            .get(`http://localhost:3001/users/detail/account/${userid}`)
            .then((res) => {
              setuserDetail(res.data[0]);
              setwalletCredit(res.data[0].wallet);
            });
          console.log("DATA INVOICE HEDxxxxqqq", res.data[0]);
          setinvoiceHead(res.data[0]);
          setpaymentTotal(res.data[0].grand_total);
        });
    }
  }, [addClicked]);

  console.log("dari wallet params ", invoice_head_id);
  console.log("invoicehead now ", invoiceHead);
  // JS NUMBER FORMATTER
  const { JS_NumberFormat } = require("js-number-formatter");
  const numberFormatOptions = {
    op_AllowDecimal: false,
    op_DelimiterChar: ".",
  };

  const payment = (walletCredit, paymentTotal) => {
    let data = {
      walletCredit: walletCredit,
      paymentTotal: paymentTotal,
    };
    axios
      .patch(
        `http://localhost:3001/users/walletpay/${userid}?invoice_head_id=${invoiceHead.invoice_head_id}`,
        data
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios
      .post(`http://localhost:3001/users/notification/${userid}`)
      .then((res) => {
        console.log("RES dari axios post notification: ", res);
      })
      .catch((err) => {
        console.log("ini error axios post notification: ", err);
      });

    setisPaid(true);
    const content = "Your order have been listed on Purchase History!";
    addToast(content, {
      appearance: "success",
      autoDismiss: true,
    });
  };

  console.log("invoicehead dari wallet biasa : ", invoiceHead);
  console.log("WALLET USERS DETAIL : ", userDetail);
  console.log("WALLET CREDDIT : ", walletCredit);
  return (
    <LayoutTwo>
      <BreadcrumbOne
        pageTitle='Wallet Payment'
        backgroundImage='/assets/images/backgrounds/breadcrumb-bg-1.png'
      >
        <ul className='breadcrumb__list'>
          <li>
            <Link tp='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>Wallet Payment</li>
        </ul>
      </BreadcrumbOne>
      {isPaid ? (
        <div>
          <div className='modal-dialog modal-dialog-centered ' role='document'>
            <div className='modal-content'>
              <div className='modal-header d-flex justify-content-center'>
                <h5 className='modal-title' id='exampleModalLongTitle'>
                  Thank you for your purchase!
                </h5>
              </div>
              <div className='modal-body'>
                Your payment verification has been submitted. Please wait for it
                to be reviewed.
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
        <div>
          {/* WITH LEXADA TEMPLATE=======================  */}
          <div
            style={{
              width: "100vw",
              display: "flex",
              // backgroundColor: "floralwhite ",
              justifyContent: "center",
              alignItems: "center",
              padding: "120px",
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
                <h1 style={{ fontWeight: "bold" }}>Wallet Payment</h1>
                <p>Please transfer before: {invoiceHead.expired_time} </p>
              </div>
              <div className='col-12 space-mb--50'>
                <div className='checkout-cart-total'>
                  <h4>{invoiceHead.invoice_code}</h4>
                  <ul>
                    <li>
                      Payment Method
                      <span>Wallet Credit</span>
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
                    {userDetail ? (
                      <li>
                        Wallet Credit
                        <span>
                          Rp.{" "}
                          {JS_NumberFormat(
                            userDetail.wallet,
                            numberFormatOptions
                          )}{" "}
                        </span>
                      </li>
                    ) : (
                      <li>fetching data ...</li>
                    )}

                    <li>
                      Wallet Remainder
                      <span>
                        Rp.{" "}
                        {JS_NumberFormat(
                          userDetail.wallet - invoiceHead.grand_total,
                          numberFormatOptions
                        )}{" "}
                      </span>
                    </li>
                  </ul>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "24px",
                      margin: "24px",
                    }}
                  >
                    <button
                      className='lezada-button lezada-button--medium'
                      onClick={() => payment(walletCredit, paymentTotal)}
                    >
                      Confirm Payment
                    </button>

                    <Link to='/'>
                      <button className='lezada-button lezada-button--medium'>
                        Continue shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LayoutTwo>
  );
}

export default WalletPayment;
