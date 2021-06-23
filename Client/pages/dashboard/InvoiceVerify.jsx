// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useHistory } from "react-router-dom";
// import AdminLayoutOne from "../components/Layout/AdminLayoutOne";
// import Swal from "sweetalert2";
// const dateFormat = require("dateformat");

// function InvoiceVerify() {
//   const history = useHistory();
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

//   const verifyPopUp = () => {
//     Swal.fire({
//       title: "Do you want to verify this transaction?",
//       showDenyButton: false,
//       showCancelButton: true,
//       confirmButtonText: `Verify`,
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {
//         Swal.fire("Verified!", "", "success");
//         axios
//           .patch(
//             `http://localhost:3001/admin/transaction/verify-invoice?type=verify&invoice_id=${invoice_id}`
//           )
//           .then((res) => {
//             console.log(res);
//             setTimeout(() => history.push("/transactions"), 3000);
//           });
//       }
//     });
//   };

//   const rejectPopUp = () => {
//     Swal.fire({
//       title: "Are you sure you want to reject this transaction?",
//       showDenyButton: false,
//       showCancelButton: true,
//       confirmButtonText: `Reject`,
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {
//         Swal.fire("Rejected!", "", "success");
//         axios
//           .patch(
//             `http://localhost:3001/admin/transaction/verify-invoice?type=reject&invoice_id=${invoice_id}`
//           )
//           .then((res) => {
//             console.log(res);
//             setTimeout(() => history.push("/transactions"), 3000);
//           });
//       }
//     });
//   };

//   // ambil data
//   useEffect(() => {
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
//                             <h1>Verify Purchase</h1>
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
//                           <td>
//                             Verification Status : {invoiceData.verified_status}
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
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 gap: "24px",
//               }}
//               className='mt-8 mb-2'
//             >
//               <button
//                 className='bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//                 onClick={() => rejectPopUp()}
//               >
//                 Reject
//               </button>
//               <button
//                 className='bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
//                 onClick={() => verifyPopUp()}
//               >
//                 Verify
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p>fetching data...</p>
//         )}
//       </div>
//     </AdminLayoutOne>
//   );
// }

// export default InvoiceVerify;

// // untuk reject dan verify yang tidak jadi dipakai. pakai toast
// // reject and verify
// // const verifyPurchase = () => {
// //   axios
// //     .patch(
// //       `http://localhost:3001/admin/transaction/verify-invoice?type=verify&invoice_id=${invoice_id}`
// //     )
// //     .then((res) => {
// //       console.log(res);
// //     });

// //   const content = "Transaction has be verified!";
// //   addToast(content, {
// //     appearance: "success",
// //     autoDismiss: true,
// //   });

// //   setTimeout(() => history.push("/transactions"), 2000);
// // };
// // const rejectPurchase = () => {
// //   axios
// //     .patch(
// //       `http://localhost:3001/admin/transaction/verify-invoice?type=reject&invoice_id=${invoice_id}`
// //     )
// //     .then((res) => {
// //       console.log(res);
// //     });
// //   const content = "Transaction has be rejected!";
// //   addToast(content, {
// //     appearance: "error",
// //     autoDismiss: true,
// //   });
// //   setTimeout(() => history.push("/transactions"), 3000);
// // };
