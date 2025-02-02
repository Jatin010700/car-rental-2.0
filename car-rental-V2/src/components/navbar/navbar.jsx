import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MobileNavBar } from "./mobileNavbar";
import { logout } from "../../redux/user_action/action";
import { ProfileMenu } from "./profile_menu";

export const NavBar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await fetch("https://car-rental-back.onrender.com/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        alert(data.message);
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
      } else {
        alert("Logout failed:", response.statusText);
      }
    } catch (error) {
      alert("Server Error!!!", error);
    }
  };

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  const NavButton = ({ to, text }) => (
    <Link to={to} className={`p-2 font-bold hover:text-yellow transition ease-in-out hover:scale-110 ${
      location.pathname === to ? "active" : "non_active"}`}>
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
        {userLogin ? (
          <>
            <ProfileMenu />
          </>
        ) : (
          <>
            <Link to="/login" className="shadow px-4 NavBTN">
              LOGIN
            </Link>
            <Link to="/register" className="shadow px-4 NavBTN">
              SIGN UP
            </Link>
          </>
        )}
      </nav>
      {/* MOBILE NAVBAR */}
      <div className="flex justify-center items-center gap-2 md:hidden">

      {userLogin ? (
        <>
         <button className="py-2 px-3 bg-yellow rounded-full font-bold shadow active:scale-95 " 
         onClick={handleLogout}>
            LOG OUT
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="font-bold hover:text-yellow transition ease-in-out">
            <i className="bi bi-person-fill-add text-4xl"></i>
          </Link>
        </>
      )}
        <button
            className="font-bold hover:text-yellow transition ease-in-out active:scale-95"
            onClick={toggleMobileNav}>
            <i className="bi bi-list text-4xl"></i>
        </button>
        {showMobileNav && (
          <MobileNavBar/>
        )}
      </div>
    </div>
  );
};
