'use client'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import NotebookPaper from './component/NotebookPaper'
import Letter from './component/Letter'

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.from(containerRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%', // เมื่อ container เข้ามาใน viewport ที่ตำแหน่ง 80% จากด้านบน
          // markers: true, // สามารถเปิด markers เพื่อ debug ได้
        },
      });
    }
  }, []);

  return (
    <div className="w-full h-dvh relative" ref={containerRef}>
      <div className="w-full h-full flex justify-center items-center">
        {isOpen ? (
          <NotebookPaper />
        ) : (
          <Letter isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </div>
    </div>
  );
}
