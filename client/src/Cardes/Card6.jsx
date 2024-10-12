import React, { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";

const Card6 = ({
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
    <div className="flex flex-col items-center justify-center   overflow-visible p-0 m-5">
      <div className="w-[280px] bg-white rounded-lg shadow-lg overflow-hidden h-[400px] mb-0">
        <div className="bg-[#0d1b2a] text-white text-center py-4 rounded-b-[120px]">
          <div className="text-2xl font-bold p-9">{schoolname}</div>
        </div>
        <div className="relative bg-[#e0f5f5]">
          <div className="absolute inset-x-0 top-[-50px] flex justify-center">
            <div className="w-[100px] h-[100px] rounded-full border-4 border-[#0d1b2a] overflow-hidden">
              <img
                src={image}
                alt="Uploaded"
                crossOrigin="anonymous"
                onLoad={() => setImgLoaded(true)}
                // className={`z-50 h-[100px] w-[100px] bg-[#e6ebe0] rounded-lg absolute top-[40px] left-[75px] ${
                //   imgLoaded ? "" : "hidden"
                // }`}
              />
            </div>
          </div>
          <div className="pt-[60px] pb-4 text-center">
            <div className="text-xl font-bold text-[#0d1b2a]"> {name}</div>
            <div className="text-sm text-[#00a8a8]">ID: {id}</div>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-sm text-[#0d1b2a]">
            <div className="flex justify-between">
              <b>DOB: {dob}</b>
            </div>

            <div className="flex justify-between">
              <p>
                <b>Phone:</b> {phone}
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                <b>Class:</b> {studentClass}
              </p>
            </div>
          </div>
          <h1 className="text-center">Have A Nice Day !!</h1>
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

export default Card6;
