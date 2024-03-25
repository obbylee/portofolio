import { facebook, instagram, twitter } from "../assets";

const Footer = () => {
  return (
    <footer className="flex-between w-full py-5 px-10 bg-white flex-wrap gap-5 overflow-hidden">
      <h3 className="text-2xl font-bold font-playfair-display uppercase text-secondary-color cursor-pointer">
        <span className="text-primary-color">Sushi</span>man
      </h3>

      <ul className="flex flex-wrap flex-row gap-16 last:gap-8">
        <li className="text-base font-medium font-plus-jakarta-sans uppercase text-secondary-color cursor-pointer">
          <a href="#menu">Menu</a>
        </li>
        <li className="text-base font-medium font-plus-jakarta-sans uppercase text-secondary-color cursor-pointer">
          <a href="#food">Food</a>
        </li>
        <li className="text-base font-medium font-plus-jakarta-sans uppercase text-secondary-color cursor-pointer">
          <a href="#services">Services</a>
        </li>
        <li className="text-base font-medium font-plus-jakarta-sans uppercase text-secondary-color cursor-pointer">
          <a href="#about-us">About Us</a>
        </li>
      </ul>

      <ul className="flex flex-wrap flex-row gap-16 last:gap-8">
        <li className="flex-center w-10 h-10 bg-secondary-color rounded-full">
          <img
            src={facebook}
            alt="facebook"
            className="w-[45%] h-[45%] object-contain"
          />
        </li>
        <li className="flex-center w-10 h-10 bg-secondary-color rounded-full">
          <img
            src={instagram}
            alt="instagram"
            className="w-[45%] h-[45%] object-contain"
          />
        </li>
        <li className="flex-center w-10 h-10 bg-secondary-color rounded-full">
          <img
            src={twitter}
            alt="twitter"
            className="w-[45%] h-[45%] object-contain"
          />
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
