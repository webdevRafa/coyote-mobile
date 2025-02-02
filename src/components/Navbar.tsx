import { NavLink } from "react-router-dom";
import logo from "../assets/circle-logo.png";
import { IoHome } from "react-icons/io5";
import { GrServices } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";

export const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-full bg-dark-gray fixed top-0 left-0 px-4 md:px-20 z-50 fades">
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white font-bona">
          <div className="text-2xl font-bold  flex items-center">
            <img className="h-[40px]" src={logo} alt="" />
            <h2 className="hidden md:block ml-3 text-sm font-light">
              Coyote Mobile Chiropractic
            </h2>
          </div>
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-sky border-b-2 border-b-dark-gray"
                  : "border-b-2 border-b-dark-gray hover:text-white hover:border-b-sky"
              }
            >
              <IoHome className="size-6" />
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-sky border-b-2 border-b-dark-gray"
                  : "hover:text-white border-b-2 border-b-dark-gray hover:border-b-sky"
              }
            >
              <GrServices className="size-6" />
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-sky border-b-2 border-b-dark-gray"
                  : "hover:text-white border-b-2 border-b-dark-gray hover:border-b-sky"
              }
            >
              <MdDashboard className="size-6" />
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-sky border-b-2 border-b-dark-gray"
                  : "hover:text-white border-b-2 border-b-dark-gray hover:border-b-sky"
              }
            >
              <MdContactPhone className="size-6" />
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};
