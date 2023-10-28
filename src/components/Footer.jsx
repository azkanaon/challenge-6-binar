import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[15vh] flex-col bg-gradient-to-t from-white/5 to-black flex justify-center items-center">
      <div className="w-10/12 md:w-6/12 flex justify-around text-white text-2xl">
        <Link
          to="https://github.com/azkanaon/challenge-6-binar"
          target="_blank"
        >
          <span className="inline-block duration-300 hover:scale-110 hover:translate-y-[-10px]">
            <ion-icon name="logo-github"></ion-icon>
          </span>
        </Link>
      </div>
      <h3 className="text-white pt-5">Copyright by Ajkaa, Kevin, Fatwa</h3>
    </div>
  );
};

export default Footer;
