import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { showTopMenu } from "../../../../store/top-menu";

function Monitor() {
  let { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      showTopMenu({
        title: "Monitor",
        back: true,
        leftText: "home",
        leftLink: "/home",
        rightText: "",
      })
    );
  });
  return (
    <div className="mt-32 flex flex-row flex-wrap justify-center gap-8 p-10">
      <div className="h-[240px] w-full max-w-[360px] cursor-pointer rounded-lg border-2 border-[#FF406E] bg-cover">
        {/* Image face */}
      </div>

      <div className="w-full">Happy</div>
    </div>
  );
}

export default Monitor;
