import React from "react";
import { Link } from "react-router-dom";

const NavButton = ({ to, text }) => (
    <Link to={to} className="p-2 font-bold hover:text-yellow transition ease-in-out hover:scale-110">
      {text}
    </Link>
  );

export const MobileNavMenu = ({ propOpen, propDropdown, propBackgroundDropdown }) => {
    return (
        <>
          <div className="flex justify-center items-center">
            <button
              className="rounded-full font-bold hover:text-B-yellow transition ease-in-out hover:-translate-z-1 hover:scale-125"
              onClick={propDropdown}>
              <i className="bi bi-list text-4xl"></i>
            </button>
            {propOpen && (
              <div className="bg-L-black/75 h-[89vh] w-screen fixed bottom-0 left-0"
              onClick={propBackgroundDropdown}>
              <div className="fixed top-0 right-0 mr-8 md:mr-16 mt-20 p-4 rounded-2xl h-auto w-80 md:w-64 bg-white border-2 border-r-L-black transition-all duration-300 ease-in-out"
              onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col items-center gap-2">
                  <ul className="flex flex-col text-center items-center gap-2 w-full">
                    <li>
                      <NavButton to="/" text="Home" />
                    </li>
                    <div className="h-0.5 w-full rounded-full bg-L-black" />
                    <li>
                      <NavButton to="/carlist" text="Rent Car" />
                    </li>
                    <div className="h-0.5 w-full rounded-full bg-L-black" />
                    <li>
                      <NavButton to="/soon" text="About" />
                    </li>
                    <div className="h-0.5 w-full rounded-full bg-L-black" />
                    <li>
                      <NavButton to="/contact" text="Contact" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            )}
          </div>
      </>
    )
}