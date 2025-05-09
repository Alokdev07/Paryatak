import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { NavLink } from 'react-router-dom';

function NavBar() {
  const containerRef = useRef();
  const navItemsRef = useRef();

  useGSAP(() => {
    // Animate only the text elements
    gsap.from(".nav-text-element", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.1,
      delay: 0.2,
      ease: "back.out(1.2)"
    });

    // Hover effects
    gsap.utils.toArray(".nav-text-element").forEach(item => {
      item.addEventListener("mouseenter", () => {
        gsap.to(item, {
          scale: 1.05,
          duration: 0.2
        });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, {
          scale: 1,
          duration: 0.2
        });
      });
    });
  }, { scope: containerRef });

  const handleLogout = () => {
    // Add your logout logic here
    console.log("User logged out");
  };

  return (
    <nav 
      className="bg-[#0d1117] text-white px-8 py-4 shadow-md fixed w-full top-0 z-50 border-b border-gray-800"
    >
      <div ref={containerRef} className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <NavLink 
          to="/" 
          className="nav-text-element text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors"
        >
         Paryatak
        </NavLink>

        {/* Navigation Links */}
        <div ref={navItemsRef} className="flex space-x-6 items-center">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `nav-text-element px-3 py-2 text-sm font-medium relative group transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Home
            <span className={`absolute left-0 bottom-0 h-0.5 bg-blue-400 transition-all duration-300`}></span>
          </NavLink>
          
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `nav-text-element px-3 py-2 text-sm font-medium relative group transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            About
            <span className={`absolute left-0 bottom-0 h-0.5 bg-blue-400 transition-all duration-300`}></span>
          </NavLink>
          
          <NavLink 
            to="/services" 
            className={({ isActive }) => 
              `nav-text-element px-3 py-2 text-sm font-medium relative group transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Services
            <span className={`absolute left-0 bottom-0 h-0.5 bg-blue-400 transition-all duration-300`}></span>
          </NavLink>
          
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `nav-text-element px-3 py-2 text-sm font-medium relative group transition-colors ${
                isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
              }`
            }
          >
            Contact
            <span className={`absolute left-0 bottom-0 h-0.5 bg-blue-400 transition-all duration-300 `}></span>
          </NavLink>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="nav-text-element px-4 py-2 rounded-md text-sm font-medium bg-transparent border border-red-500 text-red-400 hover:bg-red-900/30 hover:text-red-300 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* CTA Button */}
        <NavLink 
          to="/signup" 
          className="nav-text-element bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;