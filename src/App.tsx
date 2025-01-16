/* eslint-disable @typescript-eslint/no-unused-expressions */
import "./App.css";
import { About } from "./pages/About";
import { HeroSection } from "./components/HeroSection";
import { SignUpSignInToggle } from "./pages/SignUpSignInToggle";
import { Dashboard } from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";

SignUpSignInToggle;
function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <About />

      <div className="w-full flex flex-col md:flex-row justify-center items-center mx-auto gap-5 md:px-10">
        <SignUpSignInToggle />
        <Dashboard />
      </div>
      <div className="h-[500px]"></div>
    </>
  );
}

export default App;
