import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { hideTopMenu } from "../../store/top-menu";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideTopMenu());
  });

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full flex-col relative z-20">
        <div className="flex justify-center items-center flex-1">
          <div className="">T2Study ❤️</div>
        </div>
        <div className="flex-1 p-8 flex justify-end flex-col gap-4">
          <Link
            className="w-full bg-[#FF406E] rounded-2xl text-center p-4 text-white text-base shadow-xl"
            to={"/login"}
          >
            Sign In
          </Link>
          <Link
            className="w-full rounded-2xl text-center p-4 text-base shadow-xl bg-white"
            to={"/register"}
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="fixed rounded-full w-72 h-72 bg-[#FF406E80] top-0 -translate-x-1/3 -translate-y-1/3 z-10"></div>

      <div className="fixed rounded-full w-72 h-72 border-[#FF406E80] border top-full right-0 translate-x-1/2 -translate-y-1/2 z-10"></div>
    </div>
  );
}

export default Home;
