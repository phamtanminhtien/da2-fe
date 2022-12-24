import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../store/top-menu";
import { register } from "../../service/authService";

function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [valid, setValid] = useState({});

  const onHandlerUsername = (e) => {
    setAccount({ ...account, username: e.target.value });
    setValid({ ...valid, username: undefined });
  };

  const onHandlerPassword = (e) => {
    setAccount({ ...account, password: e.target.value });
    setValid({ ...valid, password: undefined });
  };

  const onHandlerConfirmPassword = (e) => {
    setAccount({ ...account, confirmPassword: e.target.value });
    setValid({ ...valid, confirmPassword: undefined });
  };

  const validConfimPassword = (pass, confirmPass) => {
    if (pass === confirmPass) {
      return true;
    } else {
      setValid({ ...valid, confirmPassword: "Invalid confirm password" });
      return false;
    }
  };

  const onHandlerSubmitted = async () => {
    if (account.username && account.password) {
      if (!validConfimPassword(account.password, account.confirmPassword))
        return;
      try {
        const res = await register(account);
        console.log(res.data);
        history.push("/signin");
      } catch (error) {
        setValid({
          username: "Invalid username",
          password: "Invalid password",
        });
        console.log(error);
      }
      // history.push("/dashboard/home");
    } else if (
      !account.username &&
      !account.password &&
      !account.confirmPassword
    ) {
      setValid({
        username: "Please input username",
        password: "Please input password",
        confirmPassword: "Please input confirm password",
      });
    } else {
      if (!account.username) {
      }
      if (!account.password) {
        setValid({ ...valid, password: "Please input password" });
      }
    }
  };

  useEffect(() => {
    dispatch(
      showTopMenu({
        title: "Sign Up",
        back: true,
        leftText: "",
        leftLink: "/",
        rightText: "Sign In",
        rightLink: "/signin",
      })
    );
  });
  return (
    <div className="mt-32 flex flex-1 flex-col p-8">
      <h1 className="text-6xl font-bold">
        Sign in
        <br />
        to T2Study
      </h1>
      <div className="">
        <input
          className="mt-8 w-full rounded border border-gray-300 bg-gray-300 p-4 placeholder-shown:bg-white focus:border-gray-500 focus:outline-none"
          placeholder="Email"
          onChange={onHandlerUsername}
        />
        {valid.username ? (
          <p className="pt-1 text-xs text-red-600">{valid.username}</p>
        ) : null}
        <input
          className="mt-8 w-full rounded border border-gray-300 bg-gray-300 p-4 placeholder-shown:bg-white focus:border-gray-500 focus:outline-none"
          placeholder="Password"
          onChange={onHandlerPassword}
        />
        {valid.password ? (
          <p className="pt-1 text-xs text-red-600">{valid.password}</p>
        ) : null}
        <input
          className="mt-8 w-full rounded border border-gray-300 bg-gray-300 p-4 placeholder-shown:bg-white focus:border-gray-500 focus:outline-none"
          placeholder="Confirm Password"
          onChange={onHandlerConfirmPassword}
        />
        {valid.confirmPassword ? (
          <p className="pt-1 text-xs text-red-600">{valid.confirmPassword}</p>
        ) : null}
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div
          className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-300"
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

export default Register;
