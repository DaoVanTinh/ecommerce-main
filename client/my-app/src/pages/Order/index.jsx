import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar, NotificationBar, Footer } from "../../components";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để xem đơn hàng!");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setOrders(data);
        } else {
          alert(data.error || "Không thể tải đơn hàng");
        }
      } catch (err) {
        console.error(err);
        alert("Lỗi kết nối server!");
      }
    };

    fetchOrders();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NotificationBar />
      <NavigationBar className="!bg-white" />

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          📦 Lịch sử đơn hàng
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border rounded-lg shadow-sm p-6"
              >
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                  <h2 className="font-semibold text-lg">
                    Đơn hàng #{order._id.slice(-6)}
                  </h2>
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-500"
                        : order.status === "completed"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">
                  Ngày đặt: {new Date(order.order_date).toLocaleString()}
                </p>
                <p className="text-gray-800 font-semibold mb-4">
                  Tổng tiền: {order.total_amount.toLocaleString("vi-VN")} đ
                </p>

                <ul className="divide-y divide-gray-200">
                  {order.items?.map((item) => (
                    <li
                      key={item._id}
                      className="flex justify-between items-center py-3"
                    >
                      <div>
                        <p className="font-medium">{item.product_id?.name}</p>
                        <p className="text-gray-500 text-sm">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold">
                        {(item.price * item.quantity).toLocaleString("vi-VN")} đ
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
