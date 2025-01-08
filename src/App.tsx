import "./App.css";
import { About } from "./pages/About";
import { HeroSection } from "./components/HeroSection";
import { SignUpSignInToggle } from "./pages/SignUpSignInToggle";

SignUpSignInToggle;
function App() {
  return (
    <>
      <HeroSection />
      <About />
      <div className="w-full flex flex-col md:flex-row justify-center items-center max-w-[1200px] mx-auto gap-5">
        <SignUpSignInToggle />
      </div>
      <div className="h-[500px]"></div>
    </>
  );
}

export default App;
