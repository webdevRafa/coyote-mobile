import "./App.css";
import { About } from "./components/About";
import { HeroSection } from "./components/HeroSection";
import { SignUpSignInToggle } from "./components/SignUpSignInToggle";

SignUpSignInToggle;
function App() {
  return (
    <>
      <HeroSection />
      <About />
      <SignUpSignInToggle />
      <div className="h-[500px]"></div>
    </>
  );
}

export default App;
