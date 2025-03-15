'use client'

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PhotoCard from './component/PhotoCard';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const containerRef = useRef(null);

  useEffect(() => {
    // ดึง element ที่มี class .photo-card ทั้งหมดใน container
    const cards = gsap.utils.toArray('.photo-card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center', 
        end: 'bottom center',
      },
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div ref={containerRef} className='w-full h-dvh relative'>
      <PhotoCard
        top={80}
        left={20}
        rotate={16}
        z={1}
        imagePath={'/1.jpg'}
      />
      <PhotoCard
        top={100}
        right={-20}
        rotate={-28}
        z={1}
        imagePath={'/2.jpg'}
      />
      <PhotoCard
        top={300}
        left={120}
        rotate={-4}
        z={2}
        imagePath={'/3.jpg'}
      />
      <PhotoCard
        bottom={60}
        right={2}
        rotate={-10}
        z={1}
        imagePath={'/4.jpg'}
      />
      <PhotoCard
        bottom={0}
        left={0}
        rotate={-35}
        z={1}
        imagePath={'/5.jpg'}
      />
    </div>
  );
}
