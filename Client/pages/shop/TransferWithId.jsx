import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link, useParams } from "react-router-dom";
import LayoutTwo from "../../components/shop/Layout/LayoutTwo";
import { BreadcrumbOne } from "../../components/shop/Breadcrumb";
const dateFormat = require("dateformat");

function Transfer() {
  const cookies = new Cookies();
  const token = cookies.get("jwtToken");
  const { invoice_head_id } = useParams();
  const [value, setvalue] = useState("8549-6461-2541-0000");
  const [copied, setcopied] = useState(false);
  const [userid, setuserid] = useState(null);
  const [addClicked, setAddClicked] = useState(false);
  //data tampilan
  const [invoiceHead, setinvoiceHead] = useState([]);
  const [warehouseLocation, setwarehouseLocation] = useState("");

  // untuk ambil id token
  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/token/decode/${token}`)
      .then((result) => {
        console.log("result token Transfr page: ", result);
        setuserid(result.data.user_detail.user_id);
        setAddClicked(!addClicked);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:3001/users/${userid}/invoiceheadbyid?invoice_head_id=${invoice_head_id}`
      )
      .then((res) => {
        console.log("DATA INVOICE HED MAMAMA", res.data[0]);
        setinvoiceHead(res.data[0]);
      });
  }, [addClicked]);

  // JS NUMBER FORMATTER
  const { JS_NumberFormat } = require("js-number-formatter");
  const numberFormatOptions = {
    op_AllowDecimal: false,
    op_DelimiterChar: ".",
  };

  console.log("HEEEDD ", invoiceHead);

  return (
    <LayoutTwo>
      <BreadcrumbOne
        pageTitle='Payment'
        backgroundImage='/assets/images/backgrounds/breadcrumb-bg-1.png'
      >
        <ul className='breadcrumb__list'>
          <li>
            <Link tp='/'>
              <a>Home</a>
            </Link>
          </li>
          <li>Payment</li>
        </ul>
      </BreadcrumbOne>
      {invoiceHead ? (
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
                <h1 style={{ fontWeight: "bold" }}>Payment Instructions</h1>
                <p>
                  Please transfer before: {dateFormat(invoiceHead.expired_time)}{" "}
                </p>
              </div>
              <div className='col-12 space-mb--50'>
                <div className='checkout-cart-total'>
                  <h4>
                    {invoiceHead.invoice_code}
                    {/* <span>Bank Transfer</span> */}
                  </h4>
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "24px",
                    }}
                  >
                    <span style={{ fontWeight: "bold" }}>
                      Pengisian Saldo Via ATM
                    </span>
                  </div>
                  <ul>
                    <li>1. Masukkan kartu ATM dan PIN kamu.</li>
                    <li>
                      2. Masuk ke menu TRANSFER dan klik transfer ke bank dalam
                      negri.
                    </li>
                    <li>
                      3. Masukkan nomor rekening yang tertera dibawah, atau bisa
                      langsung di-copy, atas nama PT FNICHURE INDONESIA
                      SEJAHTERA
                    </li>
                    <li>
                      4. Masukkan jumlah yang ingin di transfer, sesuai total
                      invoice
                    </li>
                    <li>
                      5. Ikuti petunjuk selanjutnya untuk menyelesaikan proses
                      transfer bank
                    </li>
                  </ul>
                  <div
                    className='lezada-form coupon-form'
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "24px",
                    }}
                  >
                    <form>
                      <Row>
                        <Col md={7}>
                          <input
                            type='text'
                            value='8549-6461-2541-0000'
                            readonly='readonly'
                            style={{
                              backgroundColor: "white",
                              padding: "14px 24px",
                              width: "200px",
                            }}
                          />
                        </Col>
                        <Col md={5}>
                          <CopyToClipboard
                            text={value}
                            onCopy={() => setcopied(true)}
                          >
                            <button className='lezada-button lezada-button--medium'>
                              copy
                            </button>
                          </CopyToClipboard>
                        </Col>
                      </Row>
                    </form>
                  </div>
                  <p> </p>
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
                    <Link to='/cart/verify'>
                      <button className='lezada-button lezada-button--medium'>
                        Confirm Payment
                      </button>
                    </Link>
                    <Link to='/'>
                      <button className='lezada-button lezada-button--medium'>
                        Continue shopping
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              {copied ? <span>Copied.</span> : null}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </LayoutTwo>
  );
}

export default Transfer;

// original
{
  /* <div>
  <h1>Transfer Now</h1>
  
  <p>Please transfer before: {invoiceHead.expired_time} </p>
  <p>Amount:</p>
  <p>{invoiceHead.grand_total}</p>

  <p>---------------------------</p>
  <div>
    <p>BANK BCA</p>
    <p>PT Rich Ladies</p>
    <input value='133453531354' />
    <CopyToClipboard text={value} onCopy={() => setcopied(true)}>
      <button>Copy to clipboard</button>
    </CopyToClipboard>
    {copied ? <span style={{ color: "red" }}>Copied.</span> : null}
  </div>

  <p>---------------------------</p>
  <Link to='/cart/verify'>
    <button>Confirm Payment</button>
  </Link>
</div>; */
}
