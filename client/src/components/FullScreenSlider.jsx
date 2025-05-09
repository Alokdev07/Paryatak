import { useState } from "react";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import heroImage from '../assets/ganga.jpg';

const slides = [
  {
    image: heroImage,
    title: "Madla",
    subtitle: "Nature's beauty awaits",
    location: "Madhya Pradesh",
  },
  {
    image: 'https://s7ap1.scene7.com/is/image/incredibleindia/dawar-jammu-and-kashmir-rural-hero?qlt=82&ts=1726643529094',
    title: "Kedarnath",
    subtitle: "Spiritual peaks call you",
    location: "Uttarakhand",
  },
  {
    image: heroImage,
    title: "Jaisalmer",
    subtitle: "Golden desert charm",
    location: "Rajasthan",
  },
];

export default function Carousel3D() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-[#0d1117] overflow-hidden">
      {slides.map((slide, index) => {
        const position = index - current;
        let scale = "scale-75";
        let translate = "";
        let zIndex = 0;
        let opacity = "opacity-50";

        if (position === 0) {
          scale = "scale-100";
          translate = "translate-x-0";
          zIndex = 10;
          opacity = "opacity-100";
        } else if (position === -1 || position === slides.length - 1) {
          // Left slide
          scale = "scale-75";
          translate = "-translate-x-[60%]";
          zIndex = 5;
        } else if (position === 1 || (current === slides.length - 1 && index === 0)) {
          // Right slide
          scale = "scale-75";
          translate = "translate-x-[60%]";
          zIndex = 5;
        }

        return (
          <div
            key={index}
            className={`absolute transition-all duration-700 ease-in-out transform ${translate} ${scale} ${opacity}`}
            style={{
              zIndex,
              width: position === 0 ? "60%" : "30%",
              height: "75%",
              transform: `${translate} ${scale}`,
            }}
            
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
            />
            {position === 0 && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white bg-black/60 px-6 py-4 rounded-xl">
                <h2 className="text-3xl font-bold text-yellow-400">{slide.title}</h2>
                <p className="text-base mt-1">{slide.subtitle}</p>
                <div className="flex justify-center items-center mt-2">
                  <MapPin className="w-5 h-5 text-red-500 mr-1" />
                  <span className="font-medium">{slide.location}</span>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 bottom-1/2 transform translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-20"
      >
        <ArrowLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 bottom-1/2 transform translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-20"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
