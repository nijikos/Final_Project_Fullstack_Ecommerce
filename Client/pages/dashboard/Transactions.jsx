// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import AdminLayoutOne from "../components/Layout/AdminLayoutOne";

// function Dashboard() {
//   const dateFormat = require("dateformat");
//   const [searchInput, setsearchInput] = useState("");
//   const [transactionData, settransactionData] = useState([]);
//   useEffect(() => {
//     axios.get(`http://localhost:3001/admin/transaction`).then((res) => {
//       settransactionData(res.data);
//     });
//   }, []);
//   const submitSearch = (e) => {
//     e.preventDefault();
//     axios
//       .get(
//         `http://localhost:3001/admin/transaction/search-transaction-invoice-id?search=${searchInput}`
//       )
//       .then((res) => {
//         settransactionData(res.data);
//         setsearchInput("");
//       });
//   };

//   const handleAsc = () => {
//     axios.get(`http://localhost:3001/admin/transaction/asc`).then((res) => {
//       settransactionData(res.data);
//     });
//   };
//   const handleDesc = () => {
//     axios.get(`http://localhost:3001/admin/transaction/desc`).then((res) => {
//       settransactionData(res.data);
//     });
//   };

//   // untuk pagination
//   const [currentPage, setcurrentPage] = useState(1);
//   const [itemsPerPage, setitemsPerPage] = useState(8);

//   const [pageNumberLimit, setpageNumberLimit] = useState(3);
//   const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
//   const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
//   const handleClick = (e) => {
//     setcurrentPage(Number(e.target.id));
//   };

//   const pages = [];
//   for (let i = 1; i <= Math.ceil(transactionData.length / itemsPerPage); i++) {
//     pages.push(i);
//   }

//   const renderPageNumbers = pages.map((number) => {
//     if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
//       return (
//         <li
//           key={number}
//           id={number}
//           onClick={handleClick}
//           // className={currentPage == number ? "active" : null}
//           className='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
//         >
//           {number}
//         </li>
//       );
//     } else {
//       return null;
//     }
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = transactionData.slice(indexOfFirstItem, indexOfLastItem);

//   const handlePrev = () => {
//     setcurrentPage(currentPage - 1);
//     if ((currentPage - 1) % pageNumberLimit == 0) {
//       setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
//       setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
//     }
//   };

//   const handleNext = () => {
//     setcurrentPage(currentPage + 1);

//     if (currentPage + 1 > maxPageNumberLimit) {
//       setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
//       setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
//     }
//   };

//   let pageIncrementBtn = null;
//   if (pages.length > maxPageNumberLimit) {
//     pageIncrementBtn = <li> &hellip; </li>;
//   }

//   let pageDecrementBtn = null;
//   if ((pages.length = minPageNumberLimit)) {
//     pageDecrementBtn = <li> &hellip; </li>;
//   }

//   const renderData = (transactionData) => {
//     return (
//       <>
//         {transactionData.map((item, i) => {
//           return (
//             <tr key={i}>
//               <td className='p-2 whitespace-nowrap'>
//                 <div className=' text-center font-medium text-gray-800'>
//                   {i + 1}
//                 </div>
//               </td>
//               <td className='p-2 whitespace-nowrap'>
//                 <div className='text-center'>{item.invoice_code}</div>
//               </td>
//               <td className='p-2 whitespace-nowrap'>
//                 <div className='text-center font-medium text-green-500'>
//                   {dateFormat(item.paid_time, "longDate")}
//                   {/* {item.created_time.substring(0, 10)} */}
//                   {/* {item.paid_time.slice(0, 10)} */}
//                 </div>
//               </td>
//               <td className='p-2 whitespace-nowrap'>
//                 <div className='text-center'>{item.shipping_status}</div>
//               </td>
//               <td className='p-2 whitespace-nowrap'>
//                 <div className='text-center'>
//                   <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4'>
//                     <Link to={`/invoice/${item.id}`}>View Invoice</Link>
//                   </button>
//                   {item.shipping_status === "sent" ? (
//                     <button className='bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'>
//                       Shipped
//                     </button>
//                   ) : (
//                     <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
//                       <Link to={`/shipping/${item.id}`}>Ship</Link>
//                     </button>
//                   )}
//                 </div>
//               </td>
//             </tr>
//           );
//         })}
//       </>
//     );
//   };

//   console.log("this is transactionData : ", transactionData);
//   return (
//     <AdminLayoutOne>
//       {/* search and sort start */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//         }}
//       >
//         <div
//           style={{ display: "flex", flexDirection: "row", gap: "24px" }}
//           className='mb-4'
//         >
//           <form
//             action=''
//             onSubmit={(e) => {
//               submitSearch(e);
//             }}
//           >
//             <input
//               style={{ width: "300px", borderColor: "#E2E8F0" }}
//               type='text'
//               name='search'
//               id='search'
//               placeholder='search invoice code'
//               value={searchInput}
//               onChange={(e) => setsearchInput(e.target.value)}
//             />
//             <input
//               className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
//               type='submit'
//               value='search'
//             />
//           </form>
//         </div>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "flex-end",
//             alignItems: "center",
//             gap: "24px",
//           }}
//         >
//           <p>sort by</p>
//           <button onClick={() => handleAsc()}>date ↑</button>
//           <button onClick={() => handleDesc()}>date ↓</button>
//         </div>
//       </div>
//       {/* search and sort end  */}

//       <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200'>
//         <header className='px-5 py-4 border-b border-gray-100'>
//           <h2 className='font-semibold text-gray-800'>Transactions</h2>
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
//                       Invoice Code
//                     </div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>
//                       Created Date
//                     </div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Status</div>
//                   </th>
//                   <th className='p-2 whitespace-nowrap'>
//                     <div className='font-semibold text-center'>Action</div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className='text-sm divide-y divide-gray-100'>
//                 {renderData(currentItems)}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       {/* page number buttons  */}
//       <div>
//         <ul className='flex-1 flex justify-start my-4 items-center'>
//           <li>
//             <button
//               className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
//               onClick={handlePrev}
//               disabled={currentPage == pages[0] ? true : false}
//             >{`<<`}</button>
//           </li>
//           {pageDecrementBtn}
//           {/* {renderPageNumbers} */}
//           {pageIncrementBtn}
//           <li>
//             <button
//               className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-5'
//               onClick={handleNext}
//               disabled={currentPage == pages[pages.length - 1] ? true : false}
//             >{`>>`}</button>
//           </li>
//         </ul>
//       </div>
//       {/* page number buttons  */}
//     </AdminLayoutOne>
//   );
// }

// export default Dashboard;
