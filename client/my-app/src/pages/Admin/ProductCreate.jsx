import React, { useEffect, useState } from "react";
import { createProduct } from "../../services/adminProductApi.js";
import { getCategories } from "../../services/categoryApi";

const ProductCreate = ({ onSaved = () => {}, onCancel = () => {} }) => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    category_id: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getCategories();
        setCategories(res.data || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const handleFileChange = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category_id) {
      alert("Vui lòng chọn danh mục");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("price", form.price);
      fd.append("stock", form.stock);
      fd.append("description", form.description);
      fd.append("category_id", form.category_id);

      if (form.images && form.images.length) {
        for (let i = 0; i < form.images.length; i++) {
          fd.append("images", form.images[i]);
        }
      }

      await createProduct(fd);
      alert("Tạo sản phẩm thành công");

      setForm({
        name: "",
        price: "",
        stock: "",
        description: "",
        category_id: "",
        images: [],
      });

      onSaved();
    } catch (err) {
      console.error(err);
      alert("Lỗi khi tạo sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          required
          placeholder="Tên sản phẩm"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          required
          type="number"
          placeholder="Giá"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          required
          type="number"
          placeholder="Số lượng"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="border p-2 rounded"
        />
        <select
          required
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.category_name}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        {form.images && form.images.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {Array.from(form.images).map((file, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm"
              >
                {file.name}
              </span>
            ))}
          </div>
        )}
        <textarea
          placeholder="Mô tả"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border p-2 rounded"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
            }`}
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
