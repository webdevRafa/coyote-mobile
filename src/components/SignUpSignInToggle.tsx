import { useState } from "react";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";

export const SignUpSignInToggle: React.FC = () => {
  const [selected, setSelected] = useState<"signUp" | "signIn">("signUp");

  return (
    <>
      <div className="bg-gradient-to-b from-off-white to-white p-5 max-w-[1200px] mx-auto">
        {/* Flex Container */}
        {/* Toggle Buttons */}
        <div className="w-[200px] h-[30px] mx-auto flex justify-center items-center">
          {/* Sign Up Button */}
          <div
            className={`py-1 w-full text-center text-white cursor-pointer transition ease-in-out duration-300 ${
              selected === "signUp"
                ? "bg-blue hover:bg-dark-blue"
                : "bg-dark-gray"
            }`}
            onClick={() => setSelected("signUp")}
          >
            <h1>Sign Up</h1>
          </div>

          {/* Sign In Button  */}
          <div
            className={`py-1 w-full text-center text-white cursor-pointer transition ease-in-out duration-300 ${
              selected === "signIn"
                ? "bg-blue hover:bg-dark-blue"
                : "bg-dark-gray"
            }`}
            onClick={() => setSelected("signIn")}
          >
            <h1>Sign In</h1>
          </div>
        </div>

        {/* RENDER BASED ON SELECTED */}
        {selected === "signUp" && <SignUp />}
        {selected === "signIn" && <SignIn />}
      </div>
    </>
  );
};
