import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import avatarPng from "../../../assets/avatar.jpg";
import axios from "../../../axios-config";
import { logout } from "../../../store/auth";
import { showTopMenu } from "../../../store/top-menu";

function Setting() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(avatarPng);

  const onHandlerChangeAvatar = (e) => {
    //convert avatar to base64 string
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setAvatar(reader.result);
    };
  };

  const onHandlerUpdateProfile = async (e) => {
    e.preventDefault();

    let userProfile = {};

    if (e.target[0].value !== "") {
      userProfile.avatar = avatar;
    }

    if (e.target[2].value !== "" && e.target[2].value === e.target[3].value) {
      userProfile.password = e.target[2].value;
    }

    const result = await axios.put("auth/profile", userProfile);
    console.log(result);
  };

  useEffect(() => {
    (async () => {
      //axios get profile with jwt token
      const result = await axios.get("auth/profile");
      setAvatar(result.data.avatar);
    })();
  }, []);

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
  });
  return (
    <div className="mt-32 flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2">
        <div className="h-36 w-36 rounded-full bg-[#FF406E]">
          <img src={avatar} className="rounded-full" alt="avatar"></img>
        </div>
        <h2 className="text-lg font-semibold text-[#FF406E]">{user?.name}</h2>
      </div>

      <Popup
        className="cursor-pointer rounded-xl"
        trigger={
          <div className="flex cursor-pointer gap-5 border border-gray-100 p-8">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.25 14.525L18.475 12.75L19.2 12.025C19.3333 11.8917 19.5083 11.825 19.725 11.825C19.9417 11.825 20.1167 11.8917 20.25 12.025L20.975 12.75C21.1083 12.8833 21.175 13.0583 21.175 13.275C21.175 13.4917 21.1083 13.6667 20.975 13.8L20.25 14.525ZM12 21V19.225L17.4 13.825L19.175 15.6L13.775 21H12ZM3 15.75V14.25H10.5V15.75H3ZM3 11.625V10.125H14.75V11.625H3ZM3 7.5V6H14.75V7.5H3Z"
                fill="#ACAAAA"
              />
            </svg>

            <span>Edit profile</span>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button
              className="close absolute top-[-10px] right-[-10px] flex h-8 w-8 items-center justify-center rounded-full bg-white p-4 text-xl text-[#FF406E] "
              onClick={close}
            >
              &times;
            </button>
            <div className="header p-2 text-lg font-bold text-[#FF406E]">
              Edit profile
            </div>
            <div className="content max-h-96 overflow-y-scroll">
              <form onSubmit={onHandlerUpdateProfile}>
                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    <img
                      className="h-16 w-16 rounded-full object-cover"
                      src={avatar}
                      alt="Current profile"
                    />
                  </div>
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      type="file"
                      className="block w-full text-sm text-slate-500
                                file:mr-4 file:rounded-full file:border-0
                                file:bg-violet-50 file:py-2
                                file:px-4 file:text-sm
                                file:font-semibold file:text-[#FF406E]
                                hover:file:bg-violet-100
                              "
                      onChange={onHandlerChangeAvatar}
                    />
                  </label>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-semibold text-[#FF406E]">
                      Change password
                    </label>
                    <input
                      type="password"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#FF406E] focus:bg-white focus:outline-none"
                      placeholder="Old password"
                    />
                    <input
                      type="password"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#FF406E] focus:bg-white focus:outline-none"
                      placeholder="New password"
                    />
                    <input
                      type="password"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#FF406E] focus:bg-white focus:outline-none"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      className="rounded-md bg-[#FF406E] p-2 text-sm text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>

      <Popup
        className="cursor-pointer rounded-xl"
        trigger={
          <div className="flex cursor-pointer gap-5 border border-gray-100 p-8">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 14C18.7833 14 18.6042 13.9292 18.4625 13.7875C18.3208 13.6458 18.25 13.4667 18.25 13.25V10.75H15.75C15.5333 10.75 15.3542 10.6792 15.2125 10.5375C15.0708 10.3958 15 10.2167 15 10C15 9.78334 15.0708 9.60417 15.2125 9.46251C15.3542 9.32084 15.5333 9.25001 15.75 9.25001H18.25V6.75001C18.25 6.53334 18.3208 6.35417 18.4625 6.21251C18.6042 6.07084 18.7833 6.00001 19 6.00001C19.2167 6.00001 19.3958 6.07084 19.5375 6.21251C19.6792 6.35417 19.75 6.53334 19.75 6.75001V9.25001H22.25C22.4667 9.25001 22.6458 9.32084 22.7875 9.46251C22.9292 9.60417 23 9.78334 23 10C23 10.2167 22.9292 10.3958 22.7875 10.5375C22.6458 10.6792 22.4667 10.75 22.25 10.75H19.75V13.25C19.75 13.4667 19.6792 13.6458 19.5375 13.7875C19.3958 13.9292 19.2167 14 19 14ZM9 11.975C7.9 11.975 7 11.625 6.3 10.925C5.6 10.225 5.25 9.32501 5.25 8.22501C5.25 7.12501 5.6 6.22501 6.3 5.52501C7 4.82501 7.9 4.47501 9 4.47501C10.1 4.47501 11 4.82501 11.7 5.52501C12.4 6.22501 12.75 7.12501 12.75 8.22501C12.75 9.32501 12.4 10.225 11.7 10.925C11 11.625 10.1 11.975 9 11.975V11.975ZM1.75 20C1.53333 20 1.35417 19.9292 1.2125 19.7875C1.07083 19.6458 1 19.4667 1 19.25V17.65C1 17.0667 1.15 16.5375 1.45 16.0625C1.75 15.5875 2.16667 15.2333 2.7 15C3.95 14.45 5.0625 14.0625 6.0375 13.8375C7.0125 13.6125 8 13.5 9 13.5C10 13.5 10.9875 13.6125 11.9625 13.8375C12.9375 14.0625 14.0417 14.45 15.275 15C15.8083 15.25 16.2292 15.6083 16.5375 16.075C16.8458 16.5417 17 17.0667 17 17.65V19.25C17 19.4667 16.9292 19.6458 16.7875 19.7875C16.6458 19.9292 16.4667 20 16.25 20H1.75ZM2.5 18.5H15.5V17.65C15.5 17.3833 15.4333 17.1292 15.3 16.8875C15.1667 16.6458 14.9583 16.4667 14.675 16.35C13.5083 15.7833 12.5125 15.4167 11.6875 15.25C10.8625 15.0833 9.96667 15 9 15C8.03333 15 7.1375 15.0875 6.3125 15.2625C5.4875 15.4375 4.48333 15.8 3.3 16.35C3.05 16.4667 2.85417 16.6458 2.7125 16.8875C2.57083 17.1292 2.5 17.3833 2.5 17.65V18.5ZM9 10.475C9.65 10.475 10.1875 10.2625 10.6125 9.83751C11.0375 9.41251 11.25 8.87501 11.25 8.22501C11.25 7.57501 11.0375 7.03751 10.6125 6.61251C10.1875 6.18751 9.65 5.97501 9 5.97501C8.35 5.97501 7.8125 6.18751 7.3875 6.61251C6.9625 7.03751 6.75 7.57501 6.75 8.22501C6.75 8.87501 6.9625 9.41251 7.3875 9.83751C7.8125 10.2625 8.35 10.475 9 10.475Z"
                fill="#ACAAAA"
              />
            </svg>

            <span>Add user</span>
          </div>
        }
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button
              className="close absolute top-[-10px] right-[-10px] flex h-8 w-8 items-center justify-center rounded-full bg-white p-4 text-xl text-[#FF406E] "
              onClick={close}
            >
              &times;
            </button>
            <div className="header p-2 text-lg font-bold text-[#FF406E]">
              Add user
            </div>
            <div className="content max-h-96 overflow-y-scroll"></div>
          </div>
        )}
      </Popup>

      <div
        className="flex cursor-pointer gap-5 border border-gray-100 p-8"
        onClick={() => {
          dispatch(logout());
        }}
      >
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

        <span>Sign out</span>
      </div>
    </div>
  );
}

export default Setting;
