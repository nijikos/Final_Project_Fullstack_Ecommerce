import React, { useState, useEffect } from "react";
import AdminLayoutOne from "../components/Layout/AdminLayoutOne";
import SalesReportCard from "../components/Layout/SalesReportCard";
import axios from "axios";

function SalesReport() {
  const [topSales, settopSales] = useState([]);
  const [totalSales, settotalSales] = useState("");
  const [totalRevenue, settotalRevenue] = useState("");
  const [totalCost, settotalCost] = useState("");
  const [totalProfit, settotalProfit] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:3001/admin/report`).then((res) => {
      settopSales(res.data.topSales);
      settotalSales(res.data.totalSales);
      settotalRevenue(res.data.totalRevenue);
      settotalCost(res.data.totalCost);
      settotalProfit(res.data.totalProfit);
    });
  }, []);

  console.log("topsales : ", topSales);
  return (
    <AdminLayoutOne>
      <div className='grid grid-cols-12 gap-6 mb-10'>
        <SalesReportCard
          imgurl='https://img.icons8.com/cotton/64/000000/sales-performance--v5.png'
          label='Total Sales'
          data={totalSales}
        />
        <SalesReportCard
          imgurl='https://img.icons8.com/cotton/64/000000/sales-performance--v5.png'
          label='Total Revenue'
          data={"Rp. " + totalRevenue}
        />
        <SalesReportCard
          imgurl='https://img.icons8.com/cotton/64/000000/sales-performance--v5.png'
          label='Total Profit'
          data={"Rp. " + totalProfit}
        />
        <SalesReportCard
          imgurl='https://img.icons8.com/cotton/64/000000/sales-performance--v5.png'
          label='Total Cost'
          data={"Rp. " + totalCost}
        />
      </div>
      <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200'>
        <header className='px-5 py-4 border-b border-gray-100'>
          <h2 className='font-semibold text-gray-800'>Top Sold Products</h2>
        </header>
        <div className='p-3'>
          <div className='overflow-x-auto'>
            <table className='table-auto w-full'>
              <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                <tr>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-left'>No</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Product Name</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-left'>Total Sales</div>
                  </th>
                </tr>
              </thead>

              <tbody className='text-sm divide-y divide-gray-100'>
                {topSales.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td className='p-2 whitespace-nowrap'>
                        <div className=' text-left font-medium text-gray-800'>
                          {i + 1}
                        </div>
                      </td>
                      <td className='p-2 whitespace-nowrap'>
                        <div className='text-left'>{item.name}</div>
                      </td>
                      <td className='p-2 whitespace-nowrap'>
                        <div className='text-left'>{item.sold}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayoutOne>
  );
}

export default SalesReport;
