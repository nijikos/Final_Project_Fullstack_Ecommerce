import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import WelcomeBanner from "../partials/dashboard/WelcomeBanner";
import swal from "sweetalert";

function Users() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchInput, setsearchInput] = useState("");
  const [click, setclick] = useState(false);

  const [UserData, setuserData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/auth/user/").then((res) => {
      setuserData(res.data);
    });
  }, [click]);

  const submitFirstNameSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3001/auth/users/search-first-name-id?search=${searchInput}`
      )
      .then((res) => {
        setuserData(res.data);
        setsearchInput("");
      });
  };

  const submitLastNameSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3001/auth/users/search-last-name-id?search=${searchInput}`
      )
      .then((res) => {
        setuserData(res.data);
        setsearchInput("");
      });
  };

  const submitEmailSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3001/auth/users/search-email-id?search=${searchInput}`
      )
      .then((res) => {
        setuserData(res.data);
        setsearchInput("");
      });
  };

  const submitStatusSearch = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://localhost:3001/auth/users/search-status-id?search=${searchInput}`
      )
      .then((res) => {
        setuserData(res.data);
        setsearchInput("");
      });
  };

  const active = () => {
    axios.get(`http://localhost:3001/auth/users/active`).then((res) => {
      setuserData(res.data);
    });
  };

  const inactive = () => {
    axios.get(`http://localhost:3001/auth/users/inactive`).then((res) => {
      setuserData(res.data);
    });
  };

  const deactive_user = (user_id) => {
    swal({
      title: "Are you sure?",
      text: "Want to deactivate this user",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDeactive) => {
      if (willDeactive) {
        swal({
          title: "Successfully!",
          text: "Deactivated this user",
          icon: "success",
        });

        axios
          .patch(`http://localhost:3001/users/deactivate/${user_id}`, {})
          .then(function (response) {
            setclick(!click);
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        swal({
          text: "This user cancel Deactivated!",
        });
      }
    });
  };

  const active_user = (user_id) => {
    swal({
      title: "Are you sure?",
      text: "Want to activate this user",
      icon: "warning",
      buttons: true,
      dangerMode: false,
    }).then((willDeactive) => {
      if (willDeactive) {
        swal({
          title: "Sucessfully!",
          text: "Activated this user",
          icon: "success",
        });
        axios
          .patch(`http://localhost:3001/users/activate/${user_id}`, {})
          .then(function (response) {
            setclick(!click);
            console.log(response);
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        swal({
          title: "This User Cancel activate!",
        });
      }
    });
  };

  console.log("this is userData : ", UserData);

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
  for (let i = 1; i <= Math.ceil(UserData.length / itemsPerPage); i++) {
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
  const currentItems = UserData.slice(indexOfFirstItem, indexOfLastItem);

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
  const renderData = (UserData) => {
    return (
      <>
        {UserData.map((item, i) => {
          return (
            <tr key={i}>
              <td className='p-2 whitespace-nowrap'>
                <div className=' text-center font-medium text-gray-800'>
                  {item.id}
                </div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>{item.first_name}</div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>{item.last_name}</div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center '>{item.email}</div>
              </td>
              <td className='p-2 whitespace-nowrap'>
                <div className='text-center'>
                  {item.status == "active" ? (
                    <div className='font-medium text-green-500'>
                      {item.status}
                    </div>
                  ) : (
                    <div className='text-center font-medium text-red-500'>
                      {item.status}
                    </div>
                  )}
                </div>
              </td>
              <td className='p-2 whitespace-nowrap bg-white border border-white'>
                <div className='text-center'>
                  {item.status == "active" ? (
                    <button
                      class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded'
                      onClick={() => deactive_user(item.id)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      class='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                      onClick={() => active_user(item.id)}
                    >
                      Activate{}
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

  return (
    <div className='flex h-screen overflow-hidden'>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className='px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
            <WelcomeBanner />

            <div className='sm:flex sm:justify-between sm:items-center mb-8'>
              <div className='grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2'></div>
            </div>
            {/* search and sort start */}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", gap: "24px" }}
                className='mb-4'
              >
                <form
                  action=''
                  onSubmit={(e) => {
                    submitFirstNameSearch(e);
                    // submitLastNameSearch(e);
                  }}
                >
                  <input
                    style={{ width: "300px", borderColor: "#E2E8F0" }}
                    type='text'
                    name='search'
                    id='search'
                    placeholder='search user first name'
                    value={searchInput}
                    onChange={(e) => setsearchInput(e.target.value)}
                  />
                  <input
                    className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
                    type='submit'
                    value='search'
                  />
                </form>
              </div>{" "}
              {
                <div className='mr-8'>
                  <p>sort by user status:</p>
                  <button
                    className='mr-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-3 border border-gray-400 rounded shadow'
                    style={{ color: "green" }}
                    onClick={() => active()}
                  >
                    active
                  </button>
                  <button
                    className='mr-5 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-2 border border-gray-400 rounded shadow'
                    style={{ color: "red" }}
                    onClick={() => inactive()}
                  >
                    inactive
                  </button>
                </div>
              }
            </div>
            {/* search and sort end  */}

            <div className='col-span-full xl:col-span-12 bg-white shadow-lg rounded-sm border border-gray-200'>
              <header className='px-5 py-4 border-b border-gray-100'>
                <h2 className='font-semibold text-gray-800'>Users</h2>
              </header>
              <div className='p-3'>
                <div className='overflow-x-auto'>
                  <table className='table-auto w-full'>
                    <thead className='text-xs font-semibold uppercase text-gray-400 bg-gray-50'>
                      <tr>
                        <th className='p-2 whitespace-nowrap'>
                          <div className='font-semibold text-center'>No</div>
                        </th>
                        {/* <th className='p-2 whitespace-nowrap'>
                          <div className='font-semibold text-center'>
                            UserId
                          </div>
                        </th> */}
                        <th className='p-2 whitespace-nowrap'>
                          <div className='font-semibold text-center'>
                            First Name
                          </div>
                        </th>
                        <th className='p-2 whitespace-nowrap'>
                          <div className='font-semibold text-center'>
                            Last Name
                          </div>
                        </th>
                        <th className='p-2 whitespace-nowrap'>
                          <div className='font-semibold text-center'>
                            E-mail
                          </div>
                        </th>
                        <th className='p-2 whitespace-nowrap'>
                          <div className='font-semibold text-center'>
                            Status
                          </div>
                        </th>
                        <th className='p-2 whitespace-nowrap'>
                          <div className='font-semibold text-center'>
                            Action
                          </div>
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
                    disabled={
                      currentPage == pages[pages.length - 1] ? true : false
                    }
                  >{`>>`}</button>
                </li>
              </ul>
            </div>
            {/* page number buttons  */}
          </div>
        </main>
      </div>
    </div>
  );
}
// }

export default Users;
