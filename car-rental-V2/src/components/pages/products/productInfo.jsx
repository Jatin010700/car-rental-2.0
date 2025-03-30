import React from "react";
import { Link, useParams } from "react-router-dom";
import logo from "/Bugatti-logo.png";

export const ProductPage = () => {
  const { carName, imageURL, price, rent, loginUserName } = useParams();

  return (
    <>
      <div className="bg-white ">
        <div className="flex justify-between items-center pt-2 px-12 md:flex-row">
          <div className="flex justify-center items-center gap-2">
            <img src={logo} alt="" className="" width={100} height={100} />
            <h2 className="font-bold text-2xl md:text-4xl">{carName}</h2>
          </div>
          <h2 className="font-bold text-2xl hidden md:block"><span className="underline decoration-yellow">Rent</span> car</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-2 bg-L-black w-full py-4 px-10 md:px-12">
          <img src={imageURL} alt="" className="rounded-2xl" width={750} height={100} />

          <div className="flex w-full md:w-2/5 flex-col justify-around items-center gap-2 border-2 text-white rounded-2xl p-4  border-1 border-yellow">
            <div className="w-full">
              <p className="p-2 bg-yellow text-L-black w-full rounded-2xl font-bold">
                DUTY-PAID
              </p>
              <p className="text-2xl py-2">${price}</p>
            </div>
              <div className="h-0.5 bg-yellow w-full rounded-full" />
            <p className="w-full flex flex-col justify-center items-center">
              On road without insurance
              <span className="text-sm text-yellow">(Price may change with fluctuation)</span>
            </p>
            <div className="h-0.5 bg-yellow w-full rounded-full" />
            <div className="w-full">
              <p className="p-2 bg-yellow text-L-black rounded-2xl font-bold w-full"><b>RENT ESTIMATION:</b></p>
              <p className="text-yellow py-2">
                <span className="text-2xl text-white">${rent}</span>/month
              </p>
            </div>
            <div className="h-0.5 bg-yellow w-full rounded-full" />
            <p className="p-2 bg-yellow text-L-black rounded-2xl font-bold w-full">
             SELLER : <span className="uppercase">{loginUserName}</span>
            </p>
            <Link to="/soon"
              className="border-2 border-yellow rounded-full text-center 
              py-2 transition ease-in-out active:scale-95 hover:scale-105 duration-150
               hover:bg-yellow hover:text-L-black font-bold w-full">
              Click here to rent
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 justify-center w-full py-4 px-10 md:px-12">
          <div className="w-full md:w-2/5 flex flex-col gap-2 border-2 border-L-black rounded-2xl p-4">
            <h1 className="font-bold text-xl">
              <span className="underline decoration-yellow">Leave</span> review :
            </h1>
            <input
              type="text"
              className="rounded-2xl p-2 mb-2 border-2 border-L-black"
              placeholder="First Name"
            />
            <textarea
              className="rounded-2xl p-2 h-full w-full md:w-96 border-2 border-L-black"
              placeholder="Leave a comment"
            />
            <button className="py-2 px-2 mt-2 bg-yellow rounded-full font-bold 
            hover:bg-L-black hover:text-yellow shadow
              active:scale-95 hover:scale-105 duration-150">
              Submit
            </button>
          </div>

          <div className="p-4 text-justify border-2 border-l-L-black rounded-2xl">
            <h2 className="font-bold text-xl">
              <span className="underline decoration-yellow">Info</span>rmation
            </h2>
            <p className="p-2">
              The Bugatti Chiron is a hypercar that represents the pinnacle of
              automotive engineering and luxury. Here are some key features of
              the Bugatti Chiron:
            </p>
            <hr />
            <ul className="p-2">
              <li>- Engine: Quad-Turbocharged W16</li>
              <li>- Horsepower: 1,500 HP</li>
              <li>- Acceleration: 0-60 mph in 2.4 seconds</li>
              <li>- Transmission: 7-speed dual-clutch automatic</li>
              <li>- Top Speed: Limited to 261 mph (electronically limited)</li>
              <li>- Seating Capacity: 2</li>
              <li>- Fuel Economy: 8 mpg city / 13 mpg highway</li>
            </ul>
            <hr />
            <p>
              The Bugatti Chiron combines extraordinary power with exquisite
              craftsmanship. Its aerodynamic design, highlighted by the
              signature horseshoe grille and C-shaped taillights, not only
              enhances performance but also exudes elegance.
            </p>
            <br />
            <p>
              Inside the cabin, the Bugatti Chiron showcases the finest
              materials, including premium leather, carbon fiber, and aluminum
              accents. Advanced technologies such as a digital instrument
              cluster, touchscreen infotainment system, and high-end audio
              system create a luxurious driving experience.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};