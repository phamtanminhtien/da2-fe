import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../../store/top-menu";
import io from "socket.io-client";
import { baseURL } from "../../../constants";
import axios from "../../../axios-config";
import Popup from "reactjs-popup";

let socket;
function Home() {
  const [camerasAPI, setCamerasAPI] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const onHandlerAddCamera = async (e) => {
    // e.preventDefault();
    const camera = {
      id: e.target[0].value,
      name: e.target[1].value,
      data: "",
    };

    await axios.post(`/camera/`, camera);
  };

  useEffect(() => {
    dispatch(
      showTopMenu({
        title: "Home",
        back: true,
        leftText: "",
        leftLink: "/",
        rightText: "",
      })
    );
  });

  useEffect(() => {
    (async () => {
      const result = await axios.get("/camera");
      setCamerasAPI(result.data);
    })();
  }, []);

  useEffect(() => {
    socket = io(`${baseURL}/client`, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("image", (data) => {
      setCamerasAPI(
        camerasAPI.map((i) => ({
          ...i,
          background: `data:image/jpg;base64,${data}`,
        }))
      );
    });
    return () => {
      socket.disconnect();
    };
  }, [camerasAPI]);

  return (
    <div className="mt-32 flex flex-1 flex-row flex-wrap items-start justify-start gap-8 p-10">
      <Popup
        className="h-full w-full"
        trigger={
          <div className="flex h-[80px] w-full max-w-[360px] cursor-pointer items-center justify-center rounded-lg border-2 bg-[#FF406E]">
            {" "}
            <button className="button">
              <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
                <path
                  fill="#FFFFFF"
                  d="M24.15 34q.65 0 1.075-.425.425-.425.425-1.075v-6.8h6.9q.6 0 1.025-.425Q34 24.85 34 24.2q0-.65-.425-1.075-.425-.425-1.075-.425h-6.85v-7.25q0-.6-.425-1.025Q24.8 14 24.15 14q-.65 0-1.075.425-.425.425-.425 1.075v7.2h-7.2q-.6 0-1.025.425Q14 23.55 14 24.2q0 .65.425 1.075.425.425 1.075.425h7.15v6.85q0 .6.425 1.025Q23.5 34 24.15 34ZM24 44q-4.25 0-7.9-1.525-3.65-1.525-6.35-4.225-2.7-2.7-4.225-6.35Q4 28.25 4 24q0-4.2 1.525-7.85Q7.05 12.5 9.75 9.8q2.7-2.7 6.35-4.25Q19.75 4 24 4q4.2 0 7.85 1.55Q35.5 7.1 38.2 9.8q2.7 2.7 4.25 6.35Q44 19.8 44 24q0 4.25-1.55 7.9-1.55 3.65-4.25 6.35-2.7 2.7-6.35 4.225Q28.2 44 24 44Zm0-20Zm0 17q7 0 12-5t5-12q0-7-5-12T24 7q-7 0-12 5T7 24q0 7 5 12t12 5Z"
                />
              </svg>
            </button>
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
              Add camera
            </div>
            <div className="content flex h-40 w-full items-center justify-between p-5">
              <form
                className="flex h-full w-full flex-col gap-5"
                onSubmit={onHandlerAddCamera}
              >
                <div>
                  <input
                    required
                    type="text"
                    placeholder="Camera id"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#FF406E] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Camera name"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-[#FF406E] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <button
                    className="rounded-full bg-[#FF406E] p-2"
                    type="submit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48"
                      width="48"
                    >
                      <path
                        fill="#FFF"
                        d="M18.9 35.1q-.3 0-.55-.1-.25-.1-.5-.35L8.8 25.6q-.45-.45-.45-1.1 0-.65.45-1.1.45-.45 1.05-.45.6 0 1.05.45l8 8 18.15-18.15q.45-.45 1.075-.45t1.075.45q.45.45.45 1.075T39.2 15.4L19.95 34.65q-.25.25-.5.35-.25.1-.55.1Z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </Popup>

      {camerasAPI.map((camera, index) => {
        console.log(camera);
        return (
          <div
            onClick={() => history.push(`/dashboard/monitor/${camera.id}`)}
            cameraId={camera.id}
            className="h-[240px] w-full max-w-[360px] cursor-pointer rounded-lg border-2 border-[#FF406E] bg-cover"
            style={{
              backgroundImage: `url(data:image/jpg;base64,${camera.data})`,
            }}
          >
            <div className="flex flex-row items-center  gap-2 p-2">
              <div
                className={
                  camera.status
                    ? "h-2.5 w-2.5 rounded-full bg-green-500"
                    : "h-2.5 w-2.5 rounded-full bg-red-500"
                }
              ></div>
              <div className="text-sm font-bold text-black">{camera.name}</div>
            </div>
          </div>
        );
      })}

      <div className="flex h-[50px] w-full max-w-[360px]"></div>
    </div>
  );
}

export default Home;
