import { ImFacebook2 } from "react-icons/im";
import { TiSocialInstagram } from "react-icons/ti";

export const Footer: React.FC = () => {
  return (
    <>
      <div className="bg-gray w-full pt-10 pb-20">
        <h1 className="text-center text-white bg-dark-gray w-[150px] mx-auto py-1 px-3">
          The Networks
        </h1>
        <div className="mx-auto w-[100px] mt-5">
          <div className="flex gap-5 items-center ">
            <a href="https://www.facebook.com/moises.c.hernandez.1">
              <ImFacebook2 className="size-6 text-sky hover:text-white" />
            </a>
            <a href="https://www.instagram.com/dr.moiseshdz">
              <TiSocialInstagram className="size-8 text-sky hover:text-white" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
