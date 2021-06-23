import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayoutOne from "../../components/Layout/AdminLayoutOne";
import ProductContext from "../../context/ProductContext";
import Pagination from "./Pagination";
import Swal from "sweetalert2";
import SearchBar from "../../elements/dashboard/SearchBar/SearchBar";
import axios from "axios";

const ListProducts = () => {
  const { productTable, setProductTable } = useContext(ProductContext);
  console.log("ini product table : ", productTable);

  var arraySort = require("array-sort");
  const { JS_NumberFormat } = require("js-number-formatter");

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/admin/delete/${id}`)
      .then((res) => {
        console.log("delete product id", res.data);
      })
      .catch((err) => console.log(err));

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Deleted!",
          "Product has been deleted. Please refresh the page",
          "success"
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "error");
      }
    });
  };

  // untuk pagination
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    productTable ? setLoading(false) : setLoading(true);
  }, [productTable, loading, isClicked]);

  // change page for paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // get current posts
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productTable?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  console.log("current products from gridlistwrapper :", currentProducts);

  const renderData = (productTable) => {
    return (
      <>
        {productTable &&
          productTable?.map((item, index) => {
            return (
              <tr key={index}>
                <td className='p-2 whitespace-nowrap'>
                  <div className=' text-center font-medium text-gray-800'>
                    {index + 1}
                  </div>
                </td>
                <td className='p-2 whitespace-normal'>
                  <div className='text-left text-xs'>{item.name}</div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='text-center text-green-500'>{item.sku}</div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='text-right font-medium text-gray-500'>
                    Rp{" "}
                    {JS_NumberFormat(item.price, {
                      op_AllowDecimal: false,
                      op_DelimiterChar: ".",
                    })}
                  </div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='text-center font-medium text-green-500'>
                    {item.location}
                  </div>
                </td>

                <td className='p-2 whitespace-nowrap'>
                  <div className='text-right'>{item.op_stock}</div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='text-right'>{item.user_stock}</div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='text-right'>
                    {item.warehouse_from == item.warehouse_id &&
                    item.status == "reserved"
                      ? item.reserved_stock
                      : 0}
                  </div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='text-right'>
                    {item.warehouse_from == item.warehouse_id &&
                    item.verified_status == "verified"
                      ? item.reserved_stock
                      : 0}
                  </div>
                </td>
                <td className='p-2 whitespace-nowrap'>
                  <div className='text-right'>
                    <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded ml-4 mr-1'>
                      <Link to={`/admin/products/edit/${item.id}`}>
                        Edit Product
                      </Link>
                    </button>
                    <button
                      className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded m-0'
                      onClick={() => {
                        handleDelete(item.id);
                        setLoading();
                        setIsClicked(!isClicked);
                      }}
                    >
                      Delete Product
                    </button>
                  </div>
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

          <Link to='/admin/products/add'>
            <button className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4'>
              Add Product
            </button>
          </Link>
        </div>
        <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200'>
          <header className='px-5 py-4 border-b border-gray-100'>
            <h2 className='font-semibold text-gray-800'>Warehouse</h2>
          </header>
          <div className='p-3'>
            <div className='overflow-x-auto'>
              <table className='table-auto w-full'>
                <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                  <tr>
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-center'>
                        No
                        <p
                          className='ml-1 mr-1 cursor-pointer'
                          onClick={() => {
                            setProductTable(arraySort(productTable, "id"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className='mr-1 cursor-pointer'
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
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-start'>
                        Product Name
                        <p
                          className='ml-1 mr-1 cursor-pointer'
                          onClick={() => {
                            setProductTable(arraySort(productTable, "name"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className='cursor-pointer'
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
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-end'>
                        SKU
                        <p
                          className='ml-1 mr-1 cursor-pointer'
                          onClick={() => {
                            setProductTable(arraySort(productTable, "sku"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className='cursor-pointer'
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
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-end'>
                        Price
                        <p
                          className='ml-1 mr-1 cursor-pointer'
                          onClick={() => {
                            setProductTable(arraySort(productTable, "price"));
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className='cursor-pointer'
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
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-end'>
                        WH Location
                        <p
                          className='ml-1 mr-1 cursor-pointer'
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "location")
                            );
                            setLoading();
                          }}
                        >
                          ↓
                        </p>
                        <p
                          className='cursor-pointer'
                          onClick={() => {
                            setProductTable(
                              arraySort(productTable, "location", {
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
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-end'>
                        Op. Stock
                        <p
                          className='ml-1 mr-1 cursor-pointer'
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
                          className='cursor-pointer'
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
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-end'>
                        User Stock
                        <p
                          className='ml-1 mr-1 cursor-pointer'
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
                          className='cursor-pointer'
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
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-end'>
                        # of Requests
                        <p
                          className='ml-1 mr-1 cursor-pointer'
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
                          className='cursor-pointer'
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
                    <th className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center flex justify-end'>
                        # of In Transaction
                        <p
                          className='ml-1 mr-1 cursor-pointer'
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
                          className='cursor-pointer'
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
                    <th colSpan='2' className='p-2 whitespace-nowrap'>
                      <div className='font-semibold text-center'>
                        Modify Product
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className='text-sm divide-y divide-gray-100'>
                  {renderData(currentProducts)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={productTable?.length}
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

export default ListProducts;
