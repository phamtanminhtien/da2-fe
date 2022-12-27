import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { baseURL } from "../../../../constants";
import { showTopMenu } from "../../../../store/top-menu";
// import { camerasAPIDefault } from "../../Home";
import Popup from "reactjs-popup";
import axios from "../../../../axios-config";

const emotionsAPIDefault = [
  {
    timestamp: 1671808600000,
    emotion: "happy",
  },
  {
    timestamp: 1671808610000,
    emotion: "neutral",
  },
  {
    timestamp: 1671808620000,
    emotion: "angry",
  },
  {
    timestamp: 1671808630000,
    emotion: "sleepy",
  },
  {
    timestamp: 1671808640000,
    emotion: "happy",
  },
  {
    timestamp: 1671808650000,
    emotion: "neutral",
  },
  {
    timestamp: 1671808666000,
    emotion: "angry",
  },
  {
    timestamp: 1671808676000,
    emotion: "sleepy",
  },
  {
    timestamp: 1671808686417,
    emotion: "happy",
  },
  {
    timestamp: 1671708696417,
    emotion: "neutral",
  },
  {
    timestamp: 1671708696417,
    emotion: "neutral",
  },
  {
    timestamp: 1671708696417,
    emotion: "neutral",
  },
  {
    timestamp: 1671708696417,
    emotion: "neutral",
  },
  {
    timestamp: 1671708696417,
    emotion: "neutral",
  },
  {
    timestamp: 1671708696417,
    emotion: "neutral",
  },
];

const convertTimestamp = (timestamp) => {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime =
    "At " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
};

const convertEmotion = (emotion) => {
  switch (emotion) {
    case "happy":
      return "😊 Happy";
    case "neutral":
      return "😐 Neutral";
    case "angry":
      return "😡 Angry";
    case "sleepy":
      return "😴 Sleepy";
    default:
      return "😐 Neutral";
  }
};

let socket;

function Monitor() {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [cameraAPI, setCameraAPI] = useState({});

  const [alarm, setAlarm] = useState({
    alarm: "",
    toggle: false,
  });

  const onHandlerTakePhoto = () => {
    console.log(cameraAPI.data);
  };

  const onHandlerSetAlarm = (e) => {
    console.log(e.target.value);
    setAlarm({ ...alarm, alarm: e.target.value });
  };

  const onHandlerToggleAlarm = (e) => {
    if (alarm.alarm === "") return;
    setAlarm({ ...alarm, toggle: e.target.checked });
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/camera/${id}`);
      setCameraAPI(res.data);
    })();
  }, [id]);

  useEffect(() => {
    dispatch(
      showTopMenu({
        title: cameraAPI.camera_name,
        back: true,
        leftText: "home",
        leftLink: "/home",
        rightText: "",
      })
    );
  });

  useEffect(() => {
    socket = io(`${baseURL}/client`, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("image", (data) => {
      setCameraAPI({
        ...cameraAPI,
        background: `data:image/jpg;base64,${data}`,
      });
    });
    return () => {
      socket.disconnect();
    };
  }, [cameraAPI]);

  return (
    <div className="mt-32 flex flex-row flex-wrap justify-center gap-8 p-10">
      <div className="flex w-full max-w-[360px] flex-col gap-8">
        <div
          className="h-[240px] w-full cursor-pointer rounded-lg border-2 border-[#FF406E] bg-cover"
          style={{
            backgroundImage: `url(data:image/jpg;base64,${cameraAPI.data})`,
          }}
        >
          {/* Image from camera */}
        </div>

        <div className="flex w-full flex-row items-center justify-between">
          <div className="text-lg text-gray-800">
            {
              emotionsAPIDefault.sort((a, b) => b.timestamp - a.timestamp)[1]
                .emotion
            }
          </div>
          <div className="text-3xl font-bold text-black">
            {
              emotionsAPIDefault.sort((a, b) => b.timestamp - a.timestamp)[0]
                .emotion
            }
          </div>
          <div className="text-sm text-gray-400">
            <Popup
              className="cursor-pointer rounded-xl"
              trigger={<button className="button">History</button>}
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
                    History emotion
                  </div>
                  <div className="content max-h-96 overflow-y-scroll">
                    <ul className="flex max-w-md list-inside flex-col gap-3 space-y-1 text-gray-500 dark:text-gray-400">
                      {
                        //I want sort emotions by timestamp
                        emotionsAPIDefault
                          .sort((a, b) => b.timestamp - a.timestamp)
                          .map((emotion) => {
                            return (
                              <li className="flex items-center justify-between px-3">
                                {convertEmotion(emotion.emotion)}
                                <span>
                                  {convertTimestamp(emotion.timestamp)}
                                </span>
                              </li>
                            );
                          })
                      }
                    </ul>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </div>

      <div className="fixed bottom-24 left-0 right-0 flex h-20 items-center justify-between bg-white px-10 py-2">
        <div className="cursor-pointer" onClick={onHandlerTakePhoto}>
          <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48">
            <path
              fill="#ACAAAA"
              d="M24 17.9h15.95q-1.4-3.7-4.45-6.525Q32.45 8.55 28.55 7.5l-5.2 9.3q-.25.4 0 .75t.65.35Zm-6.6 3.05q.25.4.65.4t.65-.4L26.75 7.1q-.6-.05-1.35-.075Q24.65 7 24 7q-3.6 0-6.6 1.3-3 1.3-5.4 3.6Zm-9.9 7.4h10.55q.4 0 .65-.35t0-.75L10.85 13.2q-1.9 2.25-2.875 5.025Q7 21 7 24q0 1.05.1 2.2.1 1.15.4 2.15Zm12 12.1 5.35-9.2q.25-.4.025-.775T24.2 30.1H8.1q1.4 3.7 4.425 6.525T19.5 40.45ZM24 41q3.6 0 6.625-1.3T36 36.1l-5.35-9.05q-.2-.4-.625-.4t-.675.4l-8.1 13.85q.65.05 1.375.075Q23.35 41 24 41Zm13.2-6.2q1.7-2.1 2.75-4.95T41 24q0-1.1-.1-2.225t-.35-2.175H30q-.4 0-.675.35t-.025.75ZM24 24Zm0 20q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.775t4.3-6.35q2.725-2.725 6.375-4.3Q19.9 4 24 4q4.15 0 7.775 1.575t6.35 4.3q2.725 2.725 4.3 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.3 6.375-2.725 2.725-6.35 4.3Q28.15 44 24 44Z"
            />
          </svg>
        </div>

        <Popup
          className="cursor-pointer rounded-xl"
          trigger={
            <button className="button">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.95 43.9C21.4833 43.9 19.1583 43.4333 16.975 42.5C14.7917 41.5667 12.8917 40.2917 11.275 38.675C9.65833 37.0583 8.375 35.1583 7.425 32.975C6.475 30.7917 6 28.45 6 25.95C6 23.4833 6.475 21.1583 7.425 18.975C8.375 16.7917 9.65833 14.8833 11.275 13.25C12.8917 11.6167 14.7917 10.3333 16.975 9.4C19.1583 8.46667 21.4833 8 23.95 8C26.4167 8 28.7417 8.46667 30.925 9.4C33.1083 10.3333 35.0167 11.6167 36.65 13.25C38.2833 14.8833 39.5667 16.7917 40.5 18.975C41.4333 21.1583 41.9 23.4833 41.9 25.95C41.9 28.45 41.4333 30.7917 40.5 32.975C39.5667 35.1583 38.2833 37.0583 36.65 38.675C35.0167 40.2917 33.1083 41.5667 30.925 42.5C28.7417 43.4333 26.4167 43.9 23.95 43.9ZM30 34.1L32.1 32L25.6 25.5V16H22.6V26.7L30 34.1ZM10.7 4.65L12.8 6.75L4.6 14.65L2.5 12.55L10.7 4.65ZM37.2 4.65L45.4 12.55L43.3 14.65L35.1 6.75L37.2 4.65ZM23.95 40.9C28.1167 40.9 31.65 39.45 34.55 36.55C37.45 33.65 38.9 30.1167 38.9 25.95C38.9 21.7833 37.45 18.25 34.55 15.35C31.65 12.45 28.1167 11 23.95 11C19.7833 11 16.25 12.45 13.35 15.35C10.45 18.25 9 21.7833 9 25.95C9 30.1167 10.45 33.65 13.35 36.55C16.25 39.45 19.7833 40.9 23.95 40.9Z"
                  fill="#ACAAAA"
                />
              </svg>
            </button>
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
                Set alarm
              </div>
              <div className="content flex h-20 w-full items-center justify-between p-5">
                <input
                  type="time"
                  onChange={onHandlerSetAlarm}
                  value={alarm.alarm}
                ></input>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={alarm.toggle}
                    className="peer sr-only"
                    onChange={onHandlerToggleAlarm}
                  />
                  <div className="peer-focus:ring-red-40000 peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-0.5 after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-4 dark:border-gray-400 dark:bg-gray-400 dark:peer-focus:ring-red-600"></div>
                </label>
              </div>
            </div>
          )}
        </Popup>
      </div>
    </div>
  );
}

export default Monitor;
