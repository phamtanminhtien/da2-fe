import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../../store/top-menu";

function Home() {
  const dispatch = useDispatch();
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
    <div className="p-10 flex-1 flex flex-row justify-start flex-wrap gap-8">
      <div
        className="w-[360px] h-[240px] border-2 border-[#FF406E] rounded-lg bg-cover"
        style={{
          backgroundImage:
            "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-ideas-white-palette-1639423211.jpg)",
        }}
      >
        <div className="p-2 flex flex-row  items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          <div className="text-sm text-black font-bold">CAMERA 1</div>
        </div>
      </div>
      <div
        className="w-[360px] h-[240px] border-2 border-[#FF406E] rounded-lg bg-cover"
        style={{
          backgroundImage:
            "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-ideas-white-palette-1639423211.jpg)",
        }}
      >
        <div className="p-2 flex flex-row  items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          <div className="text-sm text-black font-bold">CAMERA 1</div>
        </div>
      </div>
      <div
        className="w-[360px] h-[240px] border-2 border-[#FF406E] rounded-lg bg-cover"
        style={{
          backgroundImage:
            "url(https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/living-room-ideas-white-palette-1639423211.jpg)",
        }}
      >
        <div className="p-2 flex flex-row  items-center gap-2">
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
          <div className="text-sm text-black font-bold">CAMERA 1</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
