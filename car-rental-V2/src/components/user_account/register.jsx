import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "../../extra/icon";
import { Preloader } from "../../extra/preloader";

export default function Register() {
  const [fullNameValue, setFullnameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [userValue, setUserValue] = useState("");
  const [passValue, setPassValue] = useState("");
  let [paraValue, setParaValue] = useState("");
  let [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      setSuccess(true);
      const response = await fetch("https://car-rental-back.onrender.com/api/register", {
        // https://car-rental-back.onrender.com/register
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullNameValue,
          email: emailValue,
          username: userValue,
          password: passValue,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setParaValue(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
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
      alert("An error occurred during registration.");
    }
  };

  const isFormValid = () => {
    return (
      fullNameValue === "" ||
      emailValue === "" ||
      userValue === "" ||
      passValue === ""
    );
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
      className="flex justify-center lg:w-3/4 gap-2 lg:mt-24 rounded-2xl">
      <form
        id="register-form"
        className="flex flex-col justify-center w-screen lg:w-2/4 text-center bg-white p-4 lg:rounded-2xl h-screen lg:h-full"
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

          <h2 className="text-yellow text-4xl font-bold">REGISTER</h2>

          <div className="mt-4 input-field">
            <input
              type="text"
              id="fullName"
              className="user_input"
              placeholder="Full name"
              autoComplete="off"
              required
              value={fullNameValue}
              onChange={(e) => setFullnameValue(e.target.value)}
            />
          </div>

          <div className="input-field">
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
              className="register_or_logIn_btn btn"
              disabled={isFormValid()}>
              {isLoading ? <Preloader /> : "REGISTER"}
            </button>

            <Link to="/login" className="register_or_logIn_btn">
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
            <Icon />
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
            <p className="text-white p-4">
              Enjoy exclusive benefits: easy reservations, exclusive discounts,
              faster check-ins, and personalized recommendations.
              <p className="mb-2 mt-2">
                <span className="text-yellow text-lg">Experience more: </span>
                Sign up and access an enhanced user experience with exclusive
                features and content tailored just for you.
              </p>
              <p className="mb-2">
                <span className="text-yellow text-lg">Stay informed:</span>{" "}
                Get the latest updates, news, and exciting announcements
                delivered directly to your inbox when you sign up.
              </p>
             
              <p className=" text-lg text-yellow">
                By creating an account you agree to our{" "}
                <span className="hover:text-yellow font-bold">
                  TERMS & PRIVACY
                </span>
              </p>
            </p>
            <p className="text-white">
              <i className="text-yellow bi bi-caret-left-fill"></i> Already a
              member?<span className="text-yellow font-bold"> SIGN IN</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
