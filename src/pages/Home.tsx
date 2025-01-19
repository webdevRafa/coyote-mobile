import { HeroSection } from "../components/HeroSection";
import { SignUp } from "../components/SignUp";
import VideoComponent from "../components/VideoComponent";

import { About } from "./About";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <About />
      <VideoComponent />
      <div className="mx-auto max-w-[800px] pb-[100px]">
        <SignUp />
      </div>
    </>
  );
};
