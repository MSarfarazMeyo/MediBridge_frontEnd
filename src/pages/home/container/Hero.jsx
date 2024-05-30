import React from "react";

import { images } from "../../../constants";
import Search from "../../../components/Search";

const Hero = () => {
  return (
    <section className="container mx-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="text-center font-roboto text-3xl font-bold text-dark-soft md:text-5xl lg:max-w-[540px] lg:text-left lg:text-4xl xl:text-5xl">
          Explore the Latest in Medical Insights
        </h1>
        <p className="mt-4 text-center text-dark-light md:text-xl lg:text-left lg:text-base xl:text-xl">
          Dive into a world of cutting-edge articles covering a myriad of health
          topics, all at your fingertips.
        </p>
        <Search className="mt-10 lg:mt-6 xl:mt-10" />
        <div className="mt-4 flex flex-col lg:mt-7 lg:flex-row lg:flex-nowrap lg:items-start lg:gap-x-4">
          <span className="mt-2 font-semibold italic text-dark-light lg:mt-4 lg:text-sm xl:text-base">
            Popular Categories:
          </span>
          <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-2.5 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              General Health
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              Cardiology
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              Neurology
            </li>
          </ul>
        </div>

        {/* <div className=" flex flex-col  lg:flex-row lg:flex-nowrap lg:items-start lg:gap-x-4">
          <span className="mt-2 font-semibold italic text-dark-light lg:mt-4 lg:text-sm xl:text-base">
            Popular Tags:
          </span>
          <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-2.5 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              #Diabetes
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              #ChildDevelopment
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              #BoneFractures
            </li>
          </ul>
        </div> */}
      </div>
      <div className="lg:1/2 hidden max-w-[50%] items-center justify-center overflow-hidden pt-10 lg:flex">
        <img
          className="h-full w-full"
          src="https://www.cflowapps.com/wp-content/uploads/2023/02/bpm_helthcre.jpg"
          alt="users are reading articles"
        />
      </div>
    </section>
  );
};

export default Hero;
