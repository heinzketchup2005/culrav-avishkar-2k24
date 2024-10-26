import React from 'react';
import noise from '../../assets/Sc-assets/noise.png';
import grid from '../../assets/Sc-assets/Grid.png';
import elements from '../../assets/Sc-assets/element.png';

const Schedule = () => {
  return (
    <div className="relative w-full h-screen md:h-[1634px] bg-[#202020]">
      {/* Background Layer 1 - Noise */}
      <img
        src={noise}
        alt="Noise Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Background Layer 2 - Grid */}
      <img
        src={grid}
        alt="Grid Overlay"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />

      {/* Background Layer 3 - Elements (Top Only) */}
      <img
        src={elements}
        alt="Design Elements"
        className="absolute top-0 left-0 w-full h-auto max-h-[400px] object-cover"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-16 md:py-32">
        <h1
          className="text-white font-extrabold"
          style={{
            fontFamily: '"MOON GET!"',
            fontSize: '48px',
            fontStyle: 'normal',
            lineHeight: 'normal',
          }}
        >
          DAY 1
        </h1>
        <p
          className="mt-4"
          style={{
            color: '#F54E25',
            fontFamily: '"MOON GET!"',
            fontSize: '24px',
            fontWeight: '800',
            fontStyle: 'normal',
            lineHeight: 'normal',
          }}
        >
          November 9, 2024
        </p>

        {/* Main Box */}
        <div className="flex flex-col items-center gap-9 mt-16 md:grid md:grid-cols-3 md:gap-8 md:w-[1220px] w-full p-2">
          {/* 3 Sub-divs */}
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex flex-col items-center md:items-start sm:gap-2 gap-4  p-2">
              {/* 3 Inner Boxes */}
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center justify-between gap-4 bg-[#FFFAF0]
             sm:w-[320px] sm:h-[72px] sm:flex-row 
             md:w-[368px] md:h-auto md:flex-col md:justify-end md:pt-[10px] md:gap-[23px]"             >
                  {/* Top Black Box */}
                  <div className="flex justify-center items-center bg-[#181818]
                sm:w-[33px] sm:h-[13px] sm:flex-shrink-0 
                md:w-[100px] md:h-[40px] md:gap-2 md:flex-col">
                  <p className="text-xs sm:text-sm md:text-lg text-white md:font-bold md:tracking-wide md:leading-6"
                  style={{
                  color: '#FFFAF0',
                  fontFamily: '"MOON GET!"',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  }}
                  >
                  Spandan
                  </p>
                  </div>


                  {/* Main Text */}
                  <p 
                    className="text-center uppercase mt-8 md:mt-12 md:text-lg md:font-bold md:tracking-wide md:leading-6"
                    style={{
                      color: '#181818',
                      fontFamily: '"MOON GET!"',
                      fontSize: '14px',
                      fontWeight: '800',
                      letterSpacing: '0.84px',
                      lineHeight: '23px',
                    }}
                  >
                    MR AND<br />MISS SPANDAN
                  </p>

                  {/* Bottom Orange Box */}
                  <div className="flex justify-center items-center h-[72px] md:h-[102px] md:w-full bg-[#F54E25] mt-auto sm:h-full sm:w-full sm:flex-col sm:justify-center">
                    <p
                      style={{
                        color: '#FFFAF0',
                        fontFamily: '"MOON GET!"',
                        fontSize: '12px',
                        fontWeight: '800',
                        letterSpacing: '0.72px',
                        textTransform: 'uppercase',
                        lineHeight: '23px',
                      }}
                    >
                      09 AM - 10 AM
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;