import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";

const Card1 = ({
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

      // Optionally, send data to MongoDB again here if needed
    });
  };

  return (
    <div className="flex flex-col items-center justify-center pt-9 overflow-visible">
      <div
        ref={cardRef}
        className="relative h-[375px] w-[250px] rounded-lg overflow-visible shadow-lg"
      >
        <div className="bg-[#8338ec] h-[30%] w-full flex flex-col items-center rounded-t-lg">
          <img
            src={image}
            alt="Uploaded"
            crossOrigin="anonymous"
            onLoad={() => setImgLoaded(true)}
            className={`z-50 h-[100px] w-[100px] bg-[#e6ebe0] rounded-lg absolute top-[40px] left-[75px] ${
              imgLoaded ? "" : "hidden"
            }`}
          />
        </div>

        <div className="bg-white h-[70%] w-full absolute rounded-b-lg overflow-visible">
          <p className="text-center capitalize font-bold text-[20px] relative top-[60px]">
            {name}
          </p>
          <p className="text-center text-gray-500 text-[12px]">{schoolname}</p>
          <p className="text-center text-[15px] font-normal">ID: {id}</p>

          <div className="text-center mt-5">
            <div className="text-gray-800 text-left p-5 text-[16px]">
              <p>
                <b>Student ID:</b> {id}
              </p>
              <p>
                <b>School:</b> {schoolname}
              </p>
              <p>
                <b>DOB:</b> {dob}
              </p>
              <p>
                <b>Phone:</b> {phone}
              </p>
              <p>
                <b>Class:</b> {studentClass}
              </p>
            </div>
          </div>
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

export default Card1;
