import React from 'react';

export default function NotebookPaper() {
    return (
        <div
            className="flex flex-col justify-center items-center text-center w-[330px] h-[450px] p-4"
            style={{
                backgroundColor: "#fff",
                backgroundImage:
                    "linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                lineHeight: "20px"
            }}
        >
            <p>
                พรุ่งนี้อายุ 23 แล้วนะคับช่วงนี้อาจจะมีอะไรหลายๆอย่างที่เราต้องเปลี่ยน ขอให้เธอรับมือกับทุกอย่างได้ ขอให้งาน ชีวิต ทุกอย่างราบรื่นนะคับ ให้สุขภาพร่างกายเธอแข็งแรง ไม่เจ็บป่วยนะคับ 
            </p>
            <br/>
            <p>
                สุดท้ายนี้อยากให้เธอรู้ว่ามีคนรักและเป็นห่วงเธออยู่ตลอดนะคับ❤️ สุขสันต์วันเกิดคับ
            </p>
        </div>
    );
}
