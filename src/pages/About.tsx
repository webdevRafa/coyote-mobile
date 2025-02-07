import doc from "../assets/doc.png";

export const About: React.FC = () => {
  return (
    <>
      <div className="w-full bg-dark-gray z-40 relative">
        <div className="my-[-2px] md:mb-5 bg-dark-gray py-10 flex flex-col items-center md:flex-row w-full px-[10px] gap-2  z-40 relative max-w-[1200px] mx-auto">
          <div className="opacity-70">
            <img
              className="mx-auto shadow-md   slideRight xl:translate-x-[-30%] lg:hover:scale-150 transition ease-in-out duration-300"
              src={doc}
              alt=""
            />
          </div>

          <div className="w-full flex items-center justify-center mt-5 md:mt-0">
            <div>
              <div className="bg-gray shadow-md p-5">
                <h1 className="font-poppins text-left text-soft-blue text-md md:text-xl mb-2">
                  At Coyote Mobile Chiropractic, we understand how hectic life
                  can be.
                </h1>

                <p className="font-poppins text-sm text-off-white">
                  That's why we bring high-quality chiropractic care{" "}
                  <span className="text-soft-blue font-bold">
                    directly to your doorstep
                  </span>{" "}
                  .
                </p>

                <p className="bg-dark-gray text-soft-blue mt-5 py-5 px-2 text-md font-poppins text-center ">
                  Dr. Moises Hernandez, D.C., is committed to helping you feel
                  your best without the hassle of traveling to a clinic.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-[90%] max-w-[1300px] px-3 z-40 relative">
          <div>
            <h2 className="text-xl text-white text-center font-poppins">
              With a focus on personalized care, Dr. Hernandez uses his
              expertise to provide effective adjustments and muscle therapy
              tailored to your unique needs.
            </h2>
            <p className="text-soft-blue font-poppins text-center text-sm mt-5 max-w-[600px] mx-auto border-b-gray border-b-2 pb-3 mb-10 ">
              Whether you're dealing with pain, stiffness, or just looking to
              improve your overall mobility, our services are designed to help
              you regain control of your health and feel at ease.
            </p>
          </div>
          <div>
            <h2 className="text-white text-center text-xl font-poppins">
              Coyote Mobile Chiropractic is currently available{" "}
              <span className="text-sky">only in Texas</span>
              &nbsp;in the following cities:
            </h2>
            <ul className="text-soft-blue mt-10 mx-auto block max-w-[300px] text-center">
              <li>Brownsville</li>
              <li>San Benito</li>
              <li>Harlingen</li>
              <li>Los Fresnos</li>
              <li>Los Fresnos</li>
              <li>Port Isabel</li>
            </ul>
          </div>
          <p className="text-dark-gray font-poppins bg-soft-blue rounded-lg md:text-2xl max-w-[800px] mx-auto p-5 translate-y-[50%] mb-[100px]">
            <strong>Getting started is easy.</strong> Create an account to get a
            free consultation.
          </p>
        </div>
      </div>
    </>
  );
};
