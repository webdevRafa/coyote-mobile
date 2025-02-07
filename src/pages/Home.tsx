import { HeroSection } from "../components/HeroSection";
import { SignUp } from "../components/SignUp";
import VideoComponent from "../components/VideoComponent";
import waves from "../assets/curvedsm.svg";

import { About } from "./About";

export const Home: React.FC = () => {
  return (
    <>
      <div className="relative">
        <HeroSection />

        <About />
        <div className="md:px-10 pb-20 relative z-40">
          <div className="max-w-[1200px] shadow-md rounded-md bg-dark-gray p-20 flex flex-col items-center md:flex-row mx-auto gap-2 relative">
            <VideoComponent />
            <SignUp />
          </div>
        </div>
        <div className="w-full absolute bottom-0 left-0 z-30">
          <img src={waves} alt="" />
        </div>
      </div>
    </>
  );
};
