import { useContext } from "react";
import { CartContext } from "../../context/CartProvider";
import { useNavigate } from "react-router-dom";
import React from "react";

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } =
    useContext(CartContext);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p className="p-8 text-center">🛒 Giỏ hàng trống</p>;
  }

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Bạn cần đăng nhập để thanh toán!");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          totalPrice: total,
        }),
      });

      const data = await res.json();
      if (res.status === 401) {
        localStorage.removeItem("token");
        alert("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
        navigate("/login");
        return;
      }
      if (res.ok) {
        alert("Đặt hàng thành công!");
        navigate("/orders");
      } else {
        alert(data.error || data.message || "Có lỗi xảy ra khi đặt hàng");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Không thể kết nối tới server!");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{item.name}</h2>
                <p>{item.price} đ</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="px-2 py-1 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="px-2 py-1 border rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item._id)}
                className="ml-4 text-red-500"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-right">
        <h2 className="text-xl font-bold">Tổng: {total} đ</h2>
        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
}

export default Cart;
