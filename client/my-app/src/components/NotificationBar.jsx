import React from "react";
import Ticket from "../assets/ticket.png";
import { ArrowRight } from "lucide-react";
import { X } from "lucide-react";

function NotificationBar() {
  return (
    <div className="relative flex items-center bg-[#141718]">
      <div className="mx-auto flex items-center mt-2 mb-2">
        <div className="flex items-center">
          <img className="mr-3" src={Ticket} alt="Ticket" />
          <span className="text-white font-semibold text-sm mr-3">
            Giảm giá 30% toàn bộ cửa hàng — Thời gian có hạn!
          </span>
        </div>
        <button className="text-[#FFAB00] flex cursor-pointer">
          <div className="flex items-center">
            <span>Mua ngay</span>
            <div className="ml-1">
              <ArrowRight size={18} />
            </div>
          </div>
        </button>
      </div>
      <div className="absolute right-4 cursor-pointer text-[#343839]">
        <X size={20} />
      </div>
    </div>
  );
}

export default NotificationBar;
