import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { baseURL } from "../../../../constants";
import { showTopMenu } from "../../../../store/top-menu";
// import { camerasAPIDefault } from "../../Home";
import dayjs from "dayjs";
import Popup from "reactjs-popup";
import {
  deleteCamera,
  getCamera,
  updateCamera,
} from "../../../../service/cameraService";
import { getImage } from "../../../../service/imageService";

// (0=Angry, 1=Disgust, 2=Fear, 3=Happy, 4=Sad, 5=Surprise, 6=Neutral)
const emotionsAPI = [
  {
    value: 0,
    label: "😡 Angry",
  },
  {
    value: 1,
    label: "🤢 Disgust",
  },
  {
    value: 2,
    label: "😨 Fear",
  },
  {
    value: 3,
    label: "😊 Happy",
  },
  {
    value: 4,
    label: "🥺 Sad",
  },
  {
    value: 5,
    label: "😯 Surprise",
  },
  {
    value: 6,
    label: "😐 Neutral",
  },
];

let socket;

function Monitor() {
  let { id } = useParams();

  const dispatch = useDispatch();
  const [cameraAPI, setCameraAPI] = useState({});

  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);

  const [alarm, setAlarm] = useState({
    alarm: "",
    toggle: false,
  });

  useEffect(() => {
    loadImages();
  }, [page, size]);

  const loadImages = async () => {
    try {
      const res = await getImage({ camera_id: id, page: page, size: size });
      setImages(res.data.images);
      setTotalImages(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        const res = await getCamera(id);
        setCameraAPI(res.data);
      })();
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      if (alarm.alarm === "") return;
      (async () => {
        await updateCamera(id, {
          alarm_at: alarm.alarm,
          alarm_status: alarm.toggle,
        });
      })();
    } catch (error) {
      console.log(error);
    }
  }, [alarm, id]);

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

  const onHandlerDeleteCamera = async () => {
    try {
      await deleteCamera(id);
      window.location.href = "/dashboard/home";
    } catch (error) {
      console.log(error);
    }
  };

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
    //get camera alarm by id
    (async () => {
      try {
        const res = await getCamera(id);
        setAlarm({
          alarm: res.data.alarm_at,
          toggle: res.data.alarm_status,
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

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
        ...data,
        background: `data:image/jpg;base64,${data}`,
      });
      loadImages();
    });

    socket.on("alarm", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [cameraAPI, alarm]);

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
              emotionsAPI?.find(
                (emotion) => emotion.value === images[1]?.emotion
              )?.label
            }
          </div>
          <div className="text-3xl font-bold text-black">
            {
              emotionsAPI?.find(
                (emotion) => emotion.value === cameraAPI.emotion
              )?.label
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
                        images.map((image) => {
                          return (
                            <li className="flex items-center justify-between px-3">
                              {
                                emotionsAPI?.find(
                                  (emotion) => emotion.value === image.emotion
                                )?.label
                              }
                              <span>
                                {dayjs(image.created_at).format(
                                  "DD/MM/YYYY HH:mm"
                                )}
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
                width="20"
                height="24"
                viewBox="0 0 20 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.43742 21C5.0902 21 4.79506 20.8542 4.552 20.5625C4.30895 20.2708 4.18742 19.9167 4.18742 19.5V5.25H3.33325V3.75H7.24992V3H12.7499V3.75H16.6666V5.25H15.8124V19.5C15.8124 19.9 15.6874 20.25 15.4374 20.55C15.1874 20.85 14.8958 21 14.5624 21H5.43742ZM14.5624 5.25H5.43742V19.5H14.5624V5.25ZM7.64575 17.35H8.89575V7.375H7.64575V17.35ZM11.1041 17.35H12.3541V7.375H11.1041V17.35ZM5.43742 5.25V19.5V5.25Z"
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
                Are you sure you want to delete this camera?
              </div>
              <div className="content flex h-20 w-full items-center justify-center gap-20 p-5">
                <button
                  className="button rounded bg-[#FF406E] py-2 px-4 font-bold text-white"
                  onClick={() => {
                    close();
                  }}
                >
                  No
                </button>
                <button
                  className="button rounded border border-[#FF406E] bg-white py-2 px-4 font-bold text-[#FF406E]"
                  onClick={onHandlerDeleteCamera}
                >
                  Yes
                </button>
              </div>
            </div>
          )}
        </Popup>

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
                  type="datetime-local"
                  onChange={onHandlerSetAlarm}
                  value={dayjs(alarm.alarm).format("YYYY-MM-DD HH:mm:ss")}
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
