import React from "react";
import useCurrentYear from "@/customHooks/autoUpdateYear";

export const GlobalFooter = () => {
  const currentYear = useCurrentYear();

  const iconList = [
    <i key="google" className="bi bi-google"></i>,
    <i key="facebook" className="bi bi-facebook"></i>,
    <i key="microsoft" className="bi bi-microsoft"></i>,
    <i key="twitter" className="bi bi-twitter"></i>,
    <i key="instagram" className="bi bi-instagram"></i>,
  ];

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

        <div className="flex md:flex-row flex-col items-center p-4">
          <h2 className="font-bold text-2xl text-yellow mr-2">Follow us on </h2>
          <div className="flex items-center gap-2">
          {iconList.map((icon, index) => (
              <div
                key={index}
                className="transition ease-in-out hover:scale-105 duration-150 cursor-pointer iconStyle">
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
