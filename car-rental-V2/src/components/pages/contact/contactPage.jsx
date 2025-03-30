import React from "react";
import contactJPG from "/contact.jpg";

export const ContactPage = () => {
  return (
    <>
      <div className="bg-white p-4">
        <div className="flex flex-col sm:flex-row justify-around flex-wrap">
          <div className="w-full sm:w-2/4 flex flex-col items-center mt-10 sm:mt-10">
            <h1 className="font-bold text-4xl">Get in Touch</h1>
            <p>
              Want to get in touch? We'd love to hear from you
              <span className="text-yellow font-bold">...</span>
            </p>
            <img src={contactJPG} alt="" />
          </div>
          <div className="flex flex-col gap-2 shadow bg-L-black w-full sm:w-2/5 h-96 sm:h-96 text-white p-4 rounded-2xl mt-10 sm:mt-24">
            <label htmlFor="name">
              Name <span className="text-yellow">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="rounded-full h-10 py-2 px-4 text-L-black"
              placeholder="Enter Name"
              autoComplete="off"
            />
            <label htmlFor="email">
              Email <span className="text-yellow">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="rounded-full h-10 py-2 px-4 text-L-black"
              placeholder="Enter Email"
              autoComplete="off"
            />
            <label htmlFor="message">
              Leave a message <span className="text-yellow">*</span>
            </label>
            <textarea
              id="message"
              className="rounded-2xl h-24 py-2 px-4 text-L-black"
              placeholder="Message..."
            />
            <button className="py-2 px-2 w-full sm:w-2/4 mt-2 bg-yellow text-L-black rounded-full font-bold transition ease-in-out active:scale-95 hover:scale-105 duration-150">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};