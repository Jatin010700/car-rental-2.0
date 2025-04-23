import React from "react";
import { ArrowLeft, CircleUserRound } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { handleLogout } from "@/services/accountServices";
import useUserStore from "@/zustand_store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const username = user.name;

  const handleSubmit = async () => {
    handleLogout({ navigate, username })
  };

  return (
    <div className="flex justify-center items-center">
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="transition ease-in-out active:scale-95"><CircleUserRound size={34}/></DropdownMenuTrigger>
        <DropdownMenuContent className="customDropdown z-50 p-4 gap-2 rounded-3xl bg-white text-L-black border-2 border-L-black flex flex-col items-center">
        <h1 className="font-bold text-4xl">Account</h1>
        <h1 className="text-center font-bold text-2xl">{username}</h1>
        <div className="h-0.5 w-full rounded-full bg-L-black" />
          <ul className="flex flex-col gap-2 w-full items-center">
            <Link to="/carcontent" className="menuLinks">
              Rent your car
            </Link>
            <Link to="/ownerlist" className="menuLinks">
              List of car
            </Link>
            <div className="h-0.5 w-full rounded-full bg-L-black" />
            <li className="menuLinks">
              Billing
            </li>
            <li className="menuLinks">
              Settings
            </li>
            <button
              className="py-2 px-14 flex items-center bg-yellow rounded-full font-bold hover:bg-L-black hover:text-yellow shadow active:scale-95 duration-150"
              onClick={handleSubmit}>
              <ArrowLeft className="h-5 w-5" />LOG OUT
            </button>
          </ul>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
