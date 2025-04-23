import React, { useEffect, useState } from "react";

export const Cookies = () => {
  const [showCookie, setShowCookie] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (accepted) setShowCookie(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("cookieAccepted", "true");
    setShowCookie(false);
  };

  if (!showCookie) return null;

  return (
    <>
      <div className="fixed bottom-10 w-full flex justify-center z-50 animate-pop-in">
        <div className="flex flex-col md:flex-row justify-between items-center w-full md:w-3/4 mx-4 md:mx-0 bg-L-black text-white py-4 px-2 md:py-5 md:!px-10 rounded-3xl">

          <div className="flex flex-col w-4/5 pr-0 md:!pr-10">
            <h1 className="text-4xl font-bold text-yellow">
              Cookies
            </h1>
            <p className="text-sm md:text-md mb-4 md:!mb-0">
              We use cookies to make the website work properly, to measure usage and to show relevant advertisements, for example. If you click 'Agree', you accept all cookies. Rather not? Then we only place functional and anonymous analytical cookies.
            </p>
          </div>
            <div className="flex flex-col gap-2">
              <button onClick={handleSubmit}
              className="uppercase p-2 bg-yellow text-L-black rounded-full font-bold transition ease-in-out active:scale-95 hover:scale-105 duration-150">Accept</button>
              <button onClick={() => setShowCookie(false)}
              className="bg-L-black text-yellow font-bold uppercase hover:underline">No, rather not</button>
            </div>
        </div>
      </div>
    </>
  );
};
