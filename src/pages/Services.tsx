import React, { useState } from "react";

const services = [
  {
    name: "Spinal Adjustments",
    purpose:
      "To restore joint mobility, relieve pain, and improve functionality",
    content: (
      <>
        <ul className="italic text-sky">
          <li>Back pain</li>
          <li>Neck pain or stiffness</li>
          <li>Joint restrictions or misalignments</li>
          <li>Chronic headaches or migraines</li>
          <li>Sciatica or radiating pain in the legs</li>
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
        <ul className="italic text-sky">
          <li>Muscle tension or spasms</li>
          <li>Sports injuries or repetitive strain injuries</li>
          <li>Postural imbalances</li>
          <li>Soft tissue damage from trauma</li>
          <li>Trigger points causing pain in specific areas</li>
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
        <ul className="italic text-sky">
          <li>Muscle imbalances or poor posture</li>
          <li>Rehabilitation after an injury</li>
          <li>Chronic conditions requiring muscle strengthening</li>
          <li>Limited range of motion in joints</li>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white pt-28 px-10 relative">
      <div className="w-full flex flex-col items-center">
        {/* Current Service Display */}
        <div className="bg-dark-gray p-5 shadow-md w-full max-w-2xl text-center">
          <h1 className="text-3xl mb-2 font-bold text-sky">
            {currentService.name}
          </h1>
          <p className="text-lg mb-2">Purpose: {currentService.purpose}</p>
          <p className="font-bold mb-2">Recommended for: </p>
          {currentService.content}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-5 w-full max-w-2xl">
          <button
            onClick={handlePrev}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          >
            ⬅ Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};
