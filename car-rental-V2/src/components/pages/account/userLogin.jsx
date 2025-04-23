import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import SocialLogin from "./socialLogin";
import { Preloader } from "@/components/common/preloader";
import { useAuth } from "@/auth/authContext";
import { handleLogin } from "@/services/accountServices";
import useCurrentYear from "@/customHooks/autoUpdateYear";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useUserStore from "@/zustand_store/userStore";

export default function UserLogin() {
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();

  const navigate = useNavigate();
  const currentYear = useCurrentYear();

  const { handleLogin: handleAuthLogin } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin({
      userValue,
      passValue,
      userToken: handleAuthLogin,
      setIsLoading,
      navigate,
      setUser
    });
  };

  const isFormValid = () => {
    return userValue === "" || passValue === "";
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-L-black">
      <div id="container" className="flex justify-center w-full gap-2 rounded-2xl">
        <form
          id="login-form"
          className="flex flex-col justify-center w-full md:w-2/6 text-center bg-white p-4 md:rounded-2xl h-screen md:h-full"
          onSubmit={handleSubmit}>
          <div className="relative flex   justify-between items-center">
            <Link to={"/"} className="font-bold hover:text-yellow flex items-center"><ArrowLeft className="h-5 w-5" />Back to home</Link>
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

          <div className="flex justify-between">
            <Link
              className="text-left w-2/5 lg:ml-0 mb-2 text-sm hover:text-yellow font-bold"
              to="/ConfirmEmail">
              Forgot Password?
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <i class="bi bi-info-circle-fill"></i>
                </TooltipTrigger>
                <TooltipContent className="bg-yellow text-L-black font-bold rounded-full">
                  <p>For testing: test, 123 or use google</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

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
      </div>
    </div>
  );
}