// import EventCard from '@/Components/Avishkar/EventCard';
// import aviskharbg from '@/images/aviskar-bg.png';
// import hoverimage from '@/images/hoveraviskhar.png';
// import cardBg from '@/images/imageavishkar.png';
// function AvishkarEvents() {
//     const events = Array(9).fill({
//         image: cardBg,
//         hoverImage: hoverimage,
//         title: "", // Add actual event titles as needed
//     });

//     return (
        
//            <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#181818] px-4 sm:px-6 lg:px-8  pt-[20%]"
//            style={{ backgroundImage: `url(${aviskharbg})` }}>
             
//             <h1
//                 className="bg-[#F54E25] font-bionix text-[#FFFAF0] font-bold text-center p-4 mb-8"
//                 style={{
//                     fontSize: 'clamp(1.2rem, 4vw, 3rem)', // Responsive font size
//                     width: 'clamp(150px, 30%, 300px)', // Responsive width
//                 }}
//             >
//                 EVENTS
//             </h1>



//             <div className="grid grid-cols-1 w-full xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4k:grid-cols-5 gap-6 md:gap-10 lg:gap-20 justify-items-center items-center  h-full p-[5%] pb-[10%]">
//                 {events.map((event, index) => (
//                     <div key={index} className="relative group flex flex-col items-center w-full h-[450px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden">
//                         {/* Card Container */}
//                         <EventCard  event={event} />
                        
//                     </div>
//                 ))}
//             </div>
//             </div>
            
//     );
// }

// export default AvishkarEvents;
import EventCard from '@/Components/Avishkar/EventCard';
import aviskharbg from '@/images/aviskar-bg.png';
import hoverimage from '@/images/hoveraviskhar.png';
import cardBg from '@/images/imageavishkar.png';

function AvishkarEvents() {
    const events = Array(9).fill({
        image: cardBg,
        hoverImage: hoverimage,
        title: "", // Add actual event titles as needed
    });

    return (
        <div
            className="flex flex-col items-center justify-center min-h-screen w-full bg-[#181818] px-4 sm:px-6 lg:px-8 pt-[30%] sm:pt-[20%] md:pt-[15%] lg:pt-[10%]"
            style={{ backgroundImage: `url(${aviskharbg})` }}
        >
            <h1
                className="bg-[#F54E25] font-bionix text-[#FFFAF0] font-bold text-center mb-8"
                style={{
                    fontSize: 'clamp(1.2rem, 3.5vw, 2.5rem)', // Responsive font size
                    width: 'clamp(140px, 30%, 300px)', // Responsive width
                }}
            >
                EVENTS
            </h1>

            <div className="grid grid-cols-1 w-full xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4k:grid-cols-5 gap-4 md:gap-6 lg:gap-10 justify-items-center h-full p-[5%] pb-[10%]">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="relative group flex flex-col items-center w-[90%] h-[300px] sm:h-[300px] md:h-[300px] lg:h-[360px]  p-[5%] overflow-hidden mb-[10%]"
                    >
                        <EventCard event={event} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AvishkarEvents;
