
function EventCard({ roller, event }) {
  return (
   <div className="relative w-full h-full  flex flex-col justify-between overflow-hidden transition-transform duration-500 ease-out ">
        {/* Roller Image (transition effect) */}
        <div className="absolute top-[30%] left-0 w-full h-full">
            <div
                className="absolute inset-0 bg-no-repeat bg-center transition-transform duration-500 ease-out transform translate-y-0 group-hover:-translate-y-[30%] z-0"
                style={{
                    backgroundImage: `url(${roller})`,
                    backgroundSize: 'contain',
                    height: '80%',
                }}
            />
        </div>

        {/* Event Image */}
        <div className="absolute z-10 bottom-0 w-full h-[70%] overflow-hidden">
            <img
                src={event.image}
                alt="Event"
                className="w-full h-full object-fill"
            />
        </div>
          <div className="absolute z-20 bottom-0 w-full px-2 flex justify-center items-center h-[30%]">
          <div className="absolute bottom-0 left-0 w-full px-2 z-20 flex justify-center"> {/* Added flex justify-center */}
              {/* Sliding White Background */}
              <div className="absolute inset-0 bg-[#181818] transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              {/* Sliding Explore Text */}
              <span
                  className="relative font-bionix text-[#FFFAF0] text-center transform translate-x-[100%] group-hover:translate-x-0 transition-transform duration-500 opacity-0 group-hover:opacity-100 flex justify-center items-center h-full"
                  style={{
                      fontSize: 'clamp(1rem, 5vw, 2rem)',
                      width: 'clamp(150px, 40%, 300px)', // Adjusted text scaling for custom breakpoints
                  }}
              >
                  <span className="hover:text-[#F54E25] group-hover:text-[2.5rem] transition-all duration-300"> {/* Inner span for hover effects */}
                      Explore
                  </span>
              </span>
          </div>
      </div>


      {/* Add custom CSS for responsive behavior */}
            <style jsx>{`
                @media (min-width: 400px) and (max-width: 570px) {
                    .relative {
                        max-width: 90%; /* Ensure width is consistent between 400px and 640px */
                    }
                    
                }
                @media (min-width: 570px) and (max-width: 640px) {
                    .relative {
                        max-width: 70%; /* Ensure width is consistent between 400px and 640px */
                    }
                }
            `}</style>
    </div>
  );
}

export default EventCard;
