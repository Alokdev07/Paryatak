import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SmartOwnershipAnimation = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const containerRef = useRef(null);
  const tl = useRef();
  const autoPlayInterval = useRef();

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    // Card 1 to Card 2 animation
    tl.current
      .to('#card1 .feature', {
        duration: 0.5,
        opacity: 0,
        y: -20,
        stagger: 0.1,
        ease: "power2.in"
      })
      .to('#card1 h2', {
        duration: 0.5,
        opacity: 0,
        y: -20,
        ease: "power2.in"
      }, "-=0.3")
      .set('#card1', { opacity: 0 })
      .set('#card2', { opacity: 1 })
      .from('#card2 h2', {
        duration: 0.7,
        opacity: 0,
        y: 40,
        ease: "elastic.out(1, 0.5)"
      });

    // Card 2 to Card 3 animation
    tl.current
      .to('#card2 h2', {
        duration: 0.5,
        opacity: 0,
        scale: 0.8,
        ease: "power2.in"
      }, "+=1")
      .set('#card2', { opacity: 0 })
      .set('#card3', { opacity: 1 })
      .from('#card3 h2', {
        duration: 1,
        opacity: 0,
        scale: 1.5,
        ease: "back.out(1.7)"
      });

    // Card 3 back to Card 1 animation
    tl.current
      .to('#card3 h2', {
        duration: 0.5,
        opacity: 0,
        scale: 0.8,
        ease: "power2.in"
      }, "+=1")
      .set('#card3', { opacity: 0 })
      .set('#card1', { opacity: 1 })
      .from('#card1 h2', {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: "power2.out"
      })
      .from('#card1 .feature', {
        duration: 0.5,
        opacity: 0,
        y: 20,
        stagger: 0.1,
        ease: "power2.out"
      }, "-=0.3");

    autoPlayInterval.current = setInterval(() => {
      goToCard((currentCard + 1) % 3);
    }, 3000);

    return () => {
      if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
      if (tl.current) tl.current.kill();
    };
  }, []);

  const goToCard = (index) => {
    if (index > currentCard) {
      if (currentCard === 0 && index === 1) {
        tl.current?.play();
      } else if (currentCard === 1 && index === 2) {
        tl.current?.play();
      } else if (currentCard === 2 && index === 0) {
        tl.current?.play();
      }
    } else {
      if (currentCard === 1 && index === 0) {
        tl.current?.reverse();
      } else if (currentCard === 2 && index === 1) {
        tl.current?.reverse();
      } else if (currentCard === 0 && index === 2) {
        tl.current?.reverse();
      }
    }
    setCurrentCard(index);
  };

  const handleMouseEnter = () => {
    if (autoPlayInterval.current) clearInterval(autoPlayInterval.current);
  };

  const handleMouseLeave = () => {
    autoPlayInterval.current = setInterval(() => {
      goToCard((currentCard + 1) % 3);
    }, 3000);
  };

  return (
    <section className="bg-[#0d1117] py-20 px-5 text-center">
      <div 
        ref={containerRef}
        className="max-w-4xl mx-auto relative h-80"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          id="card1" 
          className={`absolute w-full h-full bg-[#0d1117] rounded-xl shadow-lg flex flex-col justify-center items-center p-8 ${currentCard === 0 ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-4xl text-gray-800 mb-8">Smart Ownership</h2>
          <div className="flex justify-around w-full max-w-2xl">
            <div className="feature text-center p-4 rounded-lg bg-gray-50 min-w-[150px]">
              <h3 className="text-xl text-gray-700 mb-2">Initial Payment</h3>
              <p className="text-gray-600">10%</p>
            </div>
            <div className="feature text-center p-4 rounded-lg bg-gray-50 min-w-[150px]">
              <h3 className="text-xl text-gray-700 mb-2">Installment Plan</h3>
              <p className="text-gray-600">5 years, 0% overpayment</p>
            </div>
            <div className="feature text-center p-4 rounded-lg bg-gray-50 min-w-[150px]">
              <h3 className="text-xl text-gray-700 mb-2">Rental Income</h3>
              <p className="text-gray-600">15% return</p>
            </div>
          </div>
        </div>
        
        <div 
          id="card2" 
          className={`absolute w-full h-full bg-[#0d1117] rounded-xl shadow-lg flex flex-col justify-center items-center p-8 ${currentCard === 1 ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-4xl text-gray-800">Smart Ownership</h2>
        </div>
        
        <div 
          id="card3" 
          className={`absolute w-full h-full bg-[#0d1117] rounded-xl shadow-lg flex flex-col justify-center items-center p-8 ${currentCard === 2 ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-5xl text-blue-600">Smart Ownership</h2>
        </div>
      </div>
      
      <div className="controls mt-10">
        <button 
          className="control-btn bg-transparent border-none text-2xl mx-4 cursor-pointer text-gray-100 hover:text-gray-900 transition-colors"
          onClick={() => goToCard((currentCard - 1 + 3) % 3)}
        >
          ←
        </button>
        {[0, 1, 2].map((index) => (
          <span 
            key={index}
            className={`inline-block w-3 h-3 rounded-full mx-1 cursor-pointer transition-colors ${currentCard === index ? 'bg-gray-800' : 'bg-gray-300'}`}
            onClick={() => goToCard(index)}
          />
        ))}
        <button 
          className="control-btn bg-transparent border-none text-2xl mx-4 cursor-pointer text-gray-100 hover:text-gray-900 transition-colors"
          onClick={() => goToCard((currentCard + 1) % 3)}
        >
          →
        </button>
      </div>
    </section>
  );
};

export default SmartOwnershipAnimation;
