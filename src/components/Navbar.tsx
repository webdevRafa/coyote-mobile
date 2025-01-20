import { NavLink } from "react-router-dom";
import logo from "../assets/circle-logo.png";
export const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-full bg-dark-gray fixed top-0 left-0 px-4 md:px-20 z-50 fades">
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="text-2xl font-bold  flex items-center">
            <img className="h-[40px]" src={logo} alt="" />
            <h2 className=" ml-3 text-sm">Coyote Mobile Chiropractic</h2>
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
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-sky border-b-2 border-b-dark-gray"
                  : "hover:text-white border-b-2 border-b-dark-gray hover:border-b-sky"
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-sky border-b-2 border-b-dark-gray"
                  : "hover:text-white border-b-2 border-b-dark-gray hover:border-b-sky"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-sky border-b-2 border-b-dark-gray"
                  : "hover:text-white border-b-2 border-b-dark-gray hover:border-b-sky"
              }
            >
              Contact
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};
