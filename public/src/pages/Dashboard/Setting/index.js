import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../../store/top-menu";
import avatarPng from "../../../assets/avatar.jpg";
import { logout } from "../../../../../src/store/auth";

function Setting() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      showTopMenu({
        title: "Setting",
        back: true,
        leftText: "home",
        leftLink: "/home",
        rightText: "",
      })
    );
  }, [dispatch]);

  return (
    <div className="mt-32 flex flex-col gap-4">
      <div className="flex items-center flex-col gap-2">
        <div className="w-36 h-36 bg-[#FF406E] rounded-full">
          <img src={avatarPng} className="rounded-full" alt="avatar"></img>
        </div>
        <h2 className="text-lg font-semibold text-[#FF406E]">Minh Tien</h2>
      </div>
      <div className="p-8 flex gap-5 border border-gray-100">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.625 23.25C2.125 23.25 1.6875 23.0625 1.3125 22.6875C0.9375 22.3125 0.75 21.875 0.75 21.375V2.625C0.75 2.125 0.9375 1.6875 1.3125 1.3125C1.6875 0.9375 2.125 0.75 2.625 0.75H11.7188V2.625H2.625V21.375H11.7188V23.25H2.625ZM17.8125 17.4688L16.4688 16.125L19.6562 12.9375H8.71875V11.0625H19.5938L16.4062 7.875L17.75 6.53125L23.25 12.0312L17.8125 17.4688Z"
            fill="#ACAAAA"
          />
        </svg>

        <span
          onClick={(e) => {
            console.log("asd", e);
            dispatch(logout());
          }}
        >
          LogOut
        </span>
      </div>
    </div>
  );
}

export default Setting;
