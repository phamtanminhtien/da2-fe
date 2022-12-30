import React from "react";
import { Link, useHistory } from "react-router-dom";

function Menu({ data }) {
  const history = useHistory();

  return (
    <div className="fixed top-0 left-0  right-0 w-full h-32 items-center flex p-8 justify-between bg-white">
      <div
        className="rounded-full bg-gray-300 w-12 h-12 flex justify-center items-center"
        onClick={() => {
          if (data.leftText === "") {
            history.goBack();
          } else {
            history.push("/dashboard" + data.leftLink);
          }
        }}
      >
        <svg
          width="20"
          height="23"
          viewBox="0 0 20 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.586677 10.0878C0.00272252 10.6754 0.00568798 11.6252 0.593301 12.2091L10.169 21.7252C10.7566 22.3092 11.7064 22.3062 12.2903 21.7186C12.8743 21.131 12.8713 20.1812 12.2837 19.5973L3.77195 11.1385L12.2307 2.6268C12.8147 2.03918 12.8117 1.08944 12.2241 0.505487C11.6365 -0.0784681 10.6867 -0.0755026 10.1028 0.51211L0.586677 10.0878ZM19.0279 9.59089L1.64596 9.64516L1.65533 12.6451L19.0373 12.5909L19.0279 9.59089Z"
            fill="black"
          />
        </svg>
      </div>

      {data.title && (
        <div className="text-3xl font-bold absolute left-1/2 -translate-x-1/2">
          {data.title}
        </div>
      )}

      <div className="">
        <Link to={data.rightLink} className="font-bold text-red-500">
          {data.rightText}
        </Link>
      </div>
    </div>
  );
}

export default Menu;
