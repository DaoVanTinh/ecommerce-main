import React, { useState } from "react";
import ProductsManager from "./ProductsManager";
import ProductCreate from "./ProductCreate";
import CategoriesManager from "./CategoriesManager";

const MENU = [
  { id: "products", label: "Quản lý sản phẩm" },
  { id: "categories", label: "Quản lý danh mục" },
  { id: "orders", label: "Quản lý đơn hàng" },
  { id: "users", label: "Quản lý user" },
];

const AdminDashboard = () => {
  const [selected, setSelected] = useState("products");
  const [subView, setSubView] = useState(null);

  const renderMain = () => {
    if (selected === "products") {
      if (subView?.name === "createProduct") {
        return (
          <ProductCreate
            onSaved={() => {
              setSubView(null);
              setSelected("products");
            }}
            onCancel={() => setSubView(null)}
          />
        );
      }
      return (
        <ProductsManager
          onCreate={() => setSubView({ name: "createProduct" })}
        />
      );
    }

    if (selected === "categories") {
      return <CategoriesManager />;
    }

    if (selected === "orders")
      return <div>Order manager — (implement similar to products)</div>;
    if (selected === "users")
      return <div>User manager — (implement similar)</div>;
    if (selected === "coupons")
      return <div>Coupon manager — (implement similar)</div>;

    return null;
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-white shadow p-4">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <nav className="flex flex-col gap-2">
          {MENU.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelected(m.id);
                setSubView(null);
              }}
              className={`text-left px-3 py-2 rounded ${
                selected === m.id
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {m.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6">{renderMain()}</main>
    </div>
  );
};

export default AdminDashboard;
