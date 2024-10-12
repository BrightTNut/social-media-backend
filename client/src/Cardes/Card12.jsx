import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import bgimage from "./card12 bg.png"; // Import the background image

const Card12 = ({
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
    <div className="w-[500px] translate-x-10 flex flex-col items-center justify-around overflow-visible ">
      <div
        ref={cardRef}
        className="max-w-lg mx-auto shadow-md rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <div className=" text-center py-4 px-6 bg-opacity-60">
          <h1 className="text-2xl font-bold text-blue-400">{schoolname}</h1>
        </div> */}
        <div className="flex flex-col items-center p-6  bg-opacity-60">
          <img
            className="w-[160px] h-[170px] rounded-full border-[3px] shadow-lg shadow-black  mx-auto pt-2 pl-2"
            src={image}
            alt="Student"
          />
          <div className=" text-center py-4 px-6 bg-opacity-60">
            <h1 className="text-2xl font-bold text-blue-400">{schoolname}</h1>
          </div>
          <div
            className="ml-6 rounded-xl p-3 text-purple-800
          "
          >
            <ul>
              <li className="mb-1">
                <strong>Student Name:</strong> {name}
              </li>
              <li className="mb-1">
                <strong>Student Id:</strong> {id}
              </li>
              <li className="mb-1">
                <strong>Date:</strong> {dob}
              </li>
              <li>
                <strong>Address:</strong>
              </li>
              <li>
                <strong>Phone:</strong> {phone}
              </li>
              <li>
                <strong>Class:</strong> {studentClass}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={handleDownloadJPG}
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download JPG
        </button>
      </div>
    </div>
  );
};

export default Card12;
