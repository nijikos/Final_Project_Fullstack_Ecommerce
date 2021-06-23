import React from "react";

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='pagination d-flex justify-content-center'>
      {pageNumbers.map((number) => (
        <li key={number} className='page-item'>
          <a
            href='!#'
            className='page-link'
            onClick={(e) => {
              e.preventDefault();
              paginate(number);
            }}
          >
            {number}
          </a>
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
