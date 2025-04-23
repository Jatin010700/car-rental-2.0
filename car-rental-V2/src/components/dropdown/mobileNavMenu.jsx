import React from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CircleChevronDown } from "lucide-react";


const NavButton = ({ to, text }) => (
    <Link to={to} className="p-2 font-bold hover:text-yellow transition ease-in-out hover:scale-110">
      {text}
    </Link>
  );

export const MobileNavMenu = () => {
    return (
        <>
          <div className="flex justify-center items-center">
            <DropdownMenu modal={false}>
            <DropdownMenuTrigger className="transition ease-in-out active:scale-95"><CircleChevronDown size={34}/></DropdownMenuTrigger>
              <DropdownMenuContent className="customMobileDropdown z-50 p-4 gap-2 rounded-3xl bg-white text-L-black border-2 border-L-black flex flex-col items-center">
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
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    )
}