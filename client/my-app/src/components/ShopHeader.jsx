import React from "react";
import { Shoppage } from "../assets/index.js";
import Breadcrumbs from "./Breadcrumbs.jsx";

function ShopHeader() {
  return (
    <div>
      <div className="ml-[160px] mr-[160px] mt-[40px] mb-[60px] relative">
        <img src={Shoppage} alt="" className="w-full h-auto" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <Breadcrumbs />
          <h1 className="text-5xl font-medium text-black">Shop Page</h1>
          <span className="text-xl font-normal text-black mt-6">
            Chất âm đỉnh cao – Đồng hành mọi giai điệu.
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShopHeader;
