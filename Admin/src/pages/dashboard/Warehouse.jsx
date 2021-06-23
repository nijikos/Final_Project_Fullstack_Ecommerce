import React, { useContext, useState, useEffect } from "react";
import SearchBar from "../../elements/dashboard/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import AdminContext from "../../context/AdminContext";
import ProductContext from "../../context/ProductContext";
import useInputState from "../../hooks/useInputState";

import Pagination from "./Pagination";
import AdminLayoutOne from "../../components/Layout/AdminLayoutOne";

const Warehouse = () => {
  var arraySort = require("array-sort");
  const { JS_NumberFormat } = require("js-number-formatter");
  const { requestTable } = useContext(AdminContext);
  const { warehouse, productTable, setProductTable } =
    useContext(ProductContext);
  const [WH, handleWHChange, resetWH] = useInputState(1);

  // untuk pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    productTable ? setLoading(false) : setLoading(true);
  }, [loading]);

  // change page for paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productTable
    ?.filter((item) => item.warehouse_id == WH)
    .slice(indexOfFirstProduct, indexOfLastProduct);
  console.log("current products from gridlistwrapper :", currentProducts);

  const renderData = (productTable) => {
    return (
      <>
        {productTable &&
          productTable
            ?.filter((item) => item.warehouse_id == WH)
            .map((item, index) => {
              return (
                <tr key={index}>
                  <td className="p-2 whitespace-nowrap">
                    <div className=" text-center font-medium text-gray-800">
                      {index + 1}
                    </div>
                  </td>
                  <td className="p-2 whitespace-normal">
                    <div className="text-left text-xs">{item.name}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-left font-medium text-green-500">
                      {item.sku}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-right font-medium text-gray-500">
                      Rp{" "}
                      {JS_NumberFormat(item.price, {
                        op_AllowDecimal: false,
                        op_DelimiterChar: ".",
                      })}
                    </div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-right">{item.op_stock}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-right">{item.user_stock}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-right">{item.requested_stock}</div>
                  </td>
                  <td className="p-2 whitespace-nowrap">
                    <div className="text-right">{item.in_transit_stock}</div>
                  </td>
                </tr>
              );
            })}
      </>
    );
  };

  return (
    <div>
      <AdminLayoutOne>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <SearchBar paginate={paginate} />
          <div>
            <select required onChange={(e) => handleWHChange(e)}>
              {warehouse &&
                warehouse.map((item, id) => {
                  return (
                    <option value={item.id}>
                      {item.id}. {item.location}
                    </option>
                  );
                })}
            </select>
          </div>
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
                            setProductTable(arraySort(productTable, "id"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "id", {
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
                        Product Name
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setProductTable(arraySort(productTable, "name"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "name", {
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
                        SKU
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setProductTable(arraySort(productTable, "sku"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "sku", {
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
                      <div className="font-semibold text-center flex justify-end">
                        Price
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setProductTable(arraySort(productTable, "price"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "price", {
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
                      <div className="font-semibold text-center flex justify-end">
                        Op. Stock
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "op_stock")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "op_stock", {
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
                      <div className="font-semibold text-center flex jusify-end">
                        User Stock
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "user_stock")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "user_stock", {
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
                      <div className="font-semibold text-center flex jusify-end">
                        # of Requests
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "requested_stock")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "requested_stock", {
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
                      <div className="font-semibold text-center flex jusify-end">
                        # of In Transaction
                        <p
                          className="ml-1 mr-1 cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "in_transit_stock")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className="cursor-pointer"
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "in_transit_stock", {
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
          totalProducts={
            productTable?.filter((item) => item.warehouse_id == WH).length
          }
          paginate={paginate}
        />
      </AdminLayoutOne>
    </div>
  );
};

export default Warehouse;
