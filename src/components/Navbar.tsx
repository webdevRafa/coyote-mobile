import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-full bg-dark-gray fixed top-0 left-0 px-4 z-50 pb-3 fades">
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
          <div className="text-2xl font-bold">Logo</div>
          <div className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-sky" : "")}
            >
              Home
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) => (isActive ? "text-sky" : "")}
            >
              Services
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) => (isActive ? "text-sky" : "")}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "text-sky" : "")}
            >
              Contact
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};
