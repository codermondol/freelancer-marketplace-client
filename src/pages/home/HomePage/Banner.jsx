import React from "react";
import heroBg from "./../../../assets/bg-hero.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <>

      <section className="bg-secondary overflow-hidden">
        <div className="max-w-360 mx-auto px-6 xl:px-20 flex flex-col lg:flex-row items-center justify-between gap-12 py-16 lg:py-28">
          <div className="flex-1 space-y-7 text-center lg:text-left">

            {/* Headline */}
            <h1 className="anim-2 text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold text-white leading-tight">
              The Most{" "}
              <span className="text-primary relative inline-block">
                Reliable
                <span className="absolute left-0 -bottom-1 w-full h-1 bg-primary/40 rounded-full" />
              </span>{" "}
              <br className="hidden lg:block" />
              Freelance Marketplace
            </h1>

            {/* Sub-text */}
            <p className="anim-3 text-base sm:text-lg text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Connect with verified top-tier freelancers, post jobs in minutes,
              and get work done with full confidence. Your success is guaranteed.
            </p>


            {/* CTA buttons */}
            <div className="anim-5 flex flex-wrap justify-center lg:justify-start gap-4">
              <Link
                to="/myaddedjobs"
                className="btn bg-white text-secondary border-white px-8 rounded-full text-base font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                + Create a Job
              </Link>
            </div>

          </div>

          {/* ── Right image ── */}
          <div className="anim-img flex-1 flex justify-center lg:justify-end">
            <div className="anim-float w-full max-w-lg">
              <img
                src={heroBg}
                alt="Freelancer Hero"
                className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
              />
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Banner;
