import React, { useEffect, useContext } from "react";
import ProductContext from "../../../context/ProductContext";
import AdminContext from "../../../context/AdminContext";
import axios from "axios";
import { useHistory } from "react-router";

function SearchBar({ paginate }) {
  let { q, setQ } = useContext(ProductContext);
  const { requestTable, setRequestTable } = useContext(AdminContext);

  const history = useHistory();
  const handleSubmit = () => {
    history.push(`?s=${q}`);

    axios
      .get(`http://localhost:3001/admin/requests/search?s=${q}`)
      .then((res) => {
        console.log("cs search useEffect: ", res.data);
        setRequestTable(res.data);
        console.log("requestTable after axios :", requestTable);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ display: "flex", flexDirection: "row", gap: "24px" }}
        className="mb-4"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
            paginate(1);
          }}
        >
          <div className="searchBar">
            <input
              style={{ width: "300px", borderColor: "#E2E8F0" }}
              id="searchQueryInput"
              type="text"
              name="searchQueryInput"
              placeholder="Search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              // onChange={(e) => setQ(e.target.value)}
            />
            <input
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              id="searchQuerySubmit"
              type="submit"
              name="searchQuerySubmit"
              value="search"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
