import React from "react";
import { AiOutlineCopyright } from "react-icons/ai";
const Footer = () => {
  return (
    <div className="text-white pb-5 text-center">
      <div className="flex items-center justify-center text-sm mb-2">
        <AiOutlineCopyright className="ml-2" />
        <h1 className="text-sm">
          2023 <a className="text-xl text-blue-600">React Movies,</a> ALL Rights
          Reserved
        </h1>
      </div>
      <p className="text-sm text-red-600">About Us Terms of Use Privacy</p>
    </div>
  );
};

export default Footer;
