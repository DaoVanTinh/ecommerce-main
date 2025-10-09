import React from "react";
import Logo from "../assets/logo.png";
import { ChevronDown, Search, CircleUserRound, Handbag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartProvider.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import { Dropdown } from "antd";

function NavigationBar({ className = "" }) {
  const navigate = useNavigate();
  const { cart, cartCount } = React.useContext(CartContext);
  const { user, logout } = useAuth();
  const items = user
    ? [
        { key: "profile", label: "Trang cá nhân" },
        { key: "orders", label: "Đơn hàng" },
        { key: "logout", label: "Đăng xuất" },
      ]
    : [
        { key: "login", label: "Đăng nhập" },
        { key: "register", label: "Đăng ký" },
      ];

  const handleMenuClick = (e) => {
    if (e.key === "login") navigate("/login");
    if (e.key === "register") navigate("/register");
    if (e.key === "profile") navigate("/profile");
    if (e.key === "orders") navigate("/orders");
    if (e.key === "logout") {
      logout();
      navigate("/");
    }
  };

  return (
    <div
      className={`flex justify-around pt-4 pb-4 bg-[#FFAB00]/64 ${className}`}
    >
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <img src={Logo} alt="Logo" />
      </div>

      <div className="flex gap-10 text-[#141718] text-sm font-medium items-center">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          Trang chủ
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/products")}
        >
          Cửa hàng
        </div>
        <div className="flex items-center">
          Sản phẩm <ChevronDown size={18} />
        </div>
        <div>Liên hệ</div>
      </div>

      <div className="flex">
        <div className="flex items-center mr-4">
          <Search size={24} />
        </div>
        <div className="flex items-center mr-4">
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            placement="bottomRight"
          >
            <div className="flex items-center cursor-pointer">
              {!user && <CircleUserRound size={24} />}
              {user && (
                <span className="ml-2 text-sm font-medium">
                  {user.username || "Người dùng"}
                </span>
              )}
            </div>
          </Dropdown>
        </div>

        <div className="flex items-center relative">
          <div
            className="mr-1 cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <Handbag size={24} />
          </div>
          {cart.length > 0 && (
            <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center absolute -right-2 -top-2">
              <span className="text-[#FFAB00] text-xs font-bold">
                {cartCount}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
