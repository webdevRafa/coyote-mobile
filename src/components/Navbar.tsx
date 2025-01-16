export const Navbar: React.FC = () => {
  return (
    <>
      <div className="w-full bg-dark-gray fixed top-0 left-0 px-4 z-50">
        <nav className="w-full h-full flex justify-center">
          <ul className="flex font-bold text-sky">
            <li className="cursor-pointer hover:text-white hover:bg-gray hover:scale-110 w-full h-full p-5 transition-all duration-150 ease-in-out">
              Home
            </li>
            <li className="cursor-pointer hover:text-white hover:bg-gray hover:scale-110 w-full h-full p-5 transition-all duration-150 ease-in-out">
              About
            </li>
            <li className="cursor-pointer hover:text-white hover:bg-gray hover:scale-110 w-full h-full p-5 transition-all duration-150 ease-in-out">
              Dashboard
            </li>
            <li className="cursor-pointer hover:text-white hover:bg-gray hover:scale-110 w-full h-full p-5 transition-all duration-150 ease-in-out">
              Contact
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
