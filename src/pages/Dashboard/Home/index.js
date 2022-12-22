import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../../store/top-menu";

const cameraInfo = [
  {
    id: "cam1",
    name: "CAM 1",
    status: true,
    background:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-ideas-white-palette-1639423211.jpg",
  },
  {
    id: "cam1",
    name: "CAM 2",
    status: false,
    background:
      "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcR1WzIrF5RQOhpJK1A_x9NO2apTwT_5M1QgdxOoyEXyjqoNoljv3Ar0R3AszC6MqXM2rrquxUv27Kso_Ru8fNs",
  },
];

function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
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
  return (
    <div className="mt-32 flex flex-1 flex-row flex-wrap items-start justify-start gap-8 p-10">
      {cameraInfo.map((camera, index) => {
        console.log(camera);
        return (
          <div
            onClick={() => history.push(`/dashboard/monitor/${camera.id}`)}
            cameraId={camera.id}
            className="h-[240px] w-[360px] cursor-pointer rounded-lg border-2 border-[#FF406E] bg-cover"
            style={{
              backgroundImage: `url(${camera.background})`,
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
    </div>
  );
}

export default Home;
