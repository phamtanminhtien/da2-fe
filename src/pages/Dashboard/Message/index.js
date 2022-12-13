import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showTopMenu } from "../../../store/top-menu";

function Message() {
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
  return (
    <div className="flex-1 flex justify-between flex-col">Message screen</div>
  );
}

export default Message;
