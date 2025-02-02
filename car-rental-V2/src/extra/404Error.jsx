import React from "react";
import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white h-screen">
    <div className="bg-L-black w-screen gap-2 flex justify-center items-center h-28">
      <h1 className="text-yellow text-4xl font-bold text-center ">
        <span className="text-[#ff3333]">404 </span>Page not found!!!
      </h1>
    </div>
    <Link to={"/"}
        className=" bg-yellow hover:bg-L-black
        hover:text-yellow py-2 px-4 rounded-full
        font-bold border-2 border-yellow hover:border-yellow hover:scale-105 duration-150 relative bottom-5">
          Return Home
    </Link>
  </div>
  );
};
