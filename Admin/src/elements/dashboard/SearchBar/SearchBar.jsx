import React, { useEffect, useContext } from "react";
import ProductContext from "../../../context/ProductContext";
import axios from "axios";
import { useHistory } from "react-router";

function SearchBar({ paginate }) {
  let { productTable, q, setQ, setProductTable } = useContext(ProductContext);

  const history = useHistory();
  const handleSubmit = () => {
    history.push(`?s=${q}`);

    axios
      .get(`http://localhost:3001/admin/search?s=${q}`)
      .then((res) => {
        console.log("cs search useEffect: ", res.data);
        setProductTable(res.data);
        console.log("productTable after axios :", productTable);
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
      {/* FIRAAAAAAAAAAAAAAAAAAAAAAAAAAA */}
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
              placeholder="Search product name"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              // onChange={(e) => setQ(e.target.value)}
            />
            <input
              className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              id="searchQuerySubmit"
              value="search"
              type="submit"
              name="searchQuerySubmit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;
