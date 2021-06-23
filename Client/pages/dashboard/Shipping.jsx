// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { useParams, useHistory } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";
// import AdminLayoutOne from "../components/Layout/AdminLayoutOne";

// function Shipping() {
//   const history = useHistory();
//   const { addToast } = useToasts();
//   let { invoice_id } = useParams();
//   const [shippingData, setshippingData] = useState([]);
//   const [shippingDataGrouped, setshippingDataGrouped] = useState([]);
//   const [invoiceCode, setinvoiceCode] = useState("");
//   const [nearestWarehouse, setnearestWarehouse] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/admin/transaction/shipping/${invoice_id}`)
//       .then((res) => {
//         setshippingData(res.data);
//         setinvoiceCode(res.data[0].invoice_code);
//         if (res.data[0].warehouse_id === 1) {
//           setnearestWarehouse("Kelapa Gading, Jakarta Utara");
//         } else if (res.data[0].warehouse_id === 2) {
//           setnearestWarehouse("Kemayoran, Jakarta Pusat");
//         } else if (res.data[0].warehouse_id === 3) {
//           setnearestWarehouse("Palmerah, Jakarta Barat");
//         } else if (res.data[0].warehouse_id === 4) {
//           setnearestWarehouse("Cakung, Jakarta Timur");
//         } else if (res.data[0].warehouse_id === 5) {
//           setnearestWarehouse("Pasar Minggu, Jakarta Selatan");
//         }
//       });
//   }, []);

//   useEffect(() => {
//     axios
//       .get(
//         `http://localhost:3001/admin/transaction/shipping/grouped/${invoice_id}`
//       )
//       .then((res) => {
//         setshippingDataGrouped(res.data);
//       });
//   }, []);

//   const handleRequest = (
//     invoice_head_id,
//     invoice_code,
//     location,
//     product_id,
//     quantity
//   ) => {
//     let data = {
//       invoice_head_id: invoice_head_id,
//       invoice_code: invoice_code,
//       location: location,
//       product_id: product_id,
//       quantity: quantity,
//     };

//     axios
//       .post(`http://localhost:3001/admin/transaction/stock/request`, data)
//       .then((res) => console.log(res));

//     const content = "Item Requested!";
//     addToast(content, {
//       appearance: "success",
//       autoDismiss: true,
//     });
//   };

//   console.log("GROUPED : ", shippingDataGrouped);
//   const sendProducts = (senddata) => {
//     Swal.fire({
//       title: "Ship this order to the customer?",
//       showDenyButton: false,
//       showCancelButton: true,
//       confirmButtonText: `Ship`,
//     }).then((result) => {
//       /* Read more about isConfirmed, isDenied below */
//       if (result.isConfirmed) {
//         Swal.fire("Shipping is processed!", "", "success");
//         for (let i = 0; i < senddata.length; i++) {
//           axios
//             .patch(
//               `http://localhost:3001/admin/transaction/stock/subtract?warehouse_id=${senddata[i].warehouse_id}&product_id=${senddata[i].product_id}&quantity=${senddata[i].quantity}&invoice_id=${senddata[i].id}`
//             )
//             .then((res) => {
//               console.log(res);
//               setTimeout(() => history.push("/transactions"), 3000);
//             });
//         }
//       }
//     });

//     // const content = "Shipping Request Sent!";
//     // addToast(content, {
//     //   appearance: "success",
//     //   autoDismiss: true,
//     // });
//     // setTimeout(() => history.push("/transactions"), 2000);
//   };

//   console.log("shippingData : ", shippingData);
//   console.log("shippingData GROUPED : ", shippingDataGrouped);
//   return (
//     <AdminLayoutOne>
//       {/* REVIEW PRODUCTS UNTUK DI SHIPPING   */}
//       <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200 mb-8'>
//         <header className='px-5 py-4 border-b border-gray-100'>
//           <h2 className='font-semibold text-gray-800'>Review Shipping</h2>
//         </header>
//         <div className='p-3'>
//           <div className='overflow-x-auto'>
//             <table className='table-auto w-full'>
//               <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
//                 <tr>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>No</div>
//                   </th>

//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>
//                       Product Name
//                     </div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>SKU</div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Quantity</div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Warehouse</div>
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className='text-sm divide-y divide-gray-100'>
//                 {shippingDataGrouped.map((item, i) => {
//                   return (
//                     <tr key={i}>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className=' text-center font-medium text-gray-800'>
//                           {i + 1}
//                         </div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center font-medium text-green-500'>
//                           {item.product_name}
//                         </div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>{item.sku}</div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>{item.quantity}</div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>{nearestWarehouse}</div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//             <div
//               style={{
//                 margin: "30px 0px 0px 16px",
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <button
//                 className='bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'
//                 onClick={() => sendProducts(shippingDataGrouped)}
//               >
//                 SEND
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CHECK ADA STOCK ATAU ENGGA  */}
//       <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200'>
//         <header className='px-5 py-4 border-b border-gray-100'>
//           <h2 className='font-semibold text-gray-800'>
//             Stock Check for Shipping
//           </h2>
//         </header>
//         <div className='p-3'>
//           <div className='overflow-x-auto'>
//             <table className='table-auto w-full'>
//               <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
//                 <tr>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>
//                       Product Name
//                     </div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>SKU</div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Quantity</div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Nearest</div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Warehouse</div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Stock</div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Status</div>
//                   </th>
//                 </tr>
//               </thead>

//               <tbody className='text-sm divide-y divide-gray-100'>
//                 {shippingData.map((item, i) => {
//                   return (
//                     <tr
//                       key={i}
//                       className={
//                         `${item.warehouse_name}, ${item.location}` ===
//                         nearestWarehouse
//                           ? `selectedRowStyling`
//                           : ``
//                       }
//                     >
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center font-medium text-green-500'>
//                           {/* {truncate(item.product_name, 20)} */}
//                           {item.product_name}
//                         </div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>{item.sku}</div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>{item.quantity}</div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>
//                           {item.warehouse_name}, {item.location}
//                         </div>
//                       </td>

//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>
//                           {" "}
//                           {item.warehouse_name}, {item.location}
//                         </div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>{item.stock}</div>
//                       </td>
//                       <td className='p-2 whitespace-nowrap'>
//                         <div className='text-center'>
//                           {`${item.warehouse_name}, ${item.location}` ===
//                             nearestWarehouse && item.quantity < item.stock
//                             ? "in stock"
//                             : " "}
//                           {`${item.warehouse_name}, ${item.location}` ===
//                             nearestWarehouse && item.quantity > item.stock ? (
//                             <button
//                               className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
//                               onClick={() =>
//                                 handleRequest(
//                                   item.id,
//                                   item.invoice_code,
//                                   item.location,
//                                   item.product_id,
//                                   item.quantity - item.stock
//                                 )
//                               }
//                             >
//                               Request
//                             </button>
//                           ) : (
//                             " "
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </AdminLayoutOne>
//   );
// }

// export default Shipping;
