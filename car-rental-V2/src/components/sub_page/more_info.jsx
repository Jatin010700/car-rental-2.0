import React from "react";
import { NavBar } from "../navbar/navbar";
import { Footer } from "../main_page/footer";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/Bugatti-logo.png";

export const Info1 = () => {
  const { carName, imageURL, price, rent, loginUserName } = useParams();

  return (
    <>
      <NavBar />
      <div className="bg-white ">
        <div className="flex flex-col justify-between pt-4 px-16 md:flex-row">
          <h2 className="font-bold text-2xl md:text-4xl mb-4">{carName}</h2>
          <h2 className="font-bold text-2xl hidden md:block"><span className="underline decoration-yellow">Ren</span>t car</h2>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-2 bg-L-black w-full py-4 px-10 md:px-16">

          <div className=" text-justify bg-L-black rounded-2xl">
            <img src={imageURL} alt="" className="rounded-2xl" />
          </div>

          <div className="flex flex-col gap-2 border-2 text-white rounded-2xl p-4  border-1 border-yellow">
            <p className="p-2 bg-yellow text-L-black w-full md:w-96  rounded-full font-bold">
              Duty-Paid
            </p>
            <p className="text-2xl p-2">${price}</p>
            <hr className="text-yellow" />
            <p className="">
              On road without
              <span className="underline decoration-yellow">insurance</span>
              <br />
              (Price may change with fluctuation)
            </p>
            <hr className="text-yellow" />
            <p className="text-yellow">Rent estimation:</p>
            <p className="">
              <span className="text-2xl">${rent}/</span>month
            </p>
            <hr className="text-yellow" />
            <p className="p-2 bg-yellow text-L-black rounded-full font-bold w-full md:w-96 ">
             Seller : <span className="uppercase">{loginUserName}</span>
            </p>
            <div className="flex justify-center">
              <img src={logo} alt="" className="w-40 text" />
            </div>
            <Link to="/soon"
              className="border-2 border-yellow rounded-full text-center 
              py-2 transition ease-in-out active:scale-95 hover:scale-105 duration-150
               hover:bg-yellow hover:text-L-black font-bold">
              Rent Now
            </Link>
          </div>
          
        </div>

        <div className="flex flex-col md:flex-row gap-24 justify-around w-full py-4  px-10 md:px-16">
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
          <div className="flex flex-col gap-2 border-2 border-L-black rounded-2xl p-4 ">
            <h1 className="font-bold text-xl">
              <span className="underline decoration-yellow">Write</span> a
              review :
            </h1>
            <label className="text-L-black">Name:</label>
            <input
              type="text"
              className="rounded-full p-2 mb-2 border-2 border-L-black"
              placeholder="Enter First Name"
            />
            <label className="text-L-black">Comment:</label>
            <textarea
              className="rounded-2xl p-2  w-full md:w-96 border-2 border-L-black"
              placeholder="Leave a comment"
            />
            <button className="py-2 px-2 mt-2 bg-yellow rounded-full font-bold 
            hover:bg-L-black hover:text-yellow shadow transition ease-in-out 
              active:scale-95 hover:scale-105 duration-150">
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
