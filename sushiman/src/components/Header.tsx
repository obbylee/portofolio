import { useState } from "react";
import { menu, search } from "../assets";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <header>
      <nav className="header__nav max-md:bg-primary-color">
        <div className="header__logo max-sm:pl-0">
          <h4 data-aos="fade-down">sushiman</h4>
          <div className="header__logo-overlay"></div>
        </div>

        <ul className="header-menu max-md:hidden" data-aos="fade-down">
          <li>
            <a href="#menu">Menu</a>
          </li>
          <li>
            <a href="#food">Food</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#about-us">About Us</a>
          </li>
          <li>
            <img src={search} alt="search" />
          </li>
        </ul>

        <ul className="header__menu-mobile max-md:flex" data-aos="fade-down">
          <li onClick={() => setToggle((prev) => !prev)}>
            <img
              src={menu}
              alt="menu"
              className="w-[50px] h-[50px] object-contain"
            />
          </li>
        </ul>

        <div
          className={
            toggle
              ? "absolute w-full bg-color-creamson z-20"
              : "hidden absolute w-full bg-color-creamson z-20"
          }
        >
          <div className="py-2.5 px-5 flex justify-end items-center">
            <img
              onClick={() => setToggle((prev) => !prev)}
              src={menu}
              alt="menu"
              className="w-[46px] h-[46px] px-2 object-contain bg-primary-color rounded-md"
            />
          </div>

          <ul className="flex-center flex-col gap-5">
            <li
              onClick={() => setToggle((prev) => !prev)}
              className="w-full text-center p-5 text-xl font-medium font-plus-jakarta-sans text-secondary-color uppercase cursor-pointer hover:bg-primary-color hover:bg-opacity-80 hover:text-white"
            >
              <a href="#menu">Menu</a>
            </li>
            <li
              onClick={() => setToggle((prev) => !prev)}
              className="w-full text-center p-5 text-xl font-medium font-plus-jakarta-sans text-secondary-color uppercase cursor-pointer hover:bg-primary-color hover:bg-opacity-80 hover:text-white"
            >
              <a href="#food">Food</a>
            </li>
            <li
              onClick={() => setToggle((prev) => !prev)}
              className="w-full text-center p-5 text-xl font-medium font-plus-jakarta-sans text-secondary-color uppercase cursor-pointer hover:bg-primary-color hover:bg-opacity-80 hover:text-white"
            >
              <a href="#services">Services</a>
            </li>
            <li
              onClick={() => setToggle((prev) => !prev)}
              className="w-full text-center p-5 text-xl font-medium font-plus-jakarta-sans text-secondary-color uppercase cursor-pointer hover:bg-primary-color hover:bg-opacity-80 hover:text-white"
            >
              <a href="#about-us">About Us</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
