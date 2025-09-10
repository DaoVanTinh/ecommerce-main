import React from "react";
import { Car } from "lucide-react";
import { CircleDollarSign } from "lucide-react";
import { Lock } from "lucide-react";
import { Phone } from "lucide-react";

function Value() {
  return (
    <div className="flex justify-between mt-10 mb-10 mx-[160px] gap-6">
      <div className="bg-[#F3F5F7] h-[220px] flex flex-col justify-center rounded w-full pl-8">
        <div>
          <Car className="mb-4" size={48} />
        </div>
        <div>
          <p className="text-[#141718] text-[20px] font-medium mb-2">
            Vận chuyển miễn phí
          </p>
          <p className="text-[#6C7275] text-[12px]">Đơn hàng trên 200k VNĐ</p>
        </div>
      </div>
      <div className="bg-[#F3F5F7] h-[220px] flex flex-col justify-center rounded w-full pl-8">
        <div>
          <CircleDollarSign className="mb-4" size={48} />
        </div>
        <div>
          <p className="text-[#141718] text-[20px] font-medium mb-2">
            Hoàn tiền
          </p>
          <p className="text-[#6C7275] text-[12px]">
            Bảo hành / cam kết trong 30 ngày
          </p>
        </div>
      </div>
      <div className="bg-[#F3F5F7] h-[220px] flex flex-col justify-center rounded w-full pl-8">
        <div>
          <Lock className="mb-4" size={48} />
        </div>
        <div>
          <p className="text-[#141718] text-[20px] font-medium mb-2">
            Thanh toán an toàn
          </p>
          <p className="text-[#6C7275] text-[12px]">Được bảo mật bởi Tinhpro</p>
        </div>
      </div>
      <div className="bg-[#F3F5F7] h-[220px] flex flex-col justify-center rounded w-full pl-8">
        <div>
          <Phone className="mb-4" size={48} />
        </div>
        <div>
          <p className="text-[#141718] text-[20px] font-medium mb-2">
            Hỗ trợ 24/7
          </p>
          <p className="text-[#6C7275] text-[12px]">
            Hỗ trợ qua điện thoại và email
          </p>
        </div>
      </div>
    </div>
  );
}
export default Value;
