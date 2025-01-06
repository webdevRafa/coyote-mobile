import logo from "../assets/logo.png";
import moi from "../assets/moi-standing.png";

export const HeroSection: React.FC = () => {
  return (
    <>
      <div className="mx-auto w-full overflow-hidden max-w-[800px] mt-20 pl-3">
        <div className="flex md:flex-row items-center justify-center">
          <div className="w-full">
            <img src={logo} alt="" />
          </div>
          <div className="w-full">
            <img src={moi} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
