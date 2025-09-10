import React from "react";
import { NewsletterImg } from "../assets";
import { useNavigate } from "react-router-dom";

function Newsletter() {
  const navigate = useNavigate();

  return (
    <div className="banner">
      <div className="relative">
        <img className="w-full" src={NewsletterImg} alt="Newsletter" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[40px] font-medium mb-2">
            Tham gia bản tin của chúng tôi
          </p>
          <p className="text-[18px] font-normal mb-8">
            Đăng ký tài khoản để nhận ưu đãi, sản phẩm mới và khuyến mãi.
          </p>
          <button
            className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Đăng ký ngay
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
