import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavButton = ({ to, text }) => (
    <Link to={to} className="p-2 font-bold hover:text-yellow transition ease-in-out hover:scale-110">
      {text}
    </Link>
  );

export const MobileNavBar = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const userName = useSelector((state) => state.userName);

    return (
        <>
        <div className="absolute top-16 right-0 mt-4 mr-8 w-80 bg-white p-3 shadow-lg rounded-2xl
          transition duration-300 ease-in-out transform border-2">
            <ul className="flex flex-col text-center items-center gap-3">
            {userLogin && (
              <li>
                <h1 className="text-center font-bold text-2xl">{userName}</h1>
              </li>
            )}
            <div className="h-0.5 w-full rounded-full bg-L-black" />
            <li>
            <NavButton to="/carlist" text="Account" />
            </li>
            <li>
            <NavButton to="/carlist" text="Rent Car" />
            </li>
            <li>
            <NavButton to="/soon" text="About" />
            </li>
            <li>
            <NavButton to="/contact" text="Contact" />
            </li>
        </ul>
        </div>
    </>
    )
}