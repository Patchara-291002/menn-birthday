import React, { useState } from "react";
import { LetterClose, LetterOpen } from "@/app/Component/Svg";

export default function Letter({ isOpen, setIsOpen }) {
  const [animationStage, setAnimationStage] = useState("idle"); // "idle", "closing", "opening"

  const handleClick = () => {
    if (animationStage === "idle") {
      // เริ่ม animation fade out ของ LetterClose
      setAnimationStage("closing");

      // หลัง fade out 0.5 วินาที เปลี่ยนไปแสดง LetterOpen พร้อม fade in
      setTimeout(() => {
        setAnimationStage("opening");
      }, 500);

      // หลังครบ 1 วินาที เรียก setIsOpen(true)
      setTimeout(() => {
        setIsOpen(true);
      }, 2000);
    }
  };

  return (
    <div className="">
      <div onClick={handleClick}>
        {animationStage === "idle" && (
          <div className="animate-fadeIn">
            <LetterClose />
          </div>
        )}
        {animationStage === "closing" && (
          <div className="animate-fadeOut">
            <LetterClose />
          </div>
        )}
        {animationStage === "opening" && (
          <div className="animate-fadeIn">
            <LetterOpen />
          </div>
        )}
      </div>
    </div>
  );
}
