import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user_action/action";
import { Link, useNavigate } from "react-router-dom";

export const ProfileMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userName = useSelector((state) => state.userName);

  const toggleAccountMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const res = await fetch("https://car-rental-back.onrender.com/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/");
      } else {
        alert("Logout failed:", res.statusText);
      }
    } catch (error) {
      alert("Server Error!!!", error);
    }
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="rounded-full font-bold hover:text-B-yellow transition ease-in-out hover:-translate-z-1 hover:scale-125"
        onClick={toggleMenu}>
        <i className="bi bi-person text-4xl"></i>
      </button>
      {isOpen && (
        <div className="bg-L-black/75 h-[89vh] w-screen fixed bottom-0 left-0"
        onClick={toggleAccountMenu}>
        <div className="fixed top-0 right-0 mr-16 mt-20 p-4 rounded-2xl h-auto w-64 bg-white border-2 border-r-L-black transition-all duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-bold text-4xl">Account</h1>
            <h1 className="text-center font-bold text-2xl">{userName}</h1>
              <div className="h-0.5 w-full rounded-full bg-L-black" />
                <ul className="flex flex-col gap-2 w-full items-center">
                  <Link to="/carcontent" className="menuLinks">
                    Rent your Car
                  </Link>
                  <li className="menuLinks">
                    Billing
                  </li>
                  <div className="h-0.5 w-full rounded-full bg-L-black" />
                  <li className="menuLinks">
                    Settings
                  </li>
                <button
                  className="py-2 px-14 bg-yellow rounded-full font-bold hover:bg-L-black hover:text-yellow shadow transition ease-in-out active:scale-95 hover:scale-105 duration-150"
                  onClick={handleLogout}>
                  <i class="bi bi-arrow-left-circle-fill"></i> LOG OUT
                </button>
              </ul>
            </div>
          </div>
        </div>
        )}
      </div>
  );
};
