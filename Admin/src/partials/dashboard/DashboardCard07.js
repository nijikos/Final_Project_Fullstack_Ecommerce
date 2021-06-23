import React from "react";

// import Image01 from "../../images/user-36-05.jpg";
// import Image02 from "../../images/user-36-06.jpg";
// import Image03 from "../../images/user-36-07.jpg";
// import Image04 from "../../images/user-36-08.jpg";
// import Image05 from "../../images/user-36-09.jpg";

function DashboardCard07() {
  const products = [
    {
      id: "0",
      no: "1",
      productName: "Meja",
      SKU: "12345",
      warehouseLocation: "Jakarta Timur",
      opStock: "500",
      userStock: "500",
      ofRequest: "1",
      inTransaction: "1",
    },
    {
      id: "0",
      no: "2",
      productName: "Kursi",
      SKU: "12345",
      warehouseLocation: "Jakarta Utara",
      opStock: "500",
      userStock: "500",
      ofRequest: "1",
      inTransaction: "1",
    },
    {
      id: "0",
      no: "3",
      productName: "Karpet",
      SKU: "12345",
      warehouseLocation: "Jakarta Selatan",
      opStock: "500",
      userStock: "500",
      ofRequest: "1",
      inTransaction: "1",
    },
    {
      id: "0",
      no: "4",
      productName: "Bantal",
      SKU: "12345",
      warehouseLocation: "Jakarta Barat",
      opStock: "500",
      userStock: "500",
      ofRequest: "1",
      inTransaction: "1",
    },
    {
      id: "0",
      no: "5",
      productName: "Kasur",
      SKU: "12345",
      warehouseLocation: "Jakarta Pusat",
      opStock: "500",
      userStock: "500",
      ofRequest: "1",
      inTransaction: "1",
    },
  ];

  return (
    <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200'>
      <header className='px-5 py-4 border-b border-gray-100'>
        <h2 className='font-semibold text-gray-800'>Product</h2>
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
                  <div className='font-semibold text-center'>Product Name</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>SKU</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>
                    Warehouse Location
                  </div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>Op. Stock</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>User Stock</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>Request</div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>
                    In Transaction
                  </div>
                </th>
                <th className='p-2 whitespace-nowrap'>
                  <div className='font-semibold text-center'>Action</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className='text-sm divide-y divide-gray-100'>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td className='p-2 whitespace-nowrap'>
                      <div className=' text-center font-medium text-gray-800'>
                        {product.no}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>{product.productName}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center font-medium text-green-500'>
                        {product.SKU}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>
                        {product.warehouseLocation}
                      </div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>{product.opStock}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>{product.userStock}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>{product.ofRequest}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>{product.inTransaction}</div>
                    </td>
                    <td className='p-2 whitespace-nowrap'>
                      <div className='text-center'>
                        <button class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>
                          Stock Detail
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
