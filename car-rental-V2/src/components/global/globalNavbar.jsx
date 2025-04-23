import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ProfileDropdown } from "../dropdown/profileDropdown";
import { MobileNavMenu } from "../dropdown/mobileNavMenu";
import useUserStore from "@/zustand_store/userStore";

export const GlobalNavBar = () => {
  const location = useLocation();
  const { user } = useUserStore()
  const isLoggedIn = !!user;


  const NavButton = ({ to, text }) => (
    <Link to={to} className={`p-2 font-bold hover:text-yellow transition ease-in-out hover:scale-110
      ${location.pathname === to ? "active" : "non_active"}`}>
      {text}
    </Link>
  );

  const linkArray = {
    home: "/",
    carlist: "/carlist",
    soon: "/soon",
    contact: "/contact"
  };

  return (
    <div className="flex flex-wrap justify-between items-center bg-white px-4 md:!px-16 py-3 w-full sticky top-0 z-50 shadow">
      <Link to="/" className="font-bold text-2xl">
        <span className="text-yellow text-4xl">Car </span>
        <i className="text-4xl bi bi-car-front-fill"></i> Rental
      </Link>
      <nav className="hidden md:flex md:items-center justify-center flex-wrap gap-2">
        <NavButton to="/" text="Home" className={`${location.pathname === linkArray.home ? 'active' : 'non_active'}`} />
        <NavButton to="/carlist" text="Rent Car"/>
        <NavButton to="/soon" text="About" />
        <NavButton to="/contact" text="Contact" />
        {isLoggedIn ? (
          <>
            <ProfileDropdown/>
          </>
        ) : (
          <>
            <Link to="/login" className="shadow px-4 navbBarBtn">
              LOGIN
            </Link>
            <Link to="/register" className="shadow px-4 navbBarBtn">
              SIGN UP
            </Link>
          </>
        )}
      </nav>
      {/* MOBILE NAVBAR */}
      <div className="flex justify-center items-center gap-2 md:hidden">
      {isLoggedIn ? (
        <>
         <ProfileDropdown />
        </>
        ) : (
        <>
          <Link to="/login" className="font-bold hover:text-yellow transition ease-in-out">
            <i className="bi bi-person-fill-add text-4xl"></i>
          </Link>
        </>
        )}
        <MobileNavMenu />
      </div>
    </div>
  );
};
