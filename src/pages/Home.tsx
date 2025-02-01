import { HeroSection } from "../components/HeroSection";
import { SignUp } from "../components/SignUp";
import VideoComponent from "../components/VideoComponent";

import { About } from "./About";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <About />
      <div className="flex items-center flex-col md:flex-row max-w-[1000px] w-full mx-auto gap-10 pb-20 bg-dark-gray relative z-30">
        <VideoComponent />
        <SignUp />
      </div>
    </>
  );
};
