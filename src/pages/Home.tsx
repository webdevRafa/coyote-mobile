import { HeroSection } from "../components/HeroSection";
import { SignUp } from "../components/SignUp";

import { About } from "./About";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <About />
      <div className="mx-auto max-w-[800px] pb-[100px]">
        <SignUp />
      </div>
    </>
  );
};
