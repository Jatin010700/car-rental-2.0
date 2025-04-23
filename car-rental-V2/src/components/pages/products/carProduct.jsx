import React, { useEffect, useMemo, useState } from "react";
import { NumberPages } from "./numberOfPage";
import { Link } from "react-router-dom";
import { Preloader } from "@/components/common/preloader";
import { handleCarProduct } from "@/services/productServices";

const ListOfCar = ({ carData, isLoading }) => {
  const { image, info, rent, currentOwner, icon, link, link1 } = carData;

  return (
    <>
      {isLoading ? (
        <Preloader className="flex justify-center items-center" />
      ) : (
        <>
          <div>{image}</div>
          <p className="py-2 font-bold">
            Current Owner : <span className="text-lg uppercase text-yellow">
              {currentOwner}
            </span>
          </p>
          <div className="w-full ">
            <div className="flex items-center">
              <h2 className="font-bold">Price :</h2>
              <p className="ml-2 text-lg">{info}</p>
            </div>
            <div className="flex items-center">
              <h2 className="font-bold">Rent price :</h2>
              <p className="ml-2 text-lg">{rent}</p>
            </div>
            <div className="flex items-center">
              <p className="font-bold text-lg">Specification :</p>
              <div className="flex flex-wrap gap-2 text-yellow text-2xl p-2">
                {icon.map((iconItem, index) => (
                  <i key={index} className={iconItem.props.className}></i>
                ))}
              </div>
            </div>

            <div className="flex gap-2 justify-center">
              <Link className="yellowBTN" to={link}>
                Rent Now
              </Link>
              <Link className="yellowBTN" to={link1}>
                More Info
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const CarProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [carListings, setCarListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const carsPerPage = 8;

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    const fetchCarListings = async () => {
      const data = await handleCarProduct();
      setCarListings(data);
      setIsLoading(false);
    };

    fetchCarListings();
  }, [searchQuery]);

  const mappedCarListings = carListings.map((listing) => ({
    title: listing.car_name,
    image: (<img src={JSON.parse(listing.image_url)[0]} alt="" className="rounded-xl"/>),
    currentOwner: listing.owner_user_name,
    info: `$${parseFloat(listing.car_price).toLocaleString()}`,
    rent: `$${parseFloat(listing.car_rent).toLocaleString()}/month`,
    icon: [
      <i className="bi bi-speedometer"></i>,
      <i className="bi bi-fuel-pump-fill"></i>,
      <i className="bi bi-signpost-fill"></i>,
    ],
    link: ``,
    link1: `/productPage/${encodeURIComponent(listing.car_name)}
    /${encodeURIComponent(JSON.parse(listing.image_url)[0])}
    /${encodeURIComponent(parseFloat(listing.car_price).toLocaleString())}
    /${encodeURIComponent(parseFloat(listing.car_rent).toLocaleString())}
    /${encodeURIComponent(listing.owner_user_name)}`
  }));

  const filteredCars = useMemo(() => {
    return mappedCarListings.filter((car) =>
      car.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery, carListings]);

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

      {isLoading ? (
        <>
        <div className="flex items-center justify-center h-72">
            <Preloader size={75}/>
        </div>
        </>
      ) : currentCars.length > 0 ? (
        <div className="px-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        {currentCars.map((car, index) => (
          <div className=" animate-pop-in flex flex-col bg-L-black text-white p-4 rounded-2xl border-2 border-L-black"
          key={index}>
            <ListOfCar
              carData={car}
              searchQuery={searchQuery}
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>
      ) : (
        <>
        <div className="flex items-center justify-center h-80">
          <div className="flex flex-col w-full bg-L-black text-white p-4">
            <p className="text-2xl font-bold text-center">
              NO CAR AVAILABLE
            </p>
          </div>
        </div>
        </>
      )}
      </div>
      <NumberPages
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};
