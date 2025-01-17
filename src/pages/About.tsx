import doc from "../assets/doc.png";

export const About: React.FC = () => {
  return (
    <>
      <div className="my-[-2px] bg-dark-gray py-10 flex flex-col items-center md:flex-row w-full px-[10px] gap-2  z-40 relative max-w-[1200px] mx-auto">
        <div>
          <img
            className="mx-auto shadow-md border-x-sky border-2 border-y-0  slideRight xl:translate-x-[-30%] lg:hover:scale-150 transition ease-in-out duration-300"
            src={doc}
            alt=""
          />
        </div>

        <div className="w-full flex items-center justify-center px-6 mt-5 md:mt-0">
          <div>
            <p className="text-xl text-left bg-gray  shadow-md p-4 text-white">
              At Coyote Mobile Chiropractic, we understand how hectic life can
              be.
            </p>
            <p className="text-white italic  mt-5 text-lg">
              That's why we bring high-quality chiropractic care directly to
              your doorstep.
            </p>
            <p className="bg-dark-gray text-off-white mt-5 text-lg ">
              Dr. Moises Hernandez, D.C., is committed to helping you feel your
              best without the hassle of traveling to a clinic.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-3 py-10">
        <h2 className="text-2xl md:text-3xl text-sky text-center border-b-gray border-b-2 pb-3">
          With a focus on personalized care, Dr. Hernandez uses his expertise to
          provide effective adjustments and muscle therapy tailored to your
          unique needs.
        </h2>
        <p className="text-off-white text-lg mt-5 max-w-[600px] mx-auto">
          Whether you're dealing with pain, stiffness, or just looking to
          improve your overall mobility, our services are designed to help you
          regain control of your health and feel at ease.
        </p>
      </div>
    </>
  );
};
