import logo from "../assets/logo.png";
import moi from "../assets/moi-standing.png";

export const HeroSection: React.FC = () => {
  return (
    <>
      <div className="mx-auto w-full overflow-hidden  max-w-[800px] mt-28 pl-3 sticky top-20 z-20">
        <div className="flex md:flex-row items-center justify-center">
          <div className="w-full">
            <img
              className="translate-x-20 md:translate-x-36 scale-90 md:scale-75"
              src={logo}
              alt=""
            />
          </div>
          <div>
            <img className="opacity-5" src={moi} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
