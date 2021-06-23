import React from "react";

function SalesReportCard({ imgurl, label, data }) {
  return (
    <div className='flex flex-col col-span-full sm:col-span-3 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200'>
      <div className='px-5 pt-5'>
        <img src={imgurl} alt='icon card' />
        <h2 className='text-lg font-semibold text-gray-800 mb-2 mt-4'>
          {label}
        </h2>
        <div className='flex items-start'>
          <div className='text-3xl font-bold text-gray-800 mr-2 mb-5'>
            {data}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesReportCard;
