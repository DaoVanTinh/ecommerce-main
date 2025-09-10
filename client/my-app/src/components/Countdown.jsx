import { useState, useEffect } from "react";
import React from "react";

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  function getTimeLeft(date) {
    const diff = new Date(date) - new Date();
    return diff > 0 ? diff : 0;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[16px] font-normal text-[#141718]">
        Ưu đãi hết hạn trong:
      </p>
      <div className="flex gap-4">
        {[
          { label: "Ngày", value: days },
          { label: "Giờ", value: hours },
          { label: "Phút", value: minutes },
          { label: "Giây", value: seconds },
        ].map((block) => (
          <div
            key={block.label}
            className="flex flex-col items-center justify-center w-20 h-20 bg-white shadow-md transform transition-all duration-300 hover:scale-105"
          >
            <div className="text-3xl font-extrabold animate-pulse">
              {block.value}
            </div>
            <div className="text-sm tracking-wider">{block.label}</div>
          </div>
        ))}
      </div>
      <button className="w-[154px] py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer">
        Vào shop ngay
      </button>
    </div>
  );
}
