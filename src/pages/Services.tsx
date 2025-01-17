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
  {
    name: "Y Strap Decompression Therapy",
    purpose: "To relieve pressure on the spine and intervertebral discs.",
    content: (
      <>
        <ul className="italic text-sky">
          <li>Herniated or bulging discs</li>
          <li>Sciatica or nerve compression</li>
          <li>Degenerative disc disease</li>
          <li>Chronic lower back pain</li>
        </ul>
      </>
    ),
  },
  {
    name: "Postural and Ergonomic Training",
    purpose:
      "To correct posture and improve workplace or lifestyle ergonomics.",
    content: (
      <>
        <ul className="italic text-sky">
          <li>Office workers with back or neck pain from prolonged sitting</li>
          <li>Students or professionals with tech neck</li>
          <li>Repetitive strain injuries</li>
        </ul>
      </>
    ),
  },
];

export const Services: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white pt-28 px-10 relative bg-gray">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 z-40">
          {services.map((service) => (
            <div className="bg-dark-gray p-5 shadow-md">
              <h1 className="text-3xl mb-2 bg-gray  font-bold p-2">
                {service.name}
              </h1>
              <p className="text-lg mb-2">Purpose: {service.purpose}</p>
              <p className="font-bold">Recommended for: </p>
              {service.content}
            </div>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-10 opacity-30">
          <div className="nature"></div>
        </div>
      </div>
      <div className="h-[500px] bg-gradient-to-t from-gray to-dark-gray"></div>
    </>
  );
};
