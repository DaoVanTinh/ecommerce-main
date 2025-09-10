import React, { useEffect, useState, useMemo } from "react";
import {
  Footer,
  ImageWithFallback,
  NavigationBar,
  Newsletter,
  NotificationBar,
  ShopHeader,
} from "../../components";
import { ImgError } from "../../assets";
import { Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Toàn bộ");
  const [priceRange, setPriceRange] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(products.map((p) => p.category))];
    return ["Toàn bộ", ...unique];
  }, [products]);

  const priceRanges = [
    { label: "Tất cả giá", min: 0, max: Infinity },
    { label: "$0.00 - 99.99", min: 0, max: 99.99 },
    { label: "$100.00 - 199.99", min: 100, max: 199.99 },
    { label: "$200.00 - 299.99", min: 200, max: 299.99 },
    { label: "$300.00 - 399.99", min: 300, max: 399.99 },
    { label: "$400.00+", min: 400, max: Infinity },
  ];

  const navigate = useNavigate();

  const filteredProducts = products.filter((p) => {
    const matchCategory = category === "Toàn bộ" || p.category === category;
    const matchPrice =
      !priceRange || (p.price >= priceRange.min && p.price <= priceRange.max);
    return matchCategory && matchPrice;
  });

  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];
    switch (sortOption) {
      case "lowToHigh":
        return sorted.sort((a, b) => a.price - b.price);
      case "highToLow":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);

  return (
    <div>
      <NotificationBar />
      <NavigationBar className="bg-white" />
      <ShopHeader />
      <div className="flex p-8 gap-8 ml-[160px] mr-[160px] mb-[100px]">
        <aside className="w-64 border-r pr-6">
          <h2 className="font-semibold text-xl mb-4 flex items-center">
            <Settings2 className="mr-2" />
            Lọc sản phẩm
          </h2>

          <div className="mb-6">
            <h3 className="text-base font-semibold mb-2">THỂ LOẠI</h3>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li
                  key={c}
                  onClick={() => {
                    setCategory(c);
                    setVisibleCount(9);
                  }}
                  className={`text-sm cursor-pointer ${
                    category === c
                      ? "font-semibold text-[#121212]"
                      : "text-[#807E7E]"
                  }`}
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold mb-2">GIÁ</h3>
            <ul className="space-y-2">
              {priceRanges.map((range) => (
                <li key={range.label} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={priceRange?.label === range.label}
                    onChange={() =>
                      setPriceRange(
                        priceRange?.label === range.label ? null : range
                      )
                    }
                  />
                  <span className="text-[#807E7E] text-sm font-semibold">
                    {range.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{category}</h1>
            <select
              className="border px-3 py-1 rounded"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sắp xếp theo</option>
              <option value="lowToHigh">Giá: Thấp đến Cao</option>
              <option value="highToLow">Giá: Cao đến Thấp</option>
              <option value="newest">Mới nhất</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="cursor-pointer border rounded-lg p-4 shadow-sm hover:shadow-md hover:scale-105 transition"
              >
                <ImageWithFallback
                  src={product.image}
                  fallback={ImgError}
                  alt={product.name}
                  className="w-full h-52 object-cover rounded-lg"
                />
                <h3 className="font-semibold mt-2">{product.name}</h3>
                {product.oldPrice && (
                  <p className="text-gray-500 line-through">
                    ${product.oldPrice}
                  </p>
                )}
                <p className="text-xl font-bold text-green-600">
                  ${product.price}
                </p>
              </div>
            ))}
          </div>
          {visibleCount < sortedProducts.length && (
            <div className="text-center mt-8">
              <button
                onClick={() => setVisibleCount((prev) => prev + 9)}
                className="mt-[80px] px-10 py-1 border border-[#121212] text-[#121212] rounded-xl hover:bg-[#121212] hover:text-white transition cursor-pointer"
              >
                Xem thêm
              </button>
            </div>
          )}
        </main>
      </div>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Products;
