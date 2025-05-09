import { useState } from "react";
import { CalendarDays, User, ChevronDown } from "lucide-react";

export default function FlightBookingUI() {
  const [tripType, setTripType] = useState("oneway");

  return (
    <div className="w-full px-4 sm:px-8 lg:px-24 flex flex-col items-center text-white">
      {/* Top Menu */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {[
          "Flights",
          "Trains",
          "Buses",
          "Cabs",
          "Accommodations",
          "Travel Partners",
        ].map((item, index) => (
          <button
            key={index}
            className={`px-6 py-2 rounded-md border border-white text-sm font-medium transition duration-300 hover:scale-105 ${
              item === "Flights" ? "bg-red-600 text-white" : "bg-transparent"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Trip Type */}
      <div className="flex gap-6 mb-6 text-lg font-medium">
        <span
          onClick={() => setTripType("oneway")}
          className={`cursor-pointer hover:text-yellow-400 ${
            tripType === "oneway" ? "underline text-yellow-300" : ""
          }`}
        >
          One Way
        </span>
        <span
          onClick={() => setTripType("roundtrip")}
          className={`cursor-pointer hover:text-yellow-400 ${
            tripType === "roundtrip" ? "underline text-yellow-300" : ""
          }`}
        >
          Round Trip
        </span>
      </div>

      {/* Main Form */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 w-full max-w-6xl">
        <input
          placeholder="From"
          className="bg-white/10 text-white px-4 py-3 rounded-md backdrop-blur-md w-64"
        />
        <input
          placeholder="To"
          className="bg-white/10 text-white px-4 py-3 rounded-md backdrop-blur-md w-64"
        />
        <div className="relative bg-white/10 px-4 py-3 rounded-md w-64 flex items-center gap-2">
          <CalendarDays className="w-5 h-5 text-yellow-300" />
          <span>Thu, 08 May, 25</span>
        </div>
        <input
          disabled
          placeholder="Return"
          className="bg-white/10 text-white px-4 py-3 rounded-md backdrop-blur-md w-64"
        />
        <div className="bg-white/10 px-4 py-3 rounded-md w-64 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span>1 Traveler</span>
          </div>
          <ChevronDown className="w-5 h-5" />
        </div>
        <div className="bg-white/10 px-4 py-3 rounded-md w-64 flex items-center justify-between">
          <span>Economy</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>

      {/* Fare Type */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {[
          "Regular Fares",
          "Armed Forces Fares",
          "Student Fares",
          "Senior Citizen Fares",
          "Doctors & Nurses Fares",
        ].map((fare, idx) => (
          <label
            key={idx}
            className="bg-white/10 px-4 py-2 rounded-md cursor-pointer backdrop-blur-md hover:bg-white/20"
          >
            <input type="radio" name="fare" className="mr-2" />
            {fare}
          </label>
        ))}
      </div>

      {/* Direct Flight Only */}
      <div className="flex items-center gap-2 mb-6">
        <input type="checkbox" id="directFlight" className="w-4 h-4" />
        <label htmlFor="directFlight">Direct flight only</label>
      </div>

      {/* Search Button */}
      <button className="bg-white text-black font-semibold px-10 py-3 rounded-full shadow-xl hover:bg-yellow-300 transition duration-300">
        Search
      </button>
    </div>
  );
}
