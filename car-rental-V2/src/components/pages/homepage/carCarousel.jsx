import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSnapCarousel } from "react-snap-carousel";
import { Preloader } from "@/components/common/preloader";
import { handleCarProduct } from "@/services/productServices";

const ListOfcar = ({ image, title, para, link }) => {
  return (
    <div id="getWrap" className="wrapper">
      <ul className="p-3 carousel">
        <li className="card">
          <div className="transition ease-in-out hover:scale-105 duration-150  img">
            {image}
          </div>
          <h2 className="font-bold text-2xl text-yellow m-2">{title}</h2>
          <p className="text-white para">{para}</p>
          <div className="flex flex-wrap gap-2 p-2">
            <Link to={link} className="bg-yellow rounded-full py-2 px-20 font-bold transition ease-in-out active:scale-95 hover:scale-105 duration-150 infoBTN">
              More Info
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export const CarCarousel = () => {
  const { scrollRef, next, prev } = useSnapCarousel();
  const [isLoading, setIsLoading] = useState(true);
  const [carListings, setCarListings] = useState([]);

  useEffect(() => {
    const fetchCarListings = async () => {
      const data = await handleCarProduct();
      setCarListings(data);
      setIsLoading(false);
    };

    fetchCarListings();
  }, []);

  if (isLoading) {
    return <Preloader className="p-10 bg-white flex justify-center items-center" size={75}/>
  }
  const mappedCarListings = carListings.map((listing, index) => ({
    image: <img src={JSON.parse(listing.owner_image_url)[0]} alt="" />,
    title: listing.owner_car_name,
    para: `Price: $${parseFloat(listing.owner_car_price).toLocaleString()} | $${parseFloat(listing.owner_car_rent).toLocaleString()}/month`,
    link: `/productPage/${encodeURIComponent(listing.owner_car_name)}
    /${encodeURIComponent(JSON.parse(listing.owner_image_url)[0])}
    /${encodeURIComponent(parseFloat(listing.owner_car_price).toLocaleString())}
    /${encodeURIComponent(parseFloat(listing.owner_car_rent).toLocaleString())}
    /${encodeURIComponent(listing.login_user_name)}`
  })).slice(0, 8);
  return (
    <div className="bg-white px-4 md:!px-12 removePad">
      <h2 className="text-4xl font-bold text-center px-4 pt-4 pb-0 md:!pb-4">
        Cars For <span className="underline-rounded">Rent</span>
      </h2>

      <ul
        ref={scrollRef}
        style={{
          display: "flex",
          overflow: "hidden",
          scrollSnapType: "x mandatory",
        }}>
        {mappedCarListings.map((car, index) => (
          <li key={index}>
          <ListOfcar
            image={car.image}
            title={car.title}
            para={car.para}
            link={car.link}
          />
          </li>
        ))}
      </ul>

      <div className="flex justify-center p-2 gap-2">
        <button onClick={() => prev()}
        className="carouselBTN">
          <i id="left"className="bi bi-caret-left-fill"></i>
        </button>
        <button onClick={() => next()}
        className="carouselBTN">
          <i id="right" className="
          bi bi-caret-right-fill"></i>
        </button>
      </div>
    </div>
  );
};