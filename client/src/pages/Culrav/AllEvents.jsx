import EventCard from '@/Components/Culrav/EventCard';
import roller from '@/images/disc.png'; // Assuming roller image is imported
import cardBg from '@/images/image.png';
function CulravEvents() {
    const events = Array(9).fill({
        image: cardBg,
        title: "", // Add actual event titles as needed
    });

    return (
        <div
            className="culrav-background flex flex-col justify-center items-center pt-[30%] sm:pt-[20%] md:pt-[15%] lg:pt-[10%] p-[10%]  bg-center bg-cover"
            >
           <h1 
                className="bg-[#F54E25] font-bionix text-[#FFFAF0] font-bold text-center mb-8 "
                style={{
                    fontSize: 'clamp(1.2rem, 3.5vw, 2.5rem)', // Responsive font size
                    width: 'clamp(150px, 30%, 300px)', // Responsive width
                }}
            >
                EVENTS
            </h1>


            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4k:grid-cols-5 gap-6 md:gap-10 lg:gap-20 justify-items-center items-center w-full h-full">
                {events.map((event, index) => (
                    <div key={index} className="relative group flex flex-col items-center w-full h-[400px] sm:h-[450px] md:h-[480px] lg:h-[400px] xl:h-[550px] overflow-hidden">
                        {/* Card Container */}
                        <EventCard roller={roller} event={event}/>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CulravEvents;
