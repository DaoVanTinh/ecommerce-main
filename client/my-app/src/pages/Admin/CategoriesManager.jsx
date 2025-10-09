import React, { useEffect, useState } from "react";
import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../../services/categoryApi.js";

const CategoriesManager = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ category_name: "" });

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh mục:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createCategory(form);
      setForm({ category_name: "" });
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Lỗi tạo danh mục");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa danh mục này?")) return;
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Xóa thất bại");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Quản lý danh mục</h1>

      <div className="mb-4 max-w-md bg-white p-4 rounded shadow">
        <form onSubmit={handleCreate} className="flex gap-2">
          <input
            required
            placeholder="Tên danh mục"
            value={form.category_name}
            onChange={(e) =>
              setForm({ ...form, category_name: e.target.value })
            }
            className="flex-1 border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Thêm
          </button>
        </form>
      </div>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Tên</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="p-2">{c.category_name}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="2" className="p-4 text-center text-gray-500">
                  Không có danh mục
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesManager;
