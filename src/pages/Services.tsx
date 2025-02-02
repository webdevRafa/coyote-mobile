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
        <ul className="font-bona p-5 text-dark-gray bg-white max-w-[400px] mx-auto text-left">
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
        <ul className="font-bona p-5 text-dark-gray bg-white max-w-[400px] mx-auto text-left">
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
        <ul className="font-bona p-5 text-dark-gray bg-gradient-to-b from-white to-off-white max-w-[400px] mx-auto text-left">
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
    <div className="text-white pt-28 px-10 relative py-20 w-full flex flex-col md:flex-row items-center justify-center">
      <div className="md:translate-x-[25%] translate-y-[10%] md:translate-y-0">
        {/* Current Service Display */}
        <div className="bg-gradient-to-t from-gray to-dark-gray py-2 md:py-14 px-10 shadow-md w-full max-w-2xl text-center">
          <div className="slideRight">
            <h1 className="text-lg mb-2 md:mb-5 font-bona font-bold text-sky">
              {currentService.name}
            </h1>
            <p className="font-BONA text-md mb-2">{currentService.purpose}</p>
            <p className="mb-2 mt-10 font-roboto text-sm text-left">
              Recommended for:{" "}
            </p>
            {currentService.content}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex fadeIn justify-between mt-5 w-full max-w-2xl">
          <MdArrowBackIos
            onClick={handlePrev}
            className="size-7 hover:text-sky cursor-pointer"
          />

          <GrNext
            className="size-7 hover:text-sky cursor-pointer"
            onClick={handleNext}
          />
        </div>
      </div>
      <BackgroundVideo />
    </div>
  );
};
