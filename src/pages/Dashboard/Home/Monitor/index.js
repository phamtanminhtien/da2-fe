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
    <div className="p-10 mt-32 flex-1 flex flex-row justify-start flex-wrap gap-8">
      Monitor screen
    </div>
  );
}

export default Monitor;
