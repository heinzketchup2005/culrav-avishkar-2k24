import { useState } from 'react';
import Hamburger from 'hamburger-react';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="z-[90] fixed top-4 right-4">
        <Hamburger toggled={isOpen} toggle={toggleMenu} color="#fff" size={30} />
      </div>

      <div
        className={`fixed inset-0 py-16 w-full h-full bg-zinc-800 text-white transition-all duration-700 ease-in-out transform ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        } z-40`}
      >
        <nav className="flex flex-col justify-center gap-32 items-center h-full text-4xl font-bebas text-navlink">
          <ul className="flex flex-col items-center justify-center gap-4">
            <li className="py-2 px-4 hover:text-register transition-all duration-300 ease-in-out">
              <a href="#">CULRAV</a>
            </li>
            <li className="py-2 px-4 hover:text-register transition-all duration-300 ease-in-out">
              <a href="#">AVISHKAR</a>
            </li>
            <li className="py-2 px-4 hover:text-register transition-all duration-300 ease-in-out">
              <a href="#">GALLERY</a>
            </li>
            <li className="py-2 px-4 hover:text-register transition-all duration-300 ease-in-out">
              <a href="#">TEAM</a>
            </li>
            <li className="py-2 px-4 hover:text-register transition-all duration-300 ease-in-out">
              <a href="#">SPONSORS</a>
            </li>
            <li className="py-2 px-4 hover:text-register transition-all duration-300 ease-in-out">
              <a href="#">SCHEDULE</a>
            </li>
          </ul>
          <button className={`md:flex w-[9.8rem] h-[4rem] tracking-wider bg-register text-white items-center justify-center font-semibold font-bebas hover:text-register hover:bg-white transition-all duration-500 ${isOpen ? 'block' : 'hidden'}`}>
            <h1 className="text-[2.2rem]">REGISTER</h1>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;
