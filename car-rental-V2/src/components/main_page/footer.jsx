import React, { useEffect, useState } from "react";
import { Icon } from "../../extra/icon";

export const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  //Automatically update year
  useEffect(() => {
    const updateYear = () => {
      setCurrentYear(new Date().getFullYear());
    };

    updateYear();

    const interValid = setInterval(updateYear, 1000);

    return () => clearInterval(interValid);
  }, []);

  return (
    <div className="bg-white">
      <div className="bg-L-black flex flex-wrap justify-center md:justify-evenly">
        <div className="bg-yellow text-L-black p-4 w-full md:w-2/5 flex flex-col">
          <h2 className="font-bold text-2xl">Contact Us:</h2>
          <p>123 Main Street Anytown, USA 12345</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@example.com</p>
          <hr className="m-2" />
          <p>
            &copy; {currentYear} Car Rental Company. <br /> 
            <span className="font-bold">All rights reserved by Jatin Oomajee.</span>
          </p>
        </div>

        <div className="flex items-center p-4">
          <h2 className="font-bold text-2xl text-yellow mr-2">Follow Us: </h2>
          <div className="flex items-center gap-2">
            <Icon />
          </div>
        </div>
      </div>
    </div>
  );
};
