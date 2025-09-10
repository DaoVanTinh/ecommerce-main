import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">📦 Lịch sử đơn hàng</h1>

      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4 shadow-sm bg-white"
            >
              <h2 className="font-semibold">
                Đơn hàng #{order._id.slice(-6)} –{" "}
                <span className="text-blue-600">{order.status}</span>
              </h2>
              <p>Tổng tiền: {order.totalPrice} đ</p>
              <p>Ngày đặt: {new Date(order.createdAt).toLocaleString()}</p>
              <ul className="list-disc ml-6 mt-2">
                {order.products.map((item) => (
                  <li key={item._id}>
                    {item.productId?.name} x {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
