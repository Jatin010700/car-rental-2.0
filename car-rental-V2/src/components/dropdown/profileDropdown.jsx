import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLogout } from "@/services/accountServices";

export const ProfileDropdown = ({ propOpen, propDropdown, propBackgroundDropdown }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector((state) => state.userName);

  const handleSubmit = async () => {
    handleLogout({ navigate, dispatch, userName })
  };

  return (
    <div className="flex justify-center items-center">
      <button
        className="rounded-full font-bold hover:text-B-yellow transition ease-in-out hover:-translate-z-1 hover:scale-125"
        onClick={propDropdown}>
        <i className="bi bi-person text-4xl"></i>
      </button>
      {propOpen && (
        <div className="bg-L-black/75 h-[89vh] w-screen fixed bottom-0 left-0"
        onClick={propBackgroundDropdown}>
        <div className="fixed top-0 right-0 mr-7 md:mr-16 mt-20 p-4 rounded-2xl h-auto w-80 md:w-64 bg-white border-2 border-r-L-black transition-all duration-300 ease-in-out"
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
                  className="py-2 px-14 bg-yellow rounded-full font-bold hover:bg-L-black hover:text-yellow shadow active:scale-95 duration-150"
                  onClick={handleSubmit}>
                  <i className="bi bi-arrow-left-circle-fill"></i> LOG OUT
                </button>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
