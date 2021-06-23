import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

class Users extends Component {
  state = {
    users: [],
  };

  componentWillMount() {
    axios.get("http://localhost:3001/auth/user/").then((result) => {
      this.setState({
        users: result.data,
      });
    });
  }

  render() {
    const users = this.state.users.map((item, index) => {
      return (
        <tr key={index}>
          <td className="p-2 whitespace-nowrap bg-white border border-white">
            <div className="text-center">{item.id}</div>
          </td>
          <td className="p-2 whitespace-nowrap bg-white border border-white">
            <div className="text-center">{item.id}</div>
          </td>
          <td className="p-2 whitespace-nowrap bg-white border border-white">
            <div className="text-center">
              {item.first_name} {item.last_name}
            </div>
          </td>
          <td className="p-2 whitespace-nowrap bg-white border border-white">
            <div className="text-center">{item.email}</div>
          </td>
          <td className="p-2 whitespace-nowrap bg-white border border-white">
            <div className="text-center font-medium text-green-500">
              {item.status}
            </div>
          </td>
          <td className="p-2 whitespace-nowrap bg-white border border-white">
            <div className="text-center">{item.isLoggedin}</div>
          </td>
          <td className="p-2 whitespace-nowrap bg-white border border-white">
            <div className="text-center">{item.isLoggedin}</div>
          </td>
          <td className="p-2 whitespace-nowrap bg-white border border-white">
            <div className="text-center">
              <Link to={`/users/detail/${item.id}`}>
                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                  User Detail
                </button>
              </Link>
            </div>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Users</h2>
        </header>
        <div className="p-3">
          <div className="">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">No</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">UserId</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">E-mail</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Status</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      Current Buy Requests
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">
                      On Going Transactions
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {users}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
