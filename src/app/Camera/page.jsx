'use client'
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera } from '@/app/Component/Svg';
import TakeCamera from './component/TakeCamera';

gsap.registerPlugin(ScrollTrigger);

export default function CameraComponent() {
    const [isOpen, setIsOpen] = useState(false);
    // ref สำหรับ container ที่จะ animate
    const triggerRef = useRef(null);

    useEffect(() => {
        if (triggerRef.current) {
            gsap.from(triggerRef.current.children, {
                opacity: 0,
                y: 50,
                duration: 1,
                stagger: 0.3,
                scrollTrigger: {
                    trigger: triggerRef.current,
                    start: 'top 50%', // เมื่อ container เข้ามาใน viewport ที่ 80% จากด้านบน
                    // markers: true, // เปิด markers เพื่อ debug
                },
            });
        }
    }, []);

    return (
        <div className="w-full h-dvh">
            {isOpen ? (
                <TakeCamera />
            ) : (
                <div
                    ref={triggerRef}
                    className="flex flex-col gap-4 w-full h-full justify-center items-center"
                >
                    <p className="text-[24px] text-[#4c4637]">พร้อมยัง?</p>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-[36px] text-[#fb8f55] bg-white px-6 py-4 rounded-full drop-shadow-lg"
                    >
                        พร้อม
                    </button>
                </div>
            )}
        </div>
    );
}
