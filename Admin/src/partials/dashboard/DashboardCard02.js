import React from "react";
import Icon from "../../images/icon-02.svg";

function DashboardCard02() {
  return (
    <div className="flex flex-col col-span-full sm:col-span-3 xl:col-span-4 bg-white shadow-lg rounded-sm border border-gray-200">
      <div className="px-5 pt-5">
        <img src="https://img.icons8.com/color/48/000000/lift-cart-here.png" />
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Number of Product
        </h2>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">
          Click to see detail
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-gray-800 mr-2">1234</div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard02;
