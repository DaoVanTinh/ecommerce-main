import React, { useEffect, useState } from "react";
import { deleteProduct } from "../../services/adminProductApi.js";
import { getCategories } from "../../services/categoryApi.js";
import { getProducts } from "../../services/productApi.js";

const formatVND = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    value || 0
  );

const ProductsManager = ({ onCreate }) => {
  const [products, setProducts] = useState([]);
  const [categoriesMap, setCategoriesMap] = useState({});

  const fetch = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tải sản phẩm");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      const map = {};
      (res.data || []).forEach((c) => (map[c._id] = c.category_name));
      setCategoriesMap(map);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetch();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa sản phẩm này?")) return;
    try {
      await deleteProduct(id);
      fetch();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi xóa");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Quản lý sản phẩm</h1>
        <div>
          <button
            onClick={onCreate}
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          >
            + Thêm sản phẩm
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Tên</th>
              <th className="p-2">Giá</th>
              <th className="p-2">Số lượng</th>
              <th className="p-2">Danh mục</th>
              <th className="p-2">Ảnh</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t">
                <td className="p-2">{p.name}</td>
                <td className="p-2 text-right">{formatVND(p.price)}</td>
                <td className="p-2 text-center">{p.stock}</td>
                <td className="p-2 text-center">
                  {p.category_id?.category_name ??
                    categoriesMap[p.category_id] ??
                    "-"}
                </td>
                <td className="p-2">
                  <div className="flex gap-1">
                    {(p.img || []).slice(0, 3).map((u, i) => (
                      <img
                        key={i}
                        src={u}
                        alt=""
                        className="w-12 h-12 object-cover rounded"
                      />
                    ))}
                  </div>
                </td>
                <td className="p-2 text-center">
                  <button className="px-2 py-1 bg-yellow-400 text-white rounded mr-2">
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Không có sản phẩm
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsManager;
