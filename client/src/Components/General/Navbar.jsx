import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  return (
    <div className="w-[100vw] h-[92px] px-4 py-2 fixed bg-scheduleLargeText flex items-center justify-between z-50">
      
      <div className="logo w-[30px] h-[90%] md:w-36 bg-transparent md:bg-zinc-600"></div>
      
      <div className="navlinks w-[67%] hidden md:flex text-navlink h-full items-center justify-between font-bebas md:text-[1.6vw]">
        <h1 className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300">
          CULRAV
        </h1>
        <h1 className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300">
          AVISHKAR
        </h1>
        <h1 className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300">
          GALLERY
        </h1>
        <h1 className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300">
          TEAM
        </h1>
        <h1 className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300">
          SPONSORS
        </h1>
        <h1 className="hover:text-register tracking-widest transition-colors cursor-pointer duration-300">
          SCHEDULE
        </h1>
      </div>

      <div className="md:hidden flex items-center">
        <HamburgerMenu />
      </div>

      <button className="auth hidden md:flex md:w-[11vw] lg:w-[7.1vw] h-[47px] tracking-wider bg-register text-white items-center justify-center font-semibold font-bebas hover:text-register hover:bg-white transition-all duration-500">
        <h1 className="lg:text-[1.2vw] md:text-[1.5vw]">REGISTER</h1>
      </button>
    </div>
  );
};

export default Navbar;