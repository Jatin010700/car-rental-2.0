import React from "react";
import { Link } from "react-router-dom";

export const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white h-screen">
      <div className="flex flex-col md:flex-row bg-L-black w-screen gap-2 justify-center items-center h-48 md:h-28">
        <i className="text-[#ff3333] text-6xl text-center bi bi-person-fill-lock"></i>
        <h1 className="text-yellow text-1xl md:text-4xl font-bold text-center">
          You are not authorize to access this Page!!!
        </h1>
      </div>
        <Link to={"/"}
        className=" bg-yellow hover:bg-L-black 
        hover:text-yellow py-2 px-4 rounded-full 
        font-bold border-2 border-yellow hover:border-yellow 
        transition ease-in-out hover:scale-110 duration-150
        relative bottom-5">
          Return Home
        </Link>
    </div>
  );
};
