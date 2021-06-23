import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AdminLayoutOne from "../components/Layout/AdminLayoutOne";

function Perpindahan() {
  const dateFormat = require("dateformat");
  const [searchInput, setsearchInput] = useState("");
  const [selectedFrom, setselectedFrom] = useState("utara");
  const [selectedTo, setselectedTo] = useState("utara");
  const [transferData, settransferData] = useState([]);
  const [requestClicked, setrequestClicked] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/admin/transaction/stock-transfer`)
      .then((res) => {
        settransferData(res.data);
      });
  }, [requestClicked]);

  const submitSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3001/admin/transaction/search-stock-transfer?search=${searchInput}`
      )
      .then((res) => {
        settransferData(res.data);
        setsearchInput("");
      });
  };

  const handleFilter = () => {
    let data = {
      from: selectedFrom,
      to: selectedTo,
    };
    console.log("handlefilter data : ", data);
    axios
      .get(
        `http://localhost:3001/admin/transaction/filter-stock-transfer?from=${selectedFrom}&to=${selectedTo}`
      )
      .then((res) => {
        settransferData(res.data);
        setsearchInput("");
      });
  };

  // untuk pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(8);

  const [pageNumberLimit, setpageNumberLimit] = useState(3);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(transferData.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          // className={currentPage == number ? "active" : null}
          className='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transferData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePrev = () => {
    setcurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if ((pages.length = minPageNumberLimit)) {
    pageDecrementBtn = <li> &hellip; </li>;
  }
  const renderData = (transferData) => {
    return (
      <>
        {transferData.map((item, i) => {
          return (
            <tr key={i}>
              <td className='p-2 whitespace-nowrap'>
                <div className=' text-center font-medium text-gray-800'>
                  {i + 1}
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>
                  {" "}
                  {dateFormat(item.request_date, "longDate")}
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center font-medium text-green-500'>
                  {item.name}
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>{item.sku}</div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>{item.from_warehouse1}</div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>{item.to_warehouse}</div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>{item.quantity}</div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>{item.status}</div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>
                  {item.status === "completed" ? (
                    <button
                      className='bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'
                      onClick={() => setrequestClicked(!requestClicked)}
                    >
                      Restocked
                    </button>
                  ) : (
                    <button
                      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                      onClick={() => {
                        handlerRestock(
                          item.product_id,
                          item.quantity,
                          item.to_warehouse,
                          item.from_warehouse1,
                          item.from_warehouse2,
                          item.id
                        );
                      }}
                    >
                      Restock
                    </button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  };

  // untuk bagian restock stock di warehouse
  const handlerRestock = (
    product_id,
    quantity,
    to_warehouse,
    from_warehouse1,
    from_warehouse2,
    id
  ) => {
    setrequestClicked(!requestClicked);
    axios
      .patch(
        `http://localhost:3001/admin/transaction/stock-transfer/warehouse?product_id=${product_id}&to_warehouse_id=${to_warehouse}&from_warehouse_id1=${from_warehouse1}&from_warehouse_id2=${from_warehouse2}&quantity=${quantity}&id=${id}`
      )
      .then(() => {});
  };

  console.log("TRANSFER DATA : ", transferData);
  // console.log("this is transactionData : ", transactionData);
  console.log("SELECTED FROM : ", selectedFrom);
  console.log("SELECTED TO : ", selectedTo);
  return (
    <AdminLayoutOne>
      {/* DROPDOWN SELECT START  */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          alignItems: "center",
        }}
        className='mb-4'
      >
        <label for='fromWarehouse'>From Warehouse : </label>

        <select
          name='fromWarehouse'
          id='fromWarehouse'
          value={selectedFrom}
          onChange={(e) => {
            const selectedFromOption = e.target.value;
            setselectedFrom(selectedFromOption);
          }}
        >
          <option value='utara'>Jakarta Utara</option>
          <option value='pusat'>Jakarta Pusat</option>
          <option value='barat'>Jakarta Barat</option>
          <option value='timur'>Jakarta Timur</option>
          <option value='selatan'>Jakarta Selatan</option>
        </select>

        <label for='toWarehouse'>To Warehouse : </label>

        <select
          name='toWarehouse'
          id='toWarehouse'
          value={selectedTo}
          onChange={(e) => {
            const selectedToOption = e.target.value;
            setselectedTo(selectedToOption);
          }}
        >
          <option value='utara'>Jakarta Utara</option>
          <option value='pusat'>Jakarta Pusat</option>
          <option value='barat'>Jakarta Barat</option>
          <option value='timur'>Jakarta Timur</option>
          <option value='selatan'>Jakarta Selatan</option>
        </select>

        <button
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
          onClick={() => handleFilter()}
        >
          Filter
        </button>
        {/* SEARCHBAR START  */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "24px",
            marginLeft: "auto",
          }}
        >
          <form
            action=''
            onSubmit={(e) => {
              submitSearch(e);
            }}
          >
            <input
              style={{ width: "300px", borderColor: "#E2E8F0" }}
              type='text'
              name='search'
              id='search'
              placeholder='search products/warehouse'
              value={searchInput}
              onChange={(e) => setsearchInput(e.target.value)}
            />
            <input
              className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
              type='submit'
              value='search'
            />
          </form>
        </div>
        {/* SEARCH BAR END  */}
      </div>
      {/* DROPDOWN SELECT END  */}

      <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200'>
        <header className='px-5 py-4 border-b border-gray-100'>
          <h2 className='font-semibold text-gray-800'>Stock Transfer</h2>
        </header>
        <div className='p-3'>
          <div className='overflow-x-auto'>
            <table className='table-auto w-full'>
              <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                <tr>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>No</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>Date</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>
                      Product Name
                    </div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>Product SKU</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>
                      From Warehouse
                    </div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>
                      To Warehouse
                    </div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>Quantity</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>Status</div>
                  </th>
                  <th className='p-2 whitespace-nowrap'>
                    <div className='font-semibold text-center'>Action</div>
                  </th>
                </tr>
              </thead>

              <tbody className='text-sm divide-y divide-gray-100'>
                {renderData(currentItems)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* page number buttons  */}
      <div>
        <ul className='flex-1 flex justify-start my-4 items-center'>
          <li>
            <button
              className='relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50'
              onClick={handlePrev}
              disabled={currentPage == pages[0] ? true : false}
            >{`<<`}</button>
          </li>
          {pageDecrementBtn}
          {/* {renderPageNumbers} */}
          {pageIncrementBtn}
          <li>
            <button
              className='ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-5'
              onClick={handleNext}
              disabled={currentPage == pages[pages.length - 1] ? true : false}
            >{`>>`}</button>
          </li>
        </ul>
      </div>
      {/* page number buttons  */}
    </AdminLayoutOne>
  );
}

export default Perpindahan;
