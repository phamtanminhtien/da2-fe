import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../../store/top-menu";

const cameraInfo = [
  {
    id: 1,
    name: "CAM 1",
    status: true,
    background:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-ideas-white-palette-1639423211.jpg",
  },
  {
    id: 2,
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
    <div className="p-10 mt-32 flex-1 flex flex-row justify-start items-start flex-wrap gap-8">
      {cameraInfo.map((camera, index) => {
        console.log(camera);
        return (
          <div
            cameraId={camera.id}
            className="w-[360px] h-[240px] border-2 border-[#FF406E] rounded-lg bg-cover"
            style={{
              backgroundImage: `url(${camera.background})`,
            }}
          >
            <div className="p-2 flex flex-row  items-center gap-2">
              <div
                className={
                  camera.status
                    ? "w-2.5 h-2.5 bg-green-500 rounded-full"
                    : "w-2.5 h-2.5 bg-red-500 rounded-full"
                }
              ></div>
              <div className="text-sm text-black font-bold">{camera.name}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
