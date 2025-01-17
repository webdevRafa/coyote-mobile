import { HeroSection } from "../components/HeroSection";
import { About } from "./About";

export const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <About />
      <div className="h-[500px]"></div>
    </>
  );
};
