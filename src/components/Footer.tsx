import { ImFacebook2 } from "react-icons/im";
import { TiSocialInstagram } from "react-icons/ti";

export const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-gray w-full pt-10 pb-20 flex items-center justify-center">
        <h1 className="text-shade bg-dark-gray py-2 px-4 text-lg mr-5 font-poppins">
          THE NETWORKS
        </h1>
        <a href="https://www.facebook.com/moises.c.hernandez.1">
          <ImFacebook2 className="size-7 mr-1 text-sky transition duration-300 hover:text-white" />
        </a>
        <a href="https://www.instagram.com/rgvchiro">
          <TiSocialInstagram className="size-10 text-sky transition duration-300 hover:text-white" />
        </a>
      </div>
    </>
  );
};
