import Search from "antd/lib/transfer/search";
import React, { useEffect, useContext } from "react";
import ProductContext from "../../../context/ProductContext";
import axios from "axios";
import { useHistory } from "react-router";

function SearchBar() {
  let { products, q, setQ, setProducts } = useContext(ProductContext);

  const history = useHistory();
  const handleSubmit = () => {
    history.push(`?s=${q}`);

    axios
      .get(`http://localhost:3001/search?s=${q}`)
      .then((res) => {
        console.log("cs search useEffect: ", res.data);
        setProducts(res.data);
        console.log("products after axios :", products);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className='searchBar'>
          <input
            id='searchQueryInput'
            type='text'
            name='searchQueryInput'
            placeholder='Search'
            value={q}
            onChange={(e) => setQ(e.target.value)}
            // onChange={(e) => setQ(e.target.value)}
          />
          <button id='searchQuerySubmit' type='submit' name='searchQuerySubmit'>
            <svg style={{ width: "24px", height: "24px" }} viewBox='0 0 24 24'>
              <path
                fill='#666666'
                d='M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z'
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
