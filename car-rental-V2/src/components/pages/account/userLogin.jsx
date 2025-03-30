import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import SocialLogin from "./socialLogin";

import { Preloader } from "@/components/common/preloader";
import { login } from "@/redux/action";
import { setUsernameState } from "@/redux/store";
import { useAuth } from "@/auth/authContext";
import { handleLogin } from "@/services/accountServices";
import useCurrentYear from "@/customHooks/autoUpdateYear";

export default function UserLogin() {
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentYear = useCurrentYear();

  const { handleLogin: handleAuthLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({
      userValue,
      passValue,
      setUsernameState,
      login,
      handleLogin: handleAuthLogin,
      setIsLoading,
      navigate,
      dispatch
    });
  };

  const isFormValid = () => {
    return userValue === "" || passValue === "";
  };

  return (
    <div className="flex justify-center items-center ">
      <div id="container"
        className="flex justify-center lg:w-3/4 gap-2 md:mt-24 rounded-2xl">
        <form
          id="login-form"
          className="flex flex-col justify-center w-full text-center bg-white p-4 md:rounded-2xl h-screen md:h-full"
          onSubmit={handleSubmit}>
          <div className="relative flex flex-col justify-center items-center">
            <Link
              className="text-L-black text-5xl text-center font-bold mb-4 lg:hidden "
              to={"/"}>
              <span className="text-yellow">Car </span>
              <i className=" bi bi-car-front-fill"></i> Rental
            </Link>
            <h2 className="text-yellow text-4xl font-bold">LOG IN</h2>
          </div>
          <div className="mt-4 input-field">
            <input
              type="text"
              id="getUsername"
              className="user_input"
              placeholder="Username"
              autoComplete="off"
              value={userValue}
              onChange={(e) => setUserValue(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <input
              type="password"
              id="getPassword"
              className="user_input"
              placeholder="Password"
              autoComplete="off"
              value={passValue}
              onChange={(e) => setPassValue(e.target.value)}
              required
            />
          </div>

          <Link
            className="text-left w-2/5 lg:ml-0 mb-2 text-sm hover:text-yellow font-bold"
            to="/ConfirmEmail">
            Forgot Password?
          </Link>

          <div className="flex gap-2 items-center flex-col lg:flex-row">
            <button
              type="submit"
              id="loginBTN"
              className="userBtn btn"
              disabled={isFormValid()}
              onClick={handleSubmit}>
              {isLoading ? <Preloader /> : "LOGIN"}
            </button>

            <Link to="/register"
              className="userBtn">
              REGISTER
            </Link>
          </div>

            <div className="h-0.5 my-4  bg-yellow relative">
                <div className="w-full px-2 flex justify-center item-center ">
                    <p className="mt-1 px-2 absolute -top-4 text-center bg-white">
                        Or Connect With
                    </p>
                </div>
            </div>

            <div className="flex justify-center gap-2 text-xl">
                <SocialLogin/>
            </div>

            <div className="mt-2 copyright">&copy; {currentYear}</div>
        </form>

        <div className="divContent">
          <div className="flex flex-col p-4 rounded-2xl h-full bg-L-black text-justify">
            <Link
              className="text-yellow text-4xl text-center font-bold transition ease-in-out hover:scale-110 duration-150"
              to={"/"}>
              CAR <i className="bi bi-car-front-fill"></i> RENTAL
            </Link>
            <p className="text-white p-2 pt-4">
              Welcome to our car rental website! We offer a wide range of
              vehicles and flexible rental options to suit your needs. With
              exceptional customer service and affordable rates, we make renting
              a car easy and stress-free. Browse our selection and discover the
              convenience of renting with us.
              <br/>
              <span className="text-yellow text-lg font-bold">
                Start journey with us!
              </span>
            </p>
            <p className="text-white mt-14">
              <i className="text-yellow bi bi-caret-left-fill"></i> 
              Don't have an Account? <span className="text-yellow font-bold"> SIGN UP</span>
            </p>

            <p className="text-white mt-2"><span className="text-yellow ">*</span>TEST ACCOUNT: test, 123</p>
          </div>
        </div>
      </div>
    </div>
  );
}