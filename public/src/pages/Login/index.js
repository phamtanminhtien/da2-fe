import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { showTopMenu } from "../../store/top-menu";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState({
    username: true,
    password: true,
  });

  const onHandlerUsername = (e) => {
    setAccount({ ...account, username: e.target.value });
    setValid({ ...valid, username: true });
  };

  const onHandlerPassword = (e) => {
    setAccount({ ...account, password: e.target.value });
    setValid({ ...valid, password: true });
  };

  const onHandlerSubmitted = () => {
    console.log(
      "username: " + account.username + " password: " + account.password
    );

    if (account.username && account.password) {
      console.log("Submitted");
      setSubmitted(true);
      history.push("/dashboard/home");
    } else if (!account.username && !account.password) {
      setValid({ username: false, password: false });
    } else {
      if (!account.username) {
        console.log("username is empty ");
        setValid({ ...valid, username: false });
      }
      if (!account.password) {
        setValid({ ...valid, password: false });
      }
    }
  };

  useEffect(() => {
    dispatch(
      showTopMenu({
        title: "Sign In",
        back: true,
        leftText: "",
        leftLink: "/",
        rightText: "Sign Up",
        rightLink: "/signup",
      })
    );
  });
  return (
    <div className="mt-32 p-8 flex-1 flex flex-col">
      <h1 className="text-6xl font-bold">
        Sign in
        <br />
        to T2Study
      </h1>
      <div className="">
        <input
          className="w-full p-4 mt-8 border border-gray-300 rounded focus:outline-none focus:border-gray-500 bg-gray-300 placeholder-shown:bg-white"
          placeholder="Email"
          onChange={onHandlerUsername}
        />
        {!valid.username && !submitted ? (
          <p className="pt-1 text-xs text-red-600">Please input username</p>
        ) : null}
        <input
          className="w-full p-4 mt-8 border border-gray-300 rounded focus:outline-none focus:border-gray-500 bg-gray-300 placeholder-shown:bg-white"
          placeholder="Password"
          onChange={onHandlerPassword}
        />
        {!valid.password && !submitted ? (
          <p className="pt-1 text-xs text-red-600">Please input password</p>
        ) : null}
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div
          className="w-24 h-24 bg-gray-300 rounded-full flex justify-center items-center"
          onClick={onHandlerSubmitted}
        >
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

export default Login;
