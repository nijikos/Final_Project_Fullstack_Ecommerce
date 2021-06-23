import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../../context/ProductContext";
import Swal from "sweetalert2";

import AdminLayoutOne from "../../components/Layout/AdminLayoutOne";

export default function AddProducts() {
  const {
    category,
    addProduct2,
    productSKU,
    handleProductSKUChange,
    resetSKU,
    productCategoryId,
    handleProductCategoryIdChange,
    resetCategoryId,
    productName,
    handleNameChange,
    resetName,
    productPrice,
    handlePriceChange,
    resetPrice,
    productDesc,
    handleDescChange,
    resetDesc,
    productModal,
    handleProductModalChange,
    resetProductModal,
    stockKelapaGading,
    handleStockKelapaGading,
    resetStockKelapaGading,
    stockKemayoran,
    handleStockKemayoran,
    resetStockKemayoran,
    stockPalmerah,
    handleStockPalmerah,
    resetStockPalmerah,
    stockCakung,
    handleStockCakung,
    resetStockCakung,
    stockPasarMinggu,
    handleStockPasarMinggu,
    resetStockPasarMinggu,
    imageUrl1,
    handleImageUrl1Change,
    resetImageUrl1,
    imageUrl2,
    handleImageUrl2Change,
    resetImageUrl2,
    imageUrl3,
    handleImageUrl3Change,
    resetImageUrl3,
    resetCategory,
  } = useContext(ProductContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct2(
      productSKU,
      productCategoryId,
      productName,
      productPrice,
      productDesc,
      productModal,
      stockKelapaGading,
      stockKemayoran,
      stockPalmerah,
      stockCakung,
      stockPasarMinggu,
      imageUrl1,
      imageUrl2,
      imageUrl3
    );

    resetSKU();
    resetName();
    resetCategoryId();
    resetPrice();
    resetDesc();
    resetProductModal();
    resetStockKelapaGading();
    resetStockKemayoran();
    resetStockPalmerah();
    resetStockCakung();
    resetStockPasarMinggu();
    resetImageUrl1();
    resetImageUrl2();
    resetImageUrl3();
    resetCategory();
    Swal.fire({
      title: "Product Added",
    });
  };

  return (
    <AdminLayoutOne>
      <form onSubmit={handleSubmit} className="w-full max-w-screen-xl">
        <div classname="flex-col">
          <div className="m-0 flex-auto justify-start max-w-md">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
              Product Name
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
                value={productName}
                name="productName"
                type="text"
                onChange={handleNameChange}
                required
              />
            </label>
          </div>
          <div className="m-0 justify-start flex-auto max-w-sm">
            <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
              SKU
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
                value={productSKU}
                name="productSKU"
                type="text"
                onChange={handleProductSKUChange}
                required
              />
            </label>
          </div>
        </div>
        <div classname="m-0 justify-start flex-auto max-w-sm">
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-sm">
            Product Category
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              onChange={handleProductCategoryIdChange}
            >
              {category &&
                category.map((item, id) => {
                  return (
                    <option value={item.id}>
                      {item.id}. {item.name}
                    </option>
                  );
                })}
            </select>
          </label>
        </div>
        <div classname="m-0 justify-start flex-auto max-w-sm">
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-sm">
            Product Price
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              onChange={handlePriceChange}
              value={productPrice}
              name="productPrice"
              type="number"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
            Product Description
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline block w-full"
              rows="5"
              required
              onChange={handleDescChange}
              value={productDesc}
              name="productDesc"
              type="text"
            />
          </label>
        </div>
        <div>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-sm">
            Modal
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              onChange={handleProductModalChange}
              value={productModal}
              name="productModal"
              type="number"
            />
          </label>
        </div>
        <br />
        <p className="text-xl font-bold">STOCK</p>
        <div classname="m-0 justify-start flex-auto max-w-sm">
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-sm">
            Kelapa Gading
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              type="number"
              value={stockKelapaGading}
              name="stockKelapaGading"
              onChange={handleStockKelapaGading}
            />
          </label>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-sm">
            Kemayoran
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              type="number"
              value={stockKemayoran}
              name="stockKemayoran"
              onChange={handleStockKemayoran}
            />
          </label>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-sm">
            Palmerah
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              type="number"
              value={stockPalmerah}
              name="stockPalmerah"
              onChange={handleStockPalmerah}
            />
          </label>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-sm">
            Cakung
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              type="number"
              value={stockCakung}
              name="stockCakung"
              onChange={handleStockCakung}
            />
          </label>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-sm">
            Pasar Minggu
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              type="number"
              value={stockPasarMinggu}
              name="stockPasarMinggu"
              onChange={handleStockPasarMinggu}
            />
          </label>
        </div>
        <div>
          <br />
          <p className="text-xl">Image URL</p>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-xl">
            Image 1
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              type="text"
              value={imageUrl1}
              name="imageUrl1"
              onChange={handleImageUrl1Change}
            />
          </label>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-xl">
            Image 2
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              type="text"
              value={imageUrl2}
              name="imageUrl2"
              onChange={handleImageUrl2Change}
            />
          </label>
          <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4 max-w-xl">
            Image 3
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline max-w-none"
              required
              type="text"
              value={imageUrl3}
              name="imageUrl3"
              onChange={handleImageUrl3Change}
            />
          </label>
        </div>
        <button
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-2 border border-blue-500 hover:border-transparent rounded mt-4 mr-1"
          onClick={handleSubmit}
        >
          <Link to={`/admin/products/all`}>Submit</Link>{" "}
        </button>
      </form>
    </AdminLayoutOne>
  );
}
