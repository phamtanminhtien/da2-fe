import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../store/top-menu";

function Register() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      showTopMenu({
        title: "Register",
        back: true,
        rightText: "Login",
        rightLink: "/login",
      })
    );
  });
  return (
    <div className="p-8 flex-1 flex flex-col">
      <h1 className="text-6xl font-bold">
        Sign in
        <br />
        to T2Study
      </h1>
      <div className="">
        <input
          className="w-full p-4 mt-8 border border-gray-300 rounded focus:outline-none focus:border-gray-500 bg-gray-300 placeholder-shown:bg-white"
          placeholder="Email"
        />
        <input
          className="w-full p-4 mt-8 border border-gray-300 rounded focus:outline-none focus:border-gray-500 bg-gray-300 placeholder-shown:bg-white"
          placeholder="Password"
        />
        <input
          className="w-full p-4 mt-8 border border-gray-300 rounded focus:outline-none focus:border-gray-500 bg-gray-300 placeholder-shown:bg-white"
          placeholder="Confirm Password"
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center">
          <svg
            width="42"
            height="38"
            viewBox="0 0 42 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.7678 20.7678C41.7441 19.7915 41.7441 18.2085 40.7678 17.2322L24.8579 1.32233C23.8816 0.34602 22.2986 0.34602 21.3223 1.32233C20.346 2.29864 20.346 3.88155 21.3223 4.85786L35.4645 19L21.3223 33.1421C20.346 34.1184 20.346 35.7014 21.3223 36.6777C22.2986 37.654 23.8816 37.654 24.8579 36.6777L40.7678 20.7678ZM-7.01723e-09 21.5L39 21.5L39 16.5L7.01723e-09 16.5L-7.01723e-09 21.5Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Register;
