import "./App.css";
import logo from "./assets/logo-black_1.png";
import { SignUp } from "./components/SignUp";

function App() {
  return (
    <>
      <h1 className="text-3xl font-mono mb-20">Welcome to coyote mobile.</h1>
      <div className="mx-auto max-w-[800px]">
        <div className="flex flex-col md:flex-row items-center justify-around">
          <img className="max-w-[300px]" src={logo} alt="" />
          <SignUp></SignUp>
        </div>
      </div>
      <div className="mx-auto w-full block"></div>
      <h2 className="text-2xl my-5">developer notes. so far...</h2>
      <ul>
        <li>initiated and linked github repo</li>
        <li>installed and linked firebase, setup api keys</li>
        <li>
          collections have been created to store services, users and bookings.
        </li>
        <li>we need to add react-calendar to manage bookings</li>
      </ul>
    </>
  );
}

export default App;
