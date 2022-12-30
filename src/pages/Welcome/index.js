import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { hideTopMenu } from "../../store/top-menu";
import logoT2s from "../../assets/logoT2s.png";

function Welcome() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideTopMenu());
  });

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col relative z-20">
        <div className="flex justify-center items-center flex-1">
          <div className="">
            <img src={logoT2s} alt="logoT2s" />
          </div>
        </div>
        <div className="flex-1 p-8 flex justify-end items-center flex-col gap-12 pb-20">
          <Link
            className="w-[90%] h-[70px] bg-[#FF406E] rounded-2xl flex items-center justify-center p-4 text-white text-lg shadow-xl"
            to={"/signin"}
          >
            Sign In
          </Link>
          <Link
            className="w-[90%] h-[70px] bg-[#ffffff] rounded-2xl flex items-center justify-center p-4 text-black text-lg shadow-xl"
            to={"/signup"}
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="fixed rounded-full w-72 h-72 bg-[#FF406E80] top-0 -translate-x-1/3 -translate-y-1/3 z-10"></div>

      <div className="fixed rounded-full w-[480px] h-[480px] border-[#FF406E80] border top-full right-0 translate-x-1/2 -translate-y-3/4 z-10"></div>
    </div>
  );
}

export default Welcome;
