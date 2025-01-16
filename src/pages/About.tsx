import doc from "../assets/doc.png";

export const About: React.FC = () => {
  return (
    <>
      <div className="my-[-2px] bg-dark-gray py-10 flex flex-col items-center md:flex-row w-full px-[10px] gap-2  mb-40 z-40 relative max-w-[1200px] mx-auto">
        <div className="bg-gray">
          <img
            className="mx-auto shadow-md md:translate-x-[-50%] slideRight "
            src={doc}
            alt=""
          />
        </div>

        <div className="w-full flex items-center justify-center px-6 mt-5 md:mt-0">
          <p className="text-md text-left bg-gray shadow-md p-4 text-white">
            At Coyote Mobile Chiropractic, we understand how hectic life can be.
            That's why we bring high-quality chiropractic care directly to your
            doorstep. Dr. Moises Hernandez, D.C., is committed to helping you
            feel your best without the hassle of traveling to a clinic. With a
            focus on personalized care, Dr. Hernandez uses his expertise to
            provide effective adjustments and muscle therapy tailored to your
            unique needs. Whether you're dealing with pain, stiffness, or just
            looking to improve your overall mobility, our services are designed
            to help you regain control of your health and feel at ease.
          </p>
        </div>
      </div>
    </>
  );
};
