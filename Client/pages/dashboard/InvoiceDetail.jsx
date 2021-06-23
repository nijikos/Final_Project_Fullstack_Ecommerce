// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import AdminLayoutOne from "../components/Layout/AdminLayoutOne";
// const dateFormat = require("dateformat");

// function InvoiceDetails() {
//   const [invoiceArray, setinvoiceArray] = useState([]);
//   const [invoiceData, setinvoiceData] = useState({});
//   const [warehouseLocation, setwarehouseLocation] = useState("");
//   let { invoice_id } = useParams();

//   console.log("INI ID DARI PRODCUT DETAIL USEPARAMS: ", invoice_id);

//   // JS NUMBER FORMATTER
//   const { JS_NumberFormat } = require("js-number-formatter");
//   const numberFormatOptions = {
//     op_AllowDecimal: false,
//     op_DelimiterChar: ".",
//   };

//   useEffect(() => {
//     // console.log("useparam's invoice id :", invoice_id);
//     // console.log("diaats axios");
//     axios
//       .get(`http://localhost:3001/users/invoice/detail/${invoice_id}`)
//       .then((res) => {
//         setinvoiceArray(res.data);
//         setinvoiceData(res.data[0]);
//         // console.log("apa aja ", res);
//       })
//       .catch((err) => console.log("error axios"));
//     axios.get(`http://localhost:3001/jarak/${invoice_id}`).then((res) => {
//       console.log("res jarak : ", res.data.result);
//       setwarehouseLocation(res.data.result);
//     });
//   }, []);

//   console.log("invoice array : ", invoiceArray);
//   console.log("invoice data : ", invoiceData);
//   return (
//     <AdminLayoutOne>
//       <div>
//         {/* <h1>this is id: {invoice_id}</h1> */}
//         {invoiceData ? (
//           <div className='invoice-box'>
//             <table>
//               <tbody>
//                 <tr className='top'>
//                   <td colSpan={2}>
//                     <table>
//                       <tbody>
//                         <tr>
//                           <td className='title'>
//                             <h1>fnichure</h1>
//                           </td>
//                           <td>
//                             User ID : {invoiceData.user_id}
//                             <br />
//                             {invoiceData.invoice_code}
//                             <br />
//                             Created:{" "}
//                             {dateFormat(invoiceData.created_time, "longDate")}
//                             <br />
//                             Due:{" "}
//                             {dateFormat(invoiceData.expired_time, "longDate")}
//                             <br />
//                             Status : {invoiceData.payment_status} (
//                             {dateFormat(invoiceData.paid_time, "longDate")})
//                             <br />
//                             Payment Method : {invoiceData.payment_method}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//                 <tr className='information'>
//                   <td colSpan={2}>
//                     <table>
//                       <tbody>
//                         <tr>
//                           <td>
//                             {invoiceData.first_name} {invoiceData.last_name}
//                             <br />
//                             {invoiceData.email}
//                             <br />
//                             {invoiceData.phone}
//                             <br />
//                             {invoiceData.address}
//                             <br />
//                             {invoiceData.city}
//                             <br />
//                             {invoiceData.postal_code}
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//                 <tr className='heading'>
//                   <td>Item</td>
//                   <td>Price</td>
//                 </tr>
//                 {invoiceArray.map((item, i) => {
//                   return (
//                     <tr className='item'>
//                       <td>{item.name}</td>
//                       <td>
//                         Rp. {JS_NumberFormat(item.price, numberFormatOptions)}
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 <tr className='item'>
//                   <td>Shipping (From: {warehouseLocation})</td>
//                   <td>
//                     Rp.{" "}
//                     {JS_NumberFormat(
//                       invoiceData.delivery_price,
//                       numberFormatOptions
//                     )}
//                   </td>
//                 </tr>
//                 <tr className='total'>
//                   <td />
//                   <td>
//                     Total: Rp.{" "}
//                     {JS_NumberFormat(
//                       invoiceData.grand_total,
//                       numberFormatOptions
//                     )}
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p>fetching data...</p>
//         )}
//       </div>
//     </AdminLayoutOne>
//   );
// }

// export default InvoiceDetails;
