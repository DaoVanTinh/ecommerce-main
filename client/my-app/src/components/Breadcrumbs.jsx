import { Link, useLocation } from "react-router-dom";
import React from "react";

function Breadcrumbs({ productName }) {
  const location = useLocation();

  const isProductsPage = location.pathname === "/products";

  return (
    <nav className="text-sm mb-6 ml-40 mr-40 mt-4">
      <ol className="flex items-center space-x-2 text-gray-500">
        <li>
          <Link to="/" className="hover:text-black transition">
            Trang chủ
          </Link>
        </li>

        <li>/</li>
        <li>
          {isProductsPage ? (
            <span className="text-black font-medium">Cửa hàng</span>
          ) : (
            <Link to="/products" className="hover:text-black transition">
              Cửa hàng
            </Link>
          )}
        </li>

        {productName && (
          <>
            <li>/</li>
            <li className="text-black font-medium">{productName}</li>
          </>
        )}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
