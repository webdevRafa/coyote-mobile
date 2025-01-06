import "./App.css";
import logo from "./assets/logo.png";
import { SignUp } from "./components/SignUp";
import moi from "../src/assets/moi-standing.png";
import { About } from "./components/About";

function App() {
  return (
    <>
      <div className="mx-auto w-full overflow-hidden max-w-[800px] mt-20">
        <div className="flex md:flex-row items-center justify-center">
          <div className="w-full">
            <img src={logo} alt="" />
          </div>
          <div className="w-full">
            <img src={moi} alt="" />
          </div>
        </div>
      </div>

      <About />
      <SignUp />
      <div className="h-[500px]"></div>
    </>
  );
}

export default App;
