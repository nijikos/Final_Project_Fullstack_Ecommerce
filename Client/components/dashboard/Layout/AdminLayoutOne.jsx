// import React, { useState, useEffect } from "react";
// import Header from "../../../elements/dashboard/navigation/Header";
// import Sidebar from "../../../elements/dashboard/navigation/Sidebar";
// import axios from "axios";
// import "../../../assets/css/style.scss";

// function AdminLayoutOne({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [dashboardData, setdashboardData] = useState({});
//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/admin/dashboard`)
//       .then((res) => setdashboardData(res.data[0]));
//   }, []);
//   return (
//     <div className='flex h-screen overflow-hidden'>
//       <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
//         <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//         <main>
//           <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
//             {/* <WelcomeBanner /> */}

//             <div className='sm:flex sm:justify-between sm:items-center mb-8'>
//               <div className='grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2'></div>
//             </div>
//             {children}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminLayoutOne;
