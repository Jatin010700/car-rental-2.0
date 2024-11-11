import React, { useEffect, useState } from "react";
import { NavBar } from "../../navbar/navbar";
import { Footer } from "../../main_page/footer";
import { NumberPages } from "./number_of_page";
import { Link } from "react-router-dom";
import { Preloader } from "../../../extra/preloader";

const ListOfCar = ({
  currentOwner,
  name,
  image,
  info,
  rent,
  icon,
  link,
  link1,
  searchQuery,
  isLoading,
}) => {
  const filteredCars = name.toLowerCase().includes(searchQuery.toLowerCase());

  if (!filteredCars) {
    return null;
  }

  return (
    <>
      {isLoading ? (
        <Preloader className="flex justify-center items-center" />
      ) : (
        <>
          <p className="text-4xl mb-4 font-bold text-yellow text-uppercase">
            {name}
          </p>

          <div className="">{image}</div>

          <p className="py-2 text-lg font-bold">
            Current Owner:
            <span className="text-2xl uppercase text-yellow">
              {currentOwner}
            </span>
          </p>
          <div className="w-full ">
            <div className="flex items-center">
              <h2 className=" text-xl">Price :</h2>
              <p className="ml-2">{info}</p>
            </div>
            <div className="flex items-center">
              <h2 className="font-bold text-xl">Rent price :</h2>
              <p className="ml-2">{rent}</p>
            </div>
            <div className="flex items-center">
              <p className="font-bold text-xl">Specification :</p>
              <div className="flex flex-wrap gap-2 text-yellow text-2xl p-2">
                {icon}
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              <Link
                className="text-L-black bg-yellow rounded-full py-2 px-4 md:px-12 font-bold active:scale-95 transition ease-in-out hover:scale-110 duration-150"
                to={link}>
                Rent Now
              </Link>
              <Link
                className="text-L-black bg-yellow rounded-full py-2 px-4 md:px-12 font-bold active:scale-95 transition ease-in-out hover:scale-105 duration-150"
                to={link1}>
                More Info
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const SearchCar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [carListings, setCarListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const carsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    const fetchCarListings = async () => {
      try {
        const response = await fetch(
          "https://car-rental-back.onrender.com/api/car-data"
        );
        if (response.ok) {
          const data = await response.json();
          setCarListings(data);
        } else {
          console.error("Failed to fetch car lists");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarListings();
  }, [searchQuery]);

  const mappedCarListings = carListings.map((listing, id) => ({
    title: listing.owner_car_name,
    image: (
      <img
        src={JSON.parse(listing.owner_image_url)[0]}
        alt=""
        className=" rounded-xl"
      />
    ),
    currentOwner: listing.login_user_name,
    info: `$${parseFloat(listing.owner_car_price).toLocaleString()}`,
    rent: `$${parseFloat(listing.owner_car_rent).toLocaleString()}/month`,
    icon: [
      <i className="bi bi-speedometer"></i>,
      <i class="bi bi-fuel-pump-fill"></i>,
      <i class="bi bi-signpost-fill"></i>,
    ],
    link: ``,
    link1: `/info1/${encodeURIComponent(listing.owner_car_name)}
    /${encodeURIComponent(JSON.parse(listing.owner_image_url)[0])}
    /${encodeURIComponent(parseFloat(listing.owner_car_price).toLocaleString())}
    /${encodeURIComponent(parseFloat(listing.owner_car_rent).toLocaleString())}
    /${encodeURIComponent(listing.login_user_name)}`
  }));

  const filteredCars = mappedCarListings.filter((car) =>
    car.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const resetSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <>
      <NavBar />
      <div className="bg-white">
        <div className="pt-4 mr-5 flex justify-center">
          <i className="relative top-2 left-10 text-lg text-grey hover:text-yellow bi bi-search"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-full py-2 px-5 mb-4 bg-G-white text-black w-full md:w-2/4 border-2 border-yellow"
          />

          {searchQuery === "" ? null : (
            <i className="relative top-2 right-10 text-xl text-L-black hover:text-yellow cursor-pointer bi bi-x-circle-fill"
              onClick={resetSearch}></i>
          )}
        </div>
        <NumberPages
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        {currentCars.length > 0 ? (
          <div className="px-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentCars.map((car, index) => (
              <div key={index}
                className="flex flex-col bg-L-black text-white p-4 mb-4 rounded-2xl border-2 border-L-black">
                <ListOfCar
                  key={index}
                  name={car.title}
                  image={car.image}
                  currentOwner={car.currentOwner}
                  info={car.info}
                  rent={car.rent}
                  icon={car.icon}
                  link1={car.link1}
                  searchQuery={searchQuery}
                  isLoading={isLoading}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-80">
            <div className="flex flex-col w-full bg-L-black text-white p-4">
              <p className="text-2xl font-bold text-center">
                <i class="bi bi-x-circle"></i> CAR NOT FOUND !
              </p>
            </div>
          </div>
        )}
      </div>
      <NumberPages
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Footer />
    </>
  );
};
