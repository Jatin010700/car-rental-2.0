import React from "react";
import { NavBar } from "../components/navbar/navbar";
import { Footer } from "../components/main_page/footer";
import { Preloader } from "../extra/preloader"

export const Soon = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col flex-wrap justify center bg-white pt-32">
        <h1 className="flex gap-2 justify-center text-L-black text-4xl font-bold text-center ">
          Coming Soon <span className="text-B-yellow">
            {<Preloader/>}
            </span>
        </h1>
      </div>
      <div className="bg-white h-52"></div>
      <Footer />
    </>
  );
};
