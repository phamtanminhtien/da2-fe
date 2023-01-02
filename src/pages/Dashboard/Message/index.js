import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../../store/top-menu";
import { getAllCamera } from "../../../service/cameraService";
import { createMess, getMess } from "../../../service/messService";
import dayjs from "dayjs";

const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  let format = date.getHours() + ":" + date.getMinutes();
  return format;
};

const messages = [
  {
    timestamp: 1671183935,
    content: "Hi 123",
  },
  {
    timestamp: 1671183940,
    content:
      "Note that the development build is not optimized. To create a production build, use yarn build.",
  },
  {
    timestamp: 1671183945,
    content: "Hi 123",
  },
  {
    timestamp: 1671183950,
    content:
      "Note that the development build is not optimized. To create a production build, use yarn build.",
  },
  {
    timestamp: 1671183955,
    content: "Hi 123",
  },
  {
    timestamp: 1671183960,
    content:
      "Note that the development build is not optimized. To create a production build, use yarn build.",
  },
  {
    timestamp: 1671183965,
    content: "Hi 123",
  },
  {
    timestamp: 1671183970,
    content:
      "Note that the development build is not optimized. To create a production build, use yarn build.",
  },
];

function Message() {
  const [cameras, setCameras] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      showTopMenu({
        title: "Message",
        back: true,
        leftText: "home",
        leftLink: "/home",
        rightText: "",
      })
    );
  });
  const [camera, setCamera] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAllCamera();
        setCameras(data);
        setCamera(data[0].camera_id);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (camera) {
      loadMess();
    }
  }, [camera]);

  const loadMess = async () => {
    try {
      const { data } = await getMess({ camera_id: camera });
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await createMess({
        camera_id: camera,
        text: message,
      });
      setMessage("");
      loadMess();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-32 flex flex-1 flex-col justify-between p-5 ">
      <div className="fixed top-32 left-0 right-0 bg-white px-5 py-2">
        <form className="flex h-[60px] w-full items-center justify-center rounded-lg bg-[#D9D9D9] p-1">
          <div className="flex items-center justify-center pl-3 font-bold">
            Room ID
          </div>
          <select
            className="h-full flex-1 bg-[#D9D9D9] px-5 outline-none"
            onChange={(e) => {
              setCamera(e.target.value);
            }}
            value={camera}
          >
            {cameras &&
              cameras.map((camera) => {
                return (
                  <option
                    value={camera.camera_id}
                  >{`ID: ${camera.camera_id} - ${camera.camera_name}`}</option>
                );
              })}
          </select>
        </form>
      </div>

      <div className="mt-12 mb-32 flex h-full w-full flex-col items-end justify-start gap-4 p-2">
        {messages &&
          messages.map((message, index) => {
            return (
              <div className="gap-1">
                <div className="text-right text-xs text-gray-500">
                  {dayjs(message.create_at).format("DD/MM/YYYY HH:mm:ss")}
                </div>
                <div className="rounded-xl bg-[#D9D9D9] bg-opacity-40 px-5 py-2 text-right">
                  {message.text}
                </div>
              </div>
            );
          })}
      </div>

      <div className="fixed bottom-24 left-0 right-0 bg-white px-5 py-2">
        <form
          className="flex h-[60px] w-full rounded-lg border-[#FF406E] border-opacity-30 bg-[#D9D9D9] p-1 hover:border-2"
          onSubmit={handleSubmit}
        >
          <input
            className="h-full flex-1 bg-[#D9D9D9] pl-3 outline-none"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button className="flex items-center justify-center p-3">
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.0607 13.0607C21.6464 12.4749 21.6464 11.5251 21.0607 10.9393L11.5147 1.3934C10.9289 0.807611 9.97919 0.807611 9.3934 1.3934C8.80761 1.97919 8.80761 2.92893 9.3934 3.51472L17.8787 12L9.3934 20.4853C8.80761 21.0711 8.80761 22.0208 9.3934 22.6066C9.97919 23.1924 10.9289 23.1924 11.5147 22.6066L21.0607 13.0607ZM0 13.5H20V10.5H0V13.5Z"
                fill="white"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Message;
