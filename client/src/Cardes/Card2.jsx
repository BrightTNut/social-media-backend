import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";

const Card2 = ({
  name,
  id,
  schoolname,
  image,
  dob,
  phone,
  class: studentClass,
}) => {
  const cardRef = useRef();
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleDownloadJPG = () => {
    const element = cardRef.current;

    html2canvas(element, { useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${name}_ID_Card.jpg`;
      link.click();
    });
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      <div
        ref={cardRef}
        className="relative h-[375px] w-[225px] rounded-lg overflow-hidden shadow-lg bg-[#6caf19]"
        style={{
          backgroundImage: "url('ecardbgfinal.png')",
          backgroundSize: "225px 375px",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-[#6caf19] p-2 text-2xl bg-[#e6ebe0]">
          <p>{schoolname}</p>
        </div>
        <div className="absolute top-[60px] left-[102px]">
          <img
            src={image}
            alt="Uploaded"
            crossOrigin="anonymous"
            onLoad={() => setImgLoaded(true)}
            className={`h-[90px] w-[90px] bg-[#e6ebe0] rounded-full border-[3px] border-[rgba(255,255,255,0.2)] ${
              imgLoaded ? "" : "hidden"
            }`}
          />
        </div>
        <div className="absolute top-[160px] left-[90px] text-white text-lg">
          <p className="font-bold">{name}</p>
        </div>
        <div className="absolute top-[212px] ml-[5px] capitalize text-sm">
          <p>
            <b>Student ID:</b> {id}
          </p>
          <p>
            <b>Mobile No :</b> {phone}
          </p>
          <p>
            <b>DOB :</b> {dob}
          </p>
          <p>
            <b>Class :</b> {studentClass}
          </p>
        </div>
      </div>
      <button
        onClick={handleDownloadJPG}
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download JPG
      </button>
    </div>
  );
};

export default Card2;
