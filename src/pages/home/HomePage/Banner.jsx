import React from "react";
import heroBg from "./../../../assets/bg-hero.png";

const Banner = () => {
  return (
    <div className="w-10/12 mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 py-4 lg:py-20">
      <div className="space-y-10 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold">
          The Easiest Way to Get Your New Job
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          Work with talented people at the most affordable price to get the most
          out of your time and cost
        </p>
      </div>
      <div className="w-full lg:w-1/2">
        <img src={heroBg} alt="Hero" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Banner;
