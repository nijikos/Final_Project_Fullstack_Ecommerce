import React from "react";

// import Image01 from "../../images/user-36-05.jpg";
// import Image02 from "../../images/user-36-06.jpg";
// import Image03 from "../../images/user-36-07.jpg";
// import Image04 from "../../images/user-36-08.jpg";
// import Image05 from "../../images/user-36-09.jpg";

function DashboardCard07() {
  const transactions = [
    {
      id: "0",
      no: "1",
      invoiceCode: "12345",
      approvedDate: "10/10/2020",
      warehouseLocation: "Jakarta Utara",
      status: "ship",
    },
    {
      id: "1",
      no: "2",
      invoiceCode: "12345",
      approvedDate: "11/11/2020",
      warehouseLocation: "Jakarta Timur",
      status: "not yet ship",
    },
    {
      id: "2",
      no: "3",
      invoiceCode: "12345",
      approvedDate: "12/12/2020",
      warehouseLocation: "Jakarta Selatan",
      status: "not yet ship",
    },
    {
      id: "3",
      no: "4",
      invoiceCode: "12345",
      approvedDate: "01/01/2021",
      warehouseLocation: "Jakarta Pusat",
      status: "ship",
    },
    {
      id: "4",
      no: "5",
      invoiceCode: "12345",
      approvedDate: "02/02/2021",
      warehouseLocation: "Jakarta Barat",
      status: "ship",
    },
  ];

  return (
    <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200'>
      <header className='px-5 py-4 border-b border-gray-100'>
        <h2 className='font-semibold text-gray-800'>Transactions</h2>
      </header>
      <div className='p-3'>
        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='table-auto w-full'>
            {/* Table header */}
            <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
              <tr>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>No</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>Invoice Code</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>Approved Date</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>
                    Warehouse Location
                  </div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>Status</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'></div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'></div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='text-sm divide-y divide-gray-100'>
              {transactions.map((transactions) => {
                return (
                  <tr key={transactions.id}>
                    <td className='p-2 whitespace-nowrap'>
                      <div className=' text-center font-medium text-gray-800'>
                        {transactions.no}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>
                        {transactions.invoiceCode}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center font-medium text-green-500'>
                        {transactions.approvedDate}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>
                        {transactions.warehouseLocation}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>{transactions.status}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>
                        <button class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                          View Invoice
                        </button>
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>
                        <button class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                          Ship
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
