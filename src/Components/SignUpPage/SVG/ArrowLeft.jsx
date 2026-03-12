import React from "react";
import style from "./SVG.module.css"
export const ArrowLeft = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="10"
        width="10"
        viewBox="0 0 640 640"
        className={style.arrowIcon}
      >
        <path
          fill="rgb(93, 108, 123)"
          d="M201.4 297.4C188.9 309.9 188.9 330.2 201.4 342.7L361.4 502.7C373.9 515.2 394.2 515.2 406.7 502.7C419.2 490.2 419.2 469.9 406.7 457.4L269.3 320L406.6 182.6C419.1 170.1 419.1 149.8 406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3L201.3 297.3z"
        />
      </svg>
    </div>
  );
};
