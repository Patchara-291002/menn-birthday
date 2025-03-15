'use client'

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Page() {
  // กำหนดวันเกิด 16/03/2002
  const birthday = new Date('2002-03-16T00:00:00');

  const [timeDiff, setTimeDiff] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now - birthday;
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
      const seconds = Math.floor((diffMs / 1000) % 60);

      setTimeDiff({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeCount = [
    {
      title: "วัน",
      value: timeDiff.days,
    },
    {
      title: "ชั่วโมง",
      value: timeDiff.hours,
    },
    {
      title: "นาที",
      value: timeDiff.minutes,
    },
    {
      title: "วินาที",
      value: timeDiff.seconds,
    },
  ];

  // ใช้ ref สำหรับ container หลักที่ต้องการ animate
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current.children, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.4,
      ease: "power2.out",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-lvh flex flex-col justify-center items-center"
    >
      <div className="w-[280px] h-[280px] flex flex-col justify-center items-center text-center bg-white p-6 rounded-full drop-shadow-md">
        <p className="text-[128px] font-semibold leading-[80px] text-[#fb8f55]">
          23
        </p>
        <p className="text-[36px] font-medium text-[#4c4637]">
          Happy Birthday
        </p>
      </div>
      <div className="flex flex-col justify-center items-center mt-8">
        <p className="text-[20px] text-[#3e3a32] font-medium leading-4">
          เธออยู่บนโลกนี้มา
        </p>
        <div className="flex gap-4 mt-6">
          {timeCount.map((time) => (
            <div
              key={time.title}
              className="w-[80px] h-[80px] bg-white p-3 rounded-full text-center drop-shadow-md"
            >
              <p className="text-[#fb8f55] text-2xl">{time.value}</p>
              <p className="text-[#3e3a32]">{time.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
