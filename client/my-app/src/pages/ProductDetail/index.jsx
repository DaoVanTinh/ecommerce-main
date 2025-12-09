import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ImageWithFallback,
  Footer,
  NotificationBar,
  NavigationBar,
  Breadcrumbs,
  Newsletter,
} from "../../components";
import { ImgError } from "../../assets";
import { CartContext } from "../../context/CartProvider";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setProduct(null);

    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/random");
        const data = await res.json();
        setRelated(data);
      } catch (err) {
        console.error("Error loading related:", err);
      }
    };

    fetchProduct();
    fetchRelated();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          Thêm vào giỏ hàng thành công!
        </div>
      )}

      <NotificationBar />
      <NavigationBar className="!bg-white" />
      <Breadcrumbs productName={product.name} />

      <div className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto p-6">
        <div className="flex-1">
          <ImageWithFallback
            src={product.images?.[0] || ImgError}
            fallback={ImgError}
            alt={product.name}
            className="w-full h-[500px] object-contain rounded-xl border"
          />
        </div>

        <div className="flex-1 rounded-xl border p-6">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-500 mb-6">{product.description}</p>
          <p className="text-2xl font-semibold mb-6">${product.price}</p>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
        {related.length === 0 ? (
          <p>Không có sản phẩm liên quan.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((item) => (
              <Link
                key={item._id}
                to={`/products/${item._id}`}
                className="border rounded-xl p-4 hover:shadow-lg transition"
              >
                <ImageWithFallback
                  src={item.images?.[0] || ImgError}
                  fallback={ImgError}
                  alt={item.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500">${item.price}</p>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
