import React, { useContext, useState, useEffect } from "react";
import SearchBarRequest from "../../elements/dashboard/SearchBar/SearchBarRequest";
import { Link } from "react-router-dom";
import AdminContext from "../../context/AdminContext";

import useInputState from "../../hooks/useInputState";

import Pagination from "./Pagination";
import AdminLayoutOne from "../../components/Layout/AdminLayoutOne";

const dateFormat = require("dateformat");
var arraySort = require("array-sort");

const renderData = (requestTable) => {
  return (
    <>
      {requestTable &&
        requestTable?.map((item, index) => {
          return (
            <tr key={index}>
              <td className="p-2 whitespace-nowrap">
                <div className=" text-center font-medium text-gray-800">
                  {index + 1}
                </div>
              </td>
              <td className="p-2 whitespace-normal">
                <div className="text-left">{item.invoice_code}</div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-left font-medium text-grey-500">
                  {dateFormat(item.paid_time, "longDate")}
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-center font-medium text-gray-500">
                  {item.location}
                </div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-center">{item.payment_status}</div>
              </td>
              <td className="p-2 whitespace-nowrap">
                <div className="text-center">{item.verified_status}</div>
              </td>

              <td className="p-2 whitespace-nowrap">
                <div className="text-center">
                  {item.payment_status == "paid" &&
                  item.verified_status == "verified" ? (
                    "Verification Complete"
                  ) : item.payment_status == "paid" ? (
                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded mr-4">
                      <Link to={`/invoice/verify/${item.invoice_id}`}>
                        <button>Check Payment Confirmation</button>
                      </Link>
                    </button>
                  ) : (
                    "Waiting for Payment Confirmation"
                  )}
                </div>
              </td>
            </tr>
          );
        })}
    </>
  );
};

const Request = () => {
  const { requestTable, setRequestTable } = useContext(AdminContext);
  console.log(requestTable, "ini request table");

  // untuk pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    requestTable ? setLoading(false) : setLoading(true);
  }, [loading]);

  // change page for paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = requestTable?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log("current products from gridlistwrapper :", currentProducts);

  return (
    <div>
      <AdminLayoutOne>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SearchBarRequest paginate={paginate} />
        </div>
        <div className="col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-800">Warehouse</h2>
          </header>
          <div className="p-3">
            <div className="overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center flex justify-center">
                        No
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setRequestTable(arraySort(requestTable, "id"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "id", {
                                reverse: true,
                              })
                            );
                            setLoading();
                          }}
                        >
                          ↑
                        </p>
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center flex justify-left">
                        Invoice Code
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "invoice_code")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "invoice_code", {
                                reverse: true,
                              })
                            );
                            setLoading();
                          }}
                        >
                          ↑
                        </p>
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center flex justify-start">
                        Request Date
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "paid_time")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "paid_time", {
                                reverse: true,
                              })
                            );
                            setLoading();
                          }}
                        >
                          ↑
                        </p>
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center flex justify-center">
                        Warehouse Location
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "location")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "location", {
                                reverse: true,
                              })
                            );
                            setLoading();
                          }}
                        >
                          ↑
                        </p>
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center flex justify-center">
                        Payment Status
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "payment_status")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "payment_status", {
                                reverse: true,
                              })
                            );
                            setLoading();
                          }}
                        >
                          ↑
                        </p>
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center flex justify-center">
                        Verification Status
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "verified_status")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setRequestTable(
                              arraySort(requestTable, "verified_status", {
                                reverse: true,
                              })
                            );
                            setLoading();
                          }}
                        >
                          ↑
                        </p>
                      </div>
                    </th>
                    <th className="p-2 whitespace-nowrap">
                      <div className="font-semibold text-center flex justify-center">
                        Check Payment Confirmation
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {renderData(currentProducts)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={requestTable?.length}
          paginate={paginate}
        />
      </AdminLayoutOne>
    </div>
  );
};

const styles = {
  table: {
    border: "1px solid black",
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
  },
};

export default Request;
