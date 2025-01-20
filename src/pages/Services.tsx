import React, { useState } from "react";
import { BackgroundVideo } from "../components/BackgroundVideo";
import { GrNext } from "react-icons/gr";
import { MdArrowBackIos } from "react-icons/md";

const services = [
  {
    name: "Spinal Adjustments",
    purpose:
      "To restore joint mobility, relieve pain, and improve functionality",
    content: (
      <>
        <ul className="italic py-5 px-2 text-dark-gray bg-white max-w-[400px] mx-auto text-left">
          <li className="border-b-2 border-b-shade">Back pain</li>
          <li className="border-b-2 border-b-shade">Neck pain or stiffness</li>
          <li className="border-b-2 border-b-shade">
            Joint restrictions or misalignments
          </li>
          <li className="border-b-2 border-b-shade">
            Chronic headaches or migraines
          </li>
          <li className="border-b-2 border-b-shade">
            Sciatica or radiating pain in the legs
          </li>
        </ul>
      </>
    ),
  },
  {
    name: "Soft Tissue Therapy",
    purpose:
      "To relax tight muscles, reduce scar tissue, and improve blood flow.",
    content: (
      <>
        <ul className="italic py-5 px-2 text-dark-gray bg-white max-w-[400px] mx-auto text-left">
          <li className="border-b-2 border-b-shade">
            Muscle tension or spasms
          </li>
          <li className="border-b-2 border-b-shade">
            Sports injuries or repetitive strain injuries
          </li>
          <li className="border-b-2 border-b-shade">Postural imbalances</li>
          <li className="border-b-2 border-b-shade">
            Soft tissue damage from trauma
          </li>
          <li className="border-b-2 border-b-shade">
            Trigger points causing pain in specific areas
          </li>
        </ul>
      </>
    ),
  },
  {
    name: "Corrective Exercises and Stretches",
    purpose:
      "To strengthen weak muscles, improve posture, and prevent injuries.",
    content: (
      <>
        <ul className="italic py-5 px-2 text-dark-gray bg-gradient-to-b from-white to-off-white max-w-[400px] mx-auto text-left">
          <li className="border-b-2 border-b-shade">
            Muscle imbalances or poor posture
          </li>
          <li className="border-b-2 border-b-shade">
            Rehabilitation after an injury
          </li>
          <li className="border-b-2 border-b-shade">
            Chronic conditions requiring muscle strengthening
          </li>
          <li className="border-b-2 border-b-shade">
            Limited range of motion in joints
          </li>
        </ul>
      </>
    ),
  },
];

export const Services: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  const currentService = services[currentIndex];

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 md:justify-center text-white pt-28 px-10 relative">
      <BackgroundVideo />
      <div className="w-full flex flex-col items-start justify-start">
        {/* Current Service Display */}
        <div className="bg-gradient-to-t from-gray to-dark-gray p-5 shadow-md w-full max-w-2xl text-center">
          <h1 className="text-3xl mb-5 font-bold text-sky">
            {currentService.name}
          </h1>
          <p className="text-lg mb-2">Purpose: {currentService.purpose}</p>
          <p className="font-bold mb-2 mt-5">Recommended for: </p>
          {currentService.content}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-5 w-full max-w-2xl">
          <MdArrowBackIos
            onClick={handlePrev}
            className="size-7 hover:text-sky"
          />

          <GrNext className="size-7 hover:text-sky" onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};
