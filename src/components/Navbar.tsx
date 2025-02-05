import { NavLink } from "react-router-dom";
import logo from "../assets/circle-logo.png";
import { IoHome } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";

export const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-full bg-dark-gray fixed top-0 left-0 px-4 md:px-20 z-50 fades">
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="text-2xl font-bold  flex items-center">
            <img className="h-[40px]" src={logo} alt="" />
            <h2 className="hidden md:block ml-3 text-sm font-playfair">
              Coyote Mobile Chiropractic
            </h2>
          </div>
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-sky" : " hover:text-white"
              }
            >
              <IoHome className="size-6" />
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive ? "text-sky" : "hover:text-white"
              }
            >
              <GrServices className="size-6" />
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-sky" : "hover:text-white"
              }
            >
              <MdDashboard className="size-6" />
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};
