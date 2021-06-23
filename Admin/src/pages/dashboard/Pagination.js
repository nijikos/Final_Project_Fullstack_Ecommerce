import React from "react";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // NEED TO CHANGE CLASSNAME TO IMPLEMENT STYLE
  return (
    <nav className='flex justify-center m-0'>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className='bg-transparent hover:bg-blue-500 text-blue-700 text-sm font-normal hover:text-white py-1 px-1 border border-blue-500 hover:border-transparent rounded m-0 active:bg-blue-500'
          onClick={(e) => {
            e.preventDefault();
            paginate(number);
          }}
        >
          {number}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
