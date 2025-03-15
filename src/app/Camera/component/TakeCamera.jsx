'use client'
import { useState, useRef, useEffect } from 'react';
import { Camera } from '@/app/Component/Svg';

export default function TakeCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photos, setPhotos] = useState([]); 
  const [countdown, setCountdown] = useState(null); 
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    // ขอสิทธิ์เข้าถึงกล้อง
    let stream;
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          // กำหนด srcObject
          videoRef.current.srcObject = stream;
          // รอให้วิดีโอโหลด metadata เสร็จ
          videoRef.current.onloadedmetadata = () => {
            videoRef.current
              .play()
              .catch((err) => {
                console.error("Error while playing video:", err);
              });
          };
        }
      })
      .catch((err) => {
        console.error("เกิดข้อผิดพลาดในการเข้าถึงกล้อง:", err);
      });

    // หยุด stream เมื่อ component ถูก unmount (ป้องกันกล้องค้าง)
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // ฟังก์ชันถ่ายภาพจากวิดีโอแล้วเก็บใน state photos
  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setPhotos((prev) => [...prev, dataUrl]);
    }
  };

  // ฟังก์ชันเริ่มกระบวนการถ่ายภาพแบบมี countdown
  const startSequence = () => {
    if (capturing) return; // ป้องกันการกดซ้ำ
    setPhotos([]);
    setCapturing(true);

    let count = 0;
    let timer = 5; // 5 วินาทีสำหรับภาพแรก
    setCountdown(timer);

    const interval = setInterval(() => {
      timer--;
      setCountdown(timer);

      if (timer === 0) {
        // ถ่ายภาพ
        capturePhoto();
        count++;

        if (count >= 3) {
          // ถ่ายครบ 3 รูป (หรือปรับเป็น 5 รูปตามต้องการ)
          clearInterval(interval);
          setCapturing(false);
          setCountdown(null);
        } else {
          // สำหรับภาพถัดไป ใช้ countdown 3 วินาที
          timer = 3;
          setCountdown(timer);
        }
      }
    }, 1000);
  };

  return (
    <div className="w-full">
      <div className="h-dvh flex flex-col items-center">
        <div className="relative w-[345px] h-[460px] bg-white p-4 pb-6 drop-shadow-lg">
          {/* แสดงวิดีโอจากกล้อง */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            playsInline
            // ไม่ต้อง autoPlay ตรงนี้ เพราะเราจะสั่งเล่นเองตอน loadedmetadata
          />
          {/* Canvas ซ่อนไว้ใช้สำหรับ capture รูป */}
          <canvas ref={canvasRef} style={{ display: 'none' }} />

          {capturing && countdown !== null && (
            <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
              <div className="flex justify-center items-center w-[50px] h-[50px] rounded-full border-2 border-white bg-black/50">
                <p className="text-xl text-white">{countdown}</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={startSequence}
          disabled={capturing}
          className="bg-white p-4 rounded-full drop-shadow-lg mt-4 cursor-pointer flex items-center justify-center"
        >
          <Camera w={30} h={30} color={"#fb8f55"} />
        </button>
      </div>

      {photos.length > 0 && (
        <div className="w-fit mx-auto mt-[50px] grid grid-cols-1 gap-4 p-4 bg-white drop-shadow-lg">
          {photos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Captured ${index + 1}`}
              className="w-[258px] h-[344px] object-cover mt-2"
            />
          ))}
        </div>
      )}
    </div>
  );
}
