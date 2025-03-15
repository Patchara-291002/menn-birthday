// ./component/PhotoCard.jsx
import React from 'react';

export default function PhotoCard({ top, left, right, bottom, rotate, z, imagePath }) {
  const style = {
    position: "absolute",
    top: top !== undefined ? `${top}px` : undefined,
    left: left !== undefined ? `${left}px` : undefined,
    right: right !== undefined ? `${right}px` : undefined,
    bottom: bottom !== undefined ? `${bottom}px` : undefined,
    transform: rotate !== undefined ? `rotate(${rotate}deg)` : undefined,
    zIndex: z !== undefined ? z : undefined,
  };

  return (
    <div
      style={style}
      className="photo-card w-[220px] h-[293px] p-[8px] pb-[20px] bg-white drop-shadow-md rounded-[2px]"
    >
      <img src={imagePath} alt="" className="w-full h-full object-cover" />
    </div>
  );
}
