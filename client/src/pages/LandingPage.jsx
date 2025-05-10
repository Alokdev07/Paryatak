import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import NavBar from "../components/NavBar.jsx";
import '../App.css';
import heroImage from '../assets/ganga.jpg';
import Slide from '../components/FullScreenSlider.jsx'
import FlightBookingUI from "../components/FlightBookingUi.jsx";
import { useState,useEffect } from "react";
import teamImg1 from "../assets/ganga.jpg";
import teamImg2 from "../assets/ganga.jpg";
import teamImg3 from "../assets/ganga.jpg";
import heroImg from "../assets/ganga.jpg"; 
import SmartOwnershipAnimation from "../components/SmartOwnershipAnimation .jsx";

gsap.registerPlugin(ScrollTrigger);

const allSections = document.querySelectorAll("section");

export default function LandingPage() {
  useGSAP(() => {
    // Basic entry animations
    gsap.from(".intro-text", { opacity: 0, y: -60, duration: 1.4, ease: "power3.out" });
    gsap.from(".intro-subtext", { opacity: 0, y: -20, duration: 1, delay: 0.3, ease: "power2.out" });
    gsap.from(".intro-features p", {
      opacity: 0,
      y: 20,
      duration: 1,
      stagger: 0.2,
      delay: 0.6
    });
    gsap.from(".intro-buttons button", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 1.2,
      stagger: 0.3,
      ease: "back.out(1.7)"
    });

    gsap.to(".carousel", { x: "-50%", repeat: -1, ease: "linear", duration: 20 });
    gsap.from(".prize-box", { opacity: 0, y: 30, duration: 1, delay: 0.5, stagger: 0.3 });
    gsap.from(".footer", { opacity: 0, y: 50, duration: 1.5, delay: 1 });

    // Zoom-in effect for sections on scroll
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.fromTo(
            section,
            { scale: 0.95, opacity: 0.8, x: 0, y: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              clearProps: "all"
            }
          );
        },
        onLeave: () => {
          gsap.to(section, {
            scale: 0.95,
            opacity: 0.8,
            duration: 0.5,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          gsap.fromTo(
            section,
            { scale: 0.95, opacity: 0.8 },
            {
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              clearProps: "all"
            }
          );
        },
        onLeaveBack: () => {
          gsap.to(section, {
            scale: 0.95,
            opacity: 0.8,
            duration: 0.5,
            ease: "power2.in"
          });
        }
      });
    });

    // Specific animations
    ScrollTrigger.create({
      trigger: ".intro-text",
      start: "top center",
      end: "bottom top",
      onEnter: () => {
        gsap.fromTo(".intro-text", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, ease: "bounce.out" });
      },
      onLeaveBack: () => {
        gsap.to(".intro-text", { opacity: 0, scale: 0.8, duration: 1, ease: "power2.in" });
      }
    });

    ScrollTrigger.create({
      trigger: ".carousel",
      start: "top center",
      end: "bottom top",
      onEnter: () => {
        gsap.fromTo(".carousel", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.4, ease: "bounce.out" });
      },
      onLeaveBack: () => {
        gsap.to(".carousel", { opacity: 0, scale: 0.8, duration: 1, ease: "power2.in" });
      }
    });

    ScrollTrigger.create({
      trigger: ".prize-box",
      start: "top 70%",
      end: "bottom 30%",
      onEnter: () => {
        gsap.fromTo(".prize-box", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, ease: "bounce.out" });
      },
      onLeaveBack: () => {
        gsap.to(".prize-box", { opacity: 0, y: 100, duration: 1, ease: "power2.in" });
      }
    });

    ScrollTrigger.create({
      trigger: ".footer",
      start: "top 90%",
      onEnter: () => {
        gsap.fromTo(".footer", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" });
      }
    });

    // Highlight only active section
    allSections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          allSections.forEach((s, i) => {
            if (i !== index) {
              gsap.to(s, {
                scale: 0.95,
                opacity: 0.8,
                duration: 0.3,
                ease: "power1.inOut"
              });
            }
          });

          gsap.to(section, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          });
        },
        onEnterBack: () => {
          allSections.forEach((s, i) => {
            if (i !== index) {
              gsap.to(s, {
                scale: 0.95,
                opacity: 0.8,
                duration: 0.3,
                ease: "power1.inOut"
              });
            }
          });

          gsap.to(section, {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          });
        }
      });
    });
  }, []);



  return (
    <div className="font-sans text-white bg-[#0d1117]">
      {/* Page 1: Introduction */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 pt-12 pb-0 overflow-hidden">
  
  <video
    className="absolute top-0 left-0 w-full h-full object-cover opacity-40 z-0"
    autoPlay
    muted
    loop
    playsInline
  >
    <source src="/videos/incredible-india.mp4" type="video/mp4" />
   
  </video>


  <div className="relative z-10 text-white">
    <h1 className="text-5xl font-bold intro-text">Explore the World with Us</h1>
    <p className="mt-4 text-xl text-gray-200 intro-subtext max-w-2xl">
      Unleash your wanderlust with personalized adventures, budget-friendly trips, and premium experiences.
    </p>
    <div className="mt-6 space-y-2 intro-features">
      <p className="text-lg">🛏️ Book Hotels Easily</p>
      <p className="text-lg">🎯 Discover Adventure Destinations</p>
      <p className="text-lg">🗺️ Plan & Customize Your Trips</p>
    </div>
    <div className="mt-10 flex flex-wrap gap-6 justify-center intro-buttons">
      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold rounded-full hover:scale-105 transition-transform">
        Get Started
      </button>
      <button className="px-6 py-3 border border-purple-500 text-purple-400 text-lg font-semibold rounded-full hover:bg-purple-600 hover:text-white transition-transform hover:scale-105">
        View Packages
      </button>
    </div>
  </div>
</section>


      {/* Page 2: Carousel */}
      <section className="overflow-hidden py-16 bg-[#0d1117]">
        <div className="whitespace-nowrap flex gap-8 animate-slide carousel px-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="min-w-[400px] bg-gradient-to-br from-[#161b22] to-[#1f2937] p-6 rounded-3xl shadow-2xl transition-transform transform hover:scale-105 duration-300 relative group border border-[#1f6feb] hover:border-[#58a6ff] hover:shadow-[0_0_25px_#1f6feb] carousel-item"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={`${heroImage}`}
                  alt={`Trending Place ${i + 1}`}
                  className="rounded-2xl object-cover w-full h-[280px] transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-5 overflow-x-hidden">
                <h3 className="text-2xl font-bold text-white mb-2 tracking-wide">
                  🌍 Place {i + 1}
                </h3>
                <p className="text-gray-400 text-base leading-relaxed">
                  A beautiful destination with rich culture and stunning landscapes.
                </p>

                <div className="mt-6">
                  <span className="inline-block bg-[#1f6feb] text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg transition-all duration-300 hover:bg-[#58a6ff]">
                    💰 Price: ${(i + 1) * 100}
                  </span>
                </div>
              </div>

              {/* Optional glowing border animation */}
              <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-[#1f6feb] pointer-events-none transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

  <section className="w-full px-4 py-20 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center bg-[#0d1117] rounded-3xl overflow-hidden shadow-lg">
        {/* LEFT SIDE */}
        <div className="p-10">
          <p className="text-white text-lg mb-4">
            At Golden Gate Properties, we offer more than just real estate services;
            we provide an unparalleled experience tailored to meet your needs and exceed
            your expectations.
          </p>

          {/* Team Section */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex -space-x-3">
              <img src={teamImg1} alt="Team 1" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src={teamImg2} alt="Team 2" className="w-10 h-10 rounded-full border-2 border-white" />
              <img src={teamImg3} alt="Team 3" className="w-10 h-10 rounded-full border-2 border-white" />
            </div>
            <span className="text-sm text-gray-200">Meet Our Professional Team</span>
          </div>

          {/* Stats */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-4xl font-bold text-gray-200">92+</h3>
              <p className="text-gray-200 text-right">Successful<br />Transactions Monthly</p>
            </div>
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-4xl font-bold text-gray-200">90</h3>
              <p className="text-gray-200 text-right">Customer<br />Satisfaction Rate</p>
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-4xl font-bold text-gray-200">462</h3>
              <p className="text-gray-200 text-right">Exquisite Properties<br />Ready for Your Selection</p>
            </div>
          </div>
        </div>

        
        <div className="relative h-[85%]">
          <img
            src={heroImg}
            alt="Dubai City"
            className="w-full h-full object-cover rounded-3xl"
          />

          
          <button className="absolute top-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-full text-sm font-semibold shadow">
            📞 Contact Us Now
          </button>

         
          <div className="absolute bottom-4 left-4 bg-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 w-[260px]">
            <img
              src={teamImg1}
              alt="Expert"
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div>
              <p className="text-xs text-gray-500">Special Offer</p>
              <p className="text-sm font-medium text-gray-800">Get The Consultation<br />With Our Expert</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Page 4: FAQ */}
    <section className="bg-[#0d1117] py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <p className="text-[#58a6ff] text-sm mb-4">• Explore Our Advantages</p>
    <h2 className="text-white text-5xl font-bold mb-4 leading-tight">
      Frequent Asked <br /> Questions
    </h2>
    <p className="text-gray-400 text-base mb-16 max-w-xl">
      At Monte, we offer more than just real estate services; we provide an unparalleled experience tailored to meet your needs and exceed your expectations.
    </p>

    <div className="bg-[#161b22] rounded-3xl overflow-hidden shadow-lg divide-y divide-[#1f6feb]">
      {[
        "What types of properties do we offer in Dubai?",
        "What are the payment options available for purchasing a property?",
        "Can foreign nationals buy property in Dubai?",
        "What is the process for obtaining a residency visa through property investment?",
        "Are there any additional costs associated with property ownership in Dubai?",
        "Do we offer property management services for rental properties?",
        "Can we assist with property financing for non-resident buyers?",
      ].map((question, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-6 px-8 hover:bg-[#1a1f2c] transition-all duration-300 cursor-pointer"
        >
          <span className="text-white text-lg font-medium">
            {question}
          </span>
          <span className="text-[#58a6ff] text-2xl font-bold">+</span>
        </div>
      ))}
    </div>
  </div>
</section>



    {/* Page 5: Packages */}
    <section className="bg-[#0d1117] py-20 px-6 text-center">
<h2 className="text-5xl font-extrabold mb-16 text-white tracking-wide">
  🎁 Special Offers Just for You
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center items-stretch">
  {[
    {
      title: "Basic Package",
      price: 499,
      perks: [
        "3 Nights Stay",
        "2 Scenic Destinations",
        "Free High-Speed Wi-Fi",
        "All Meals Included",
        "Local Guide Access",
        "Free Travel Kit",
      ],
    },
    {
      title: "Standard Package",
      price: 899,
      perks: [
        "5 Nights Accommodation",
        "3 Handpicked Locations",
        "Airport Pickup & Drop",
        "Dedicated Travel Assistant",
        "Adventure Activities Included",
        "VIP Access to Attractions",
      ],
    },
    {
      title: "Premium Package",
      price: 1399,
      perks: [
        "7 Nights in Luxury Hotels",
        "5 Dream Destinations",
        "Personalized Itinerary",
        "24/7 Private Concierge",
        "Spa + Wellness Pass",
        "Candlelight Dinners & More",
      ],
    },
  ].map((pkg, i) => (
    <div
      key={i}
      className="bg-gradient-to-br from-[#161b22] to-[#1f2937] text-left p-8 rounded-3xl border border-[#1f6feb] hover:border-[#58a6ff] hover:shadow-[0_0_30px_#1f6feb] transition-all duration-300 flex flex-col justify-between prize-box"
    >
      <div>
        <h3 className="text-3xl font-bold text-white mb-4">{pkg.title}</h3>
        <p className="text-4xl font-extrabold text-green-400 mb-6">
          ${pkg.price}
          <span className="text-base text-gray-400 font-medium ml-1">/person</span>
        </p>
        <ul className="list-disc list-inside text-gray-300 space-y-2 text-[16px]">
          {pkg.perks.map((perk, j) => (
            <li key={j}>✨ {perk}</li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <button className="mt-4 px-6 py-3 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-[#1f6feb] to-[#58a6ff] shadow-lg hover:shadow-[0_0_20px_#1f6feb] transition duration-300">
          View More
        </button>
      </div>
    </div>
  ))}
</div>
</section>

<section className="flex justify-center items-center">
    <Slide />
</section>

<section>
  <FlightBookingUI />
</section>

<section>
  <SmartOwnershipAnimation />
</section>


    {/* Page 6: Footer */}
    <footer className="bg-[#0d1117] pt-16 pb-10 px-6 text-center border-t border-[#30363d] footer">
<h2 className="text-3xl font-bold text-white mb-4 tracking-wider">🌍 Travelly</h2>

<p className="text-gray-400 max-w-xl mx-auto mb-6 text-base">
  Your one-stop destination for personalized travel adventures. Explore unique places, enjoy curated packages, and travel the world like never before.
</p>

<div className="mt-8 flex justify-center gap-8 flex-wrap text-lg font-medium">
  {[
    "Instagram",
    "Facebook",
    "Twitter",
    "LinkedIn",
    "Contact Us",
    "Privacy Policy"
  ].map((label, i) => (
    <a
      key={i}
      href="#"
      className="text-[#58a6ff] hover:text-white transition duration-300 hover:underline relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-[#58a6ff] hover:after:w-full after:transition-all after:duration-300"
    >
      {label}
    </a>
  ))}
</div>

<div className="mt-10 text-sm text-gray-500 tracking-wide">
  © 2025 <span className="text-[#58a6ff] font-semibold">Travelly</span>. All rights reserved.
</div>
</footer>
    </div>
  );
}
