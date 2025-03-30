import React, { useState } from "react";
import { Link } from "react-router-dom";

export const ConfirmEmail = () => {
  const [emailValue, setEmailValue] = useState("");
  let [paraValue, setParaValue] = useState("");
  let [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("https://car-rental-back.onrender.com/confirmLink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailValue,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setParaValue(data.message); // Handle the success message
        setSuccess(true);
      } else {
        const errorData = await response.json();
        setParaValue(errorData.error); // Handle the error message
        setSuccess(false)
      }
    } catch (error) {
      console.error("Error:", error);
      setParaValue("An error occurred during email sending.");
    }
  };

  const isFormValid = () => {
    return emailValue === "";
  };

  return (
    <>
      <div className="bg-white p-4 md:p-20 flex justify-center items-center">
        <div className="flex flex-wrap flex-col w-full max-w-md bg-L-black p-4 text-white  md:p-8 rounded-2xl">
          <h1 className="font-bold text-2xl md:text-3xl text-center mb-4">
            Send Confirmation
          </h1>
          <hr />
          <p className={`text-center font-bold text-white mt-2 ${success ? "success" : "error"}`}>
            {paraValue}
          </p>
          <form className=" flex flex-col" onSubmit={handleSubmit}>
            <label className="p-2">
              Email<span className="text-yellow"> *</span>
            </label>
            <input
              type="email"
              className="rounded-full py-2 px-4 bg-G-white text-black mb-4 w-full"
              placeholder="Enter your Email"
              autoComplete="off"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
            />
            <div className="flex flex-col gap-2 text-center md:flex-row md:justify-center md:gap-4">
              <Link
                className="bg-L-black hover:bg-yellow hover:text-L-black text-yellow py-2 px-4 rounded-full font-bold border-2 border-yellow transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-150"
                to="/login">
                Cancel
              </Link>
              <button
                type="submit"
                className=" bg-L-black hover:bg-yellow hover:text-L-black text-yellow py-2 px-4 rounded-full font-bold border-2 border-yellow transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-150 btn"
                disabled={isFormValid()}>
                Submit
              </button>
            </div>
            <hr className="mt-2" />
            <p className="text-sm text-center p-2">
              * <span className="font-bold text-yellow">Note:</span> Enter the
              email you used the most like
              <span className="text-yellow">Gmail</span> to receive your
              confirmation link!
            </p>
          </form>
        </div>
      </div>
    </>
  );
};