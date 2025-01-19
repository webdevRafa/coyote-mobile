import { HeroSection } from "../components/HeroSection";
import { SignUp } from "../components/SignUp";
import VideoComponent from "../components/VideoComponent";

import { About } from "./About";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <About />
      <div className="flex items-center flex-col md:flex-row max-w-[1200px] mx-auto gap-10 pb-20">
        <VideoComponent />
        <SignUp />
      </div>
    </>
  );
};
