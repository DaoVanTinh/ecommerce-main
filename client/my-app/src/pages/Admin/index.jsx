import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../../services/productApi.js";

const DashboardAdmin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  // Format số sang VNĐ
  const formatVND = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  // Fetch tất cả sản phẩm
  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Tạo sản phẩm mới
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      };

      await createProduct(productData);
      setNewProduct({ name: "", price: "", stock: "", description: "" });
      fetchProducts();
    } catch (err) {
      console.error("Create product error:", err.response?.data || err);
      alert(err.response?.data?.message || "Lỗi khi thêm sản phẩm");
    }
  };

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        fetchProducts();
      } catch (err) {
        console.error("Delete error:", err.response?.data || err);
        alert(err.response?.data?.message || "Lỗi khi xóa sản phẩm");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Quản lý sản phẩm</h1>

      <form
        onSubmit={handleCreate}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Giá (VNĐ)"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Số lượng"
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
          className="w-full border p-2 mb-2 rounded"
          required
        />

        <textarea
          placeholder="Mô tả"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
          className="w-full border p-2 mb-2 rounded"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Lưu
        </button>
      </form>

      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Tên</th>
            <th className="p-2">Giá</th>
            <th className="p-2">Số lượng</th>
            <th className="p-2">Mô tả</th>
            <th className="p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b">
              <td className="p-2">{p.name}</td>
              <td className="p-2">{formatVND(p.price)}</td>
              <td className="p-2">{p.stock}</td>
              <td className="p-2">{p.description}</td>
              <td className="p-2 space-x-2">
                <button className="px-3 py-1 bg-yellow-400 text-white rounded">
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardAdmin;
