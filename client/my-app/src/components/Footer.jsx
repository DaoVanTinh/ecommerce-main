import React from "react";
import LogoWhite from "../assets/logo-white.png";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#141718]">
      <div className="ml-40 mr-40">
        <div className="flex justify-between pt-20 pb-10">
          <div className="flex items-center justify-center gap-8">
            <img src={LogoWhite} alt="Logo" />
            <div className="w-px h-8 bg-[#6C7275]"></div>
            <p className="text-[#E8ECEF] text-[14px] font-normal">
              Headphone Store
            </p>
          </div>
          <ul className="text-[#FEFEFE] flex justify-between gap-10 text-[14px] font-normal">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">Product</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="flex justify-between">
          <div className="text-[12px] flex gap-7">
            <p className="text-[#E8ECEF] font-normal">
              Copyright © 2025 3legant. All rights reserved
            </p>
            <p className="text-[#FEFEFE] font-bold">Privacy Policy</p>
            <p className="text-[#FEFEFE] font-bold">Terms of Use</p>
          </div>
          <div className="text-white flex gap-6 pb-12">
            <Instagram />
            <Facebook />
            <Youtube />
          </div>
        </div>
      </div>
    </footer>
  );
}
