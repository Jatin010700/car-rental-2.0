import React from "react";
import ferrariGif from "/ferrari.gif";
import lamborGif from "/lambor.gif";

export const ChooseUs = () => {
  return (
    <div className="bg-white">
        <h2 className="text-4xl font-bold text-center p-4 ">
          Why <span className="underline-rounded">Choose</span> Us
        </h2>
        <div className="flex justify-center px-4 md:!px-16 md:!pr-[4.5rem]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-2">
          <div className="rounded-2xl ">
            <img className="h-full w-full rounded-2xl" src={lamborGif} alt="" />
          </div>
          <div className="bg-L-black text-yellow rounded-2xl p-4 drop-shadow-md col-span-2 mt-2 md:!mt-0">
            <h3 className="font-bold text-3xl">Wide Selection of Cars</h3>
            <p>
              Choose from our extensive fleet of vehicles, ranging from compact
              cars to SUVs, ensuring you find the perfect fit for your needs and
              preferences.
            </p>
            <h3 className="font-bold text-3xl mt-2">Easy Booking Process</h3>
            <p>
              Our user-friendly online booking system makes it quick and
              effortless to reserve your desired car, giving you peace of mind
              before your trip.
            </p>
          </div>
          <div className="bg-yellow text-L-black rounded-2xl p-4 drop-shadow-md col-span-2 mt-2 md:!mt-0">
            <h3 className="font-bold text-3xl">Excellent Customer Service</h3>
            <p>
              Our dedicated customer support team is available 24/7 to assist
              you with any inquiries or issues you may have, ensuring a smooth
              and enjoyable car rental experience.
            </p>
            <h3 className="font-bold text-3xl">Competitive Prices</h3>
            <p>
              We offer competitive and transparent pricing options, allowing you
              to enjoy affordable rates.
            </p>
          </div>
          <div className="grid4">
            <img className="h-full w-full rounded-2xl mt-2 md:!mt-0" src={ferrariGif} alt="" />
          </div>
        </div>
        </div>
      </div>
  );
};
