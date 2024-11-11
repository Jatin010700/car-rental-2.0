import React from "react";
import rev3 from "../../assets/rev3.jpg";

export const Review = () => {
  return (
    <div className="bg-white">
      <section className="dark:bg-gray-800 dark:text-gray-100">
        <div className="container px-6 py-12  mx-auto">
          <div className="grid items-center gap-4 xl:grid-cols-5">
            <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
              <h1 className="text-center font-bold text-4xl p-4">
                <span className="underline decoration-yellow">Revi</span>ews
              </h1>
              <p className="text-justify">
                Customers love our car website! With a wide selection,
                competitive prices, and a user-friendly interface, finding your
                dream car is a breeze. One customer said, "I found my perfect
                car within minutes. The detailed listings and easy search
                filters made it effortless." Another customer mentioned,
                "Accurate car descriptions helped me make an informed decision.
                Highly recommended!"
              </p>
            </div>
            <div className="p-6 xl:col-span-3">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid content-center gap-4">
                  <div className="p-6 rounded-2xl shadow-md bg-L-black text-white">
                    <p className="text-justify">
                    I had a great experience with Car Rental. The site was
              user-friendly, and I was able to quickly find a car that suited my
              needs and budget. The booking process was straightforward, and the
              pricing was transparent. The car was clean and well-maintained,
              and the staff was friendly and efficient. Overall, it was good.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src={rev3}
                        alt=""
                        className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">Ameliah</p>
                        <p className="text-sm dark:text-gray-400">
                          Teacher
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl shadow-md bg-yellow ">
                    <p className="text-justify">
                    The pricing was transparent. The car was clean and
              well-maintained, and the staff was friendly and efficient.
              Overall, it was good
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src={rev3}
                        alt=""
                        className="w-12 h-12 bg-grey rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">Ameliah</p>
                        <p className="text-sm dark:text-gray-400">
                          Software Developer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid content-center gap-4">
                  <div className="p-6 rounded-2xl shadow-md bg-yellow  ">
                    <p className="text-justify">
                    The site was user-friendly, and I was able to quickly find a car
              that suited my needs and budget. The booking process was
              straightforward, and the pricing was transparent. The car was
              clean and well-maintained.
                    </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src={rev3}
                        alt=""
                        className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">Ameliah</p>
                        <p className="text-sm dark:text-gray-400">
                          Student
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl shadow-md bg-L-black text-white">
                  <p className="text-justify">
                Customers love our car website! With a wide selection,
                competitive prices, and a user-friendly interface, finding your
                dream car is a breeze. One customer said, "I found my perfect
                car within minutes. The detailed listings and easy search
                filters made it effortless." Another customer mentioned,
                "Accurate car descriptions helped me make an informed decision.
                Highly recommended!" Start your search today and experience the
                difference.{" "}
              </p>
                    <div className="flex items-center mt-4 space-x-4">
                      <img
                        src={rev3}
                        alt=""
                        className="w-12 h-12 bg-center bg-cover rounded-full dark:bg-gray-500"
                      />
                      <div>
                        <p className="text-lg font-semibold">Ameliah</p>
                        <p className="text-sm dark:text-gray-400">
                          Full Stack Developer
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
