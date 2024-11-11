import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/user_action/action";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../extra/icon";
import { Preloader } from "../../extra/preloader";
import { setUsernameState } from "../../redux/store/store";
import { useAuth } from "../../extra/authContext";

export default function LogIn() {
    const [userValue, setUserValue] = useState("");
    const [passValue, setPassValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    let [paraValue, setParaValue] = useState("");
    let [success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const { handleLogin } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setSuccess(true);
      const response = await fetch("https://car-rental-back.onrender.com/api/login", {
        // https://car-rental-back.onrender.com/login
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userValue,
          password: passValue,
          email: emailValue,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setParaValue(data.message);

        // Assuming your JWT token is returned in data.token
        const token = data.token;
        if (!token) {
          throw new Error("Token not found in the response.");
        }
        // Store the token in a secure way (e.g., localStorage or cookies)
        localStorage.setItem("token", token);
        handleLogin(token);

        dispatch(setUsernameState(userValue));
        dispatch(login());
        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else {
        const errorData = await response.json();
        setParaValue(errorData.error);

        setTimeout(() => {
          setParaValue("");
        }, 1000);

        setSuccess(false);
        setIsLoading(false);
      }
    } catch (error) {
      alert("An error occurred during login.");
    }
  };

  const isFormValid = () => {
    return userValue === "" || passValue === "";
  };

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
    <div className="flex justify-center items-center ">
      <div id="container"
        className="flex justify-center lg:w-3/4 gap-2 md:mt-24 rounded-2xl">
        <form
          id="login-form"
          className="flex flex-col justify-center w-screen md:w-full text-center bg-white p-4 md:rounded-2xl h-screen md:h-full"
          onSubmit={handleSubmit}>
          <Link
            className="text-L-black text-5xl text-center font-bold transition ease-in-out hover:scale-105 duration-150 mb-4 lg:hidden "
            to={"/"}>
            <span className="text-yellow">Car </span>
            <i className=" bi bi-car-front-fill"></i> Rental
          </Link>
          <p className={`text-center font-bold text-white ${success ? "success" : "error"}`}>
            {paraValue}
          </p>

          <h2 className="text-yellow text-4xl font-bold">LOG IN</h2>
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

          <div className=" input-field">
            <input
              type="email"
              id="email"
              className="user_input"
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
            className="flex justify-left lg:ml-0 ml-6 mt-2 mb-2 text-sm hover:text-yellow font-bold"
            to="/ConfirmEmail">
            Forgot Password?
          </Link>

          <div className="flex gap-2 items-center flex-col lg:flex-row">
            <button
              type="submit"
              id="loginBTN"
              className="register_or_logIn_btn btn"
              disabled={isFormValid()}
              onClick={handleSubmit}>
              {isLoading ? <Preloader /> : "LOGIN"}
            </button>

            <Link to="/register"
              className="register_or_logIn_btn">
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
                <Icon />
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
            <p className="text-white p-4">
              Welcome to our car rental website! We offer a wide range of
              vehicles and flexible rental options to suit your needs. With
              exceptional customer service and affordable rates, we make renting
              a car easy and stress-free. Browse our selection and discover the
              convenience of renting with us.
              <span className="text-yellow text-lg ml-2">
                Start journey with us!
              </span>
            </p>
            <p className="text-white mt-14">
              <i className="text-yellow bi bi-caret-left-fill"></i> 
              Don't have an Account? <span className="text-yellow font-bold"> SIGN UP</span>
            </p>

            <p className="text-white mt-10"><span className="text-yellow">*</span>Use this Account: Test, test@test,  123</p>
          </div>
        </div>
      </div>
    </div>
  );
}