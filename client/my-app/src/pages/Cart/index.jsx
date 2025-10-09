import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartProvider";
import { Footer, NavigationBar, NotificationBar } from "../../components";
import { ImgError } from "../../assets";
import { createOrder } from "../../services/cartApi";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!localStorage.getItem("token")) {
      alert("Bạn cần đăng nhập để thanh toán!");
      navigate("/login");
      return;
    }

    try {
      await createOrder(cart, total);
      alert("Đặt hàng thành công!");
      navigate("/orders");
    } catch (err) {
      console.error("Checkout error:", err);
      alert(err.response?.data?.error || "Có lỗi xảy ra khi đặt hàng");
    }
  };

  if (cart.length === 0)
    return (
      <div className="min-h-screen flex flex-col">
        <NotificationBar />
        <NavigationBar />
        <div className="flex-grow flex items-center justify-center">
          <p className="p-8 text-center text-xl">🛒 Giỏ hàng trống</p>
        </div>
        <Footer />
      </div>
    );

  return (
    <div>
      <NotificationBar />
      <NavigationBar />
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Giỏ hàng</h1>
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images?.[0] || ImgError}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>{item.price.toLocaleString("vi-VN")} đ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(item._id, Math.max(1, item.quantity - 1))
                  }
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
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end items-center gap-6">
          <h2 className="text-xl font-bold">
            Tổng: {total.toLocaleString("vi-VN")} đ
          </h2>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
          >
            Thanh toán
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
