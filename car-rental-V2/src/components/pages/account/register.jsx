import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SocialLogin from "./socialLogin";

import { Preloader } from "@/components/common/preloader";
import { handleRegister } from "@/services/accountServices";
import useCurrentYear from "@/customHooks/autoUpdateYear";

export default function Register() {
  const [emailValue, setEmailValue] = useState("");
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const currentYear = useCurrentYear();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRegister({
      userValue,
      passValue,
      emailValue,
      navigate,
      setIsLoading,
    })
  };

  const isFormValid = () => {
    return (
      emailValue === "" ||
      userValue === "" ||
      passValue === ""
    );
  };

  return (
    <div className="flex justify-center items-center ">
      <div id="container" className="flex justify-center lg:w-3/4 gap-2 lg:mt-24 rounded-2xl">
        <form
          id="register-form"
          className="flex flex-col justify-center w-screen lg:w-2/4 text-center bg-white p-4 lg:rounded-2xl h-screen lg:h-full"
          onSubmit={handleSubmit}>
            <div className="relative flex flex-col justify-center items-center">
              <Link
                className="text-L-black text-5xl text-center font-bold lg:hidden"
                to={"/"}>
                <span className="text-yellow">Car </span>
                <i className=" bi bi-car-front-fill"></i> Rental
              </Link>
              <h2 className="text-yellow text-4xl font-bold">REGISTER</h2>
            </div>

            <div className="mt-4 input-field">
              <input
                type="text"
                id="userName"
                className="user_input"
                placeholder="Username"
                autoComplete="off"
                required
                value={userValue}
                onChange={(e) => setUserValue(e.target.value)}
              />
            </div>

            <div className=" input-field">
              <input
                type="email"
                id="email"
                className=" user_input"
                placeholder="Email"
                autoComplete="off"
                required
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>

            <div className="input-field">
              <input
                type="password"
                id="password"
                className="user_input"
                placeholder="Password"
                autoComplete="off"
                required
                value={passValue}
                onChange={(e) => setPassValue(e.target.value)}
              />
            </div>

            <div className="flex gap-2 items-center flex-col lg:flex-row">
              <button
                type="submit"
                id="registerBTN"
                className="userBtn btn"
                disabled={isFormValid()}>
                {isLoading ? <Preloader /> : "REGISTER"}
              </button>

              <Link to="/login" className="userBtn">
                LOGIN
              </Link>
            </div>

            <div className="h-0.5 my-4  bg-yellow relative">
              <div className="w-full px-2 flex justify-center item-center ">
                <p className="mt-1 px-2 absolute -top-4 text-center bg-white"> 
                  Or Sign Up With
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-2 text-xl icon">
              <SocialLogin/>
            </div>
            <div className="mt-2 copyright">&copy; {currentYear}</div>
        </form>

          <div className="divContent">
            <div className="flex flex-col p-4 rounded-2xl h-full bg-L-black text-justify">
              <Link
                className="text-yellow text-4xl text-center font-bold transition ease-in-out hover:scale-110 duration-150"
                to={"/"} >
                CAR <i className="bi bi-car-front-fill"></i> RENTAL
              </Link>
              <p className="text-white p-2 pt-4">
                Enjoy exclusive benefits: easy reservations, exclusive discounts,
                faster check-ins, and personalized recommendations.
                <p className=" mt-2">
                  <span className="text-yellow text-lg font-bold">Experience more: </span>
                  Sign up and access an enhanced user experience with exclusive
                  features and content tailored just for you.
                </p>
                <p className="mb-2">
                  <span className="text-yellow text-lg font-bold">Stay informed:</span>
                  Get the latest updates, news, and exciting announcements
                  delivered directly to your inbox when you sign up.
                </p>
                <p className=" text-lg">
                  By creating an account you agree to our <span className="hover:text-yellow font-bold cursor-pointer"> TERMS & PRIVACY</span>
                </p>
              </p>
            </div>
          </div>
        </div>
    </div>
  );
}
