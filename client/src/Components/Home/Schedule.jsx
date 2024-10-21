import BlackRoller from "./BlackRoller";
import ScheduleCard from "./ScheduleCard";
// assets Import 
import girlLeft from "../../assets/Home/girlLeft.png"
import girlRight from "../../assets/Home/girlRight.png"
import Radio from "../../assets/Home/radio.png"
import Scrubble1 from "../../assets/Home/scrubble1.png"
import Scrubble2 from "../../assets/Home/scrubble2.png"

const Schedule = () => {
  return (
    <div
      className="min-h-[200vh] overflow-hidden bg-[#202020]/100"
      style={{ backgroundImage: "url('/grid.png')" }}
    >
      <div className="h-[100vh] md:h-[130vh] relative">
        <div className="md:pt-36 pt-14 md:px-12 flex md:h-[90vh] h-full flex-col gap-16 justify-center items-center">
          <div className="md:w-[78vw] md:h-[22vh] w-[90%] flex items-center justify-center">
            <p className="w-full text-center flex items-center justify-center font-bebas leading-5 text-white md:w-[60vw] md:text-2xl md:leading-normal">
              CULRAV-AVISHKAR 2024, Techno-Cultural Fest at MNNIT Allahabad, Prayagraj, is an electrifying extravaganza that seamlessly merges technology with cultural diversity. Featuring dynamic competitions, captivating performances, and insightful workshops, it serves as a melting pot of innovation and expression.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <div className="md:w-96 md:h-72 h-60 w-60  bg-white"></div>
            <div className="md:w-96 md:h-72 h-60 w-60 bg-white"></div>
          </div>
        </div>
        <div className="hidden md:block h-[40vh] relative w-full">
          <div className="w-full h-full flex items-center justify-center gap-[4vw]">
            <div className="w-[25vw] h-[17vw] custom1560:h-[23vw] transform -rotate-6 -scale-x-[-1] z-[1]">
              <img src={Scrubble1} alt="" />
            </div>
            <div className="w-[32vw] h-[26vw] transform top-0 z-[1] relative md:top-[2vw] custom1110:top-[3vw] custom1560:top-[3.9rem] custom1840:top-[6rem] custom1980:top-[8vw] custom1980:scale-[1.2]
custom1980:left-[8rem]">
              <img src={Radio} alt="" />
            </div>
            <div className="w-[28vw] h-[17vw] custom1560:h-[23vw] transform -rotate-6 -scale-x-[-1] z-[1]">
              <img src={Scrubble2} alt="" />
            </div>
          </div>
          <div
            className="hidden md:block h-[40vh] bg-scheduleOrange z-20 w-[109vw] absolute -bottom-[1px]"
            style={{
              clipPath: "polygon(23% 63%, 60% 63%, 100% 100%, 0% 100%)",
            }}
          ></div>
          <div
            className="hidden md:block h-[40vh] w-[109vw] bg-white z-10 absolute bottom-[5px]"
            style={{
              clipPath: "polygon(23% 63%, 60% 63%, 100% 100%, 0% 100%)",
            }}
          ></div>
        </div>
      </div>

      <div className="h-[100vh] z-20">
        <div className=" h-full z-20 bg-scheduleOrange relative md:flex md:flex-col md:justify-center md:items-center">
          <div className="hidden z-10  md:block absolute -bottom-[9rem] -left-[4.4rem] md:left-[-2.7rem] md:bottom-[-5.5rem] scale-[0.6] md:scale-75 custom1560:left-[0rem] custom1560:scale-100 custom1980:scale-[1.2] custom1980:left-[-4px]">
            <img className="relative z-10 custom1980:bottom-28 custom1980:left-8" src={girlLeft} alt="Girl Left" />
          </div>
          <div className="md:hidden absolute -right-[4.2rem] -bottom-[9rem] md:right-[-2.7rem] md:bottom-[-5.5rem] scale-[0.6] custom1560:scale-100 custom1560:right-[0rem] md:scale-75 custom1980:scale-[1.2] custom1980:right-[-4px]">
            <img className="relative custom1980:bottom-28 custom1980:right-8" src={girlRight} alt="Girl Right" />
          </div>
          <div className="h-[15%] z-50 flex mt-7 justify-center items-center">
            <h1 className="text-[35px] text-white md:text-4xl font-bionix">SCHEDULE</h1>
          </div>

          <div className="py-5 px-4 h-[78%] flex flex-col items-center">
            <div className="hidden md:flex md:flex-wrap gap-4 md:justify-center">
              <div className="flex flex-wrap gap-5 justify-center w-full">
                <ScheduleCard day={1} date={11} />
                <ScheduleCard day={2} date={12} />
                <ScheduleCard day={3} date={13} />
              </div>
              <div className="flex flex-wrap gap-5 justify-center w-full">
                <ScheduleCard day={4} date={14} />
                <ScheduleCard day={5} date={15} />
                <ScheduleCard day={6} date={16} />
              </div>
            </div>

            <div className="relative -top-8 flex flex-wrap gap-3 justify-center md:hidden">
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <ScheduleCard day={1} date={11} />
                <ScheduleCard day={2} date={12} />
              </div>
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <ScheduleCard day={3} date={13} />
                <ScheduleCard day={4} date={14} />
              </div>
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <ScheduleCard day={5} date={15} />
                <ScheduleCard day={6} date={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlackRoller/>
    </div>
  );
};

export default Schedule;
