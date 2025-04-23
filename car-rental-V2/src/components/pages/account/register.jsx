import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

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
    <div className="flex justify-center items-center h-screen w-full bg-L-black">
      <div id="container" className="flex justify-center w-full gap-2 rounded-2xl">
        <form
          id="register-form"
          className="flex flex-col justify-center w-full md:w-2/6 text-center bg-white p-4 md:rounded-2xl h-screen md:h-full"
          onSubmit={handleSubmit}>
            <div className="relative flex justify-between items-center">
            <Link to={"/"} className="font-bold hover:text-yellow flex items-center"><ArrowLeft className="h-5 w-5" />Back to home</Link>
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
        </div>
    </div>
  );
}
