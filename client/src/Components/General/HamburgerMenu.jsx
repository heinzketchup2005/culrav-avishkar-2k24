import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "@/redux/auth/authSlice";
import useAuth from "../../lib/useAuth";

import hamburgerBg from "../../assets/Home/HamburgerBg.jpg"

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(signoutSuccess());
    navigate("/login");
  };

  return (
    <div className="relative">
      <div className="z-[90] fixed top-4 right-4">
        <Hamburger
          toggled={isOpen}
          toggle={toggleMenu}
          color="#fff"
          size={30}
        />
      </div>

      <div
      className={`fixed inset-0 py-16 w-full h-full text-white transition-all duration-700 ease-in-out transform ${
        isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } z-40`}
      style={{
        backgroundImage: `url(${hamburgerBg})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
      }}
    >
        <nav className="flex flex-col justify-center gap-12 items-center h-full relative text-4xl font-bebas text-navlink">
          <div className="logo absolute w-32 h-14 bg-red-500 -top-[5.5vh] left-4"></div>
          <ul className="flex flex-col items-center justify-center gap-1">
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
              <a href="/team">TEAM</a>
            </li>
            <li className="py-2 px-4 hover:text-register transition-all duration-300 ease-in-out">
              <a href="/sponsors">SPONSORS</a>
            </li>
            <li className="py-2 px-4 hover:text-register transition-all duration-300 ease-in-out">
              <a href="/schedule">SCHEDULE</a>
            </li>
          </ul>
          {auth ? (
            <>
              <button
                className={`md:flex w-[9.8rem] h-[4rem] tracking-wider bg-register text-white items-center justify-center font-semibold font-bebas hover:text-register hover:bg-white transition-all duration-500 ${
                  isOpen ? "block" : "hidden"
                }`}
                onClick={() => {
                  navigate("/dashboard");
                }}
              >
                <h1 className="text-[2.2rem]">PROFILE</h1>
              </button>
            </>
          ) : (
            <button
              className={`md:flex w-[9.8rem] h-[4rem] tracking-wider bg-register text-white items-center justify-center font-semibold font-bebas hover:text-register hover:bg-white transition-all duration-500 ${
                isOpen ? "block" : "hidden"
              }`}
              onClick={() => {
                navigate("/registration");
              }}
            >
              <h1 className="text-[2.2rem]">REGISTER</h1>
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};

export default HamburgerMenu;