import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Preloader } from "@/components/common/preloader";
import { handleCarProduct } from "@/services/productServices";

const ListOfcar = ({ image, title, para, link }) => {
  return (
      <ul>
        <li className="flex flex-col items-center justify-center">
          <div className="img">
            {image}
          </div>
          <h2 className="font-bold text-2xl text-yellow m-2">{title}</h2>
          <p className="text-white para text-center">{para}</p>
          <div className="flex flex-wrap gap-2 px-4 py-3 w-full text-center">
            <Link to={link} className="bg-yellow rounded-full py-2 w-full font-bold transition ease-in-out active:scale-95 hover:scale-105 duration-150 infoBTN">
              More Info
            </Link>
          </div>
        </li>
      </ul>
  );
};

export function CarCarousel() {
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

  const mappedCarListings = carListings.map((listing) => ({
    image: <img src={JSON.parse(listing.image_url)[0]} alt="" />,
    title: listing.car_name,
    para: `Price: $${parseFloat(listing.car_price).toLocaleString()} | $${parseFloat(listing.car_rent).toLocaleString()}/month`,
    link: `/productPage/${encodeURIComponent(listing.car_name)}
    /${encodeURIComponent(JSON.parse(listing.image_url)[0])}
    /${encodeURIComponent(parseFloat(listing.car_price).toLocaleString())}
    /${encodeURIComponent(parseFloat(listing.car_rent).toLocaleString())}
    /${encodeURIComponent(listing.owner_user_name)}`
  })).slice(0, 8);
  return (
    <>
      <h2 className="text-4xl font-bold text-center px-4 pt-4 pb-0 md:!pb-4">
        Cars For <span className="underline-rounded">Rent</span>
      </h2>
      {isLoading ? (
        <>
          <div className="flex items-center justify-center h-72">
              <Preloader size={75}/>
          </div>
        </>
      ) : carListings.length > 0 ? (
        <Carousel
        opts={{
          loop: false,
          align: "start",
          containScroll: "trimSnaps",
          slidesToScroll: 1
        }}
        className="w-full max-w-[72%] md:max-w-[87%] lg:max-w-[92%] ml-14">
        <CarouselContent className="-ml-1">
          {mappedCarListings.map((car, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/4 ">
              <div className="px-2 py-3 animate-pop-in">
                <Card className="bg-L-black rounded-[20px]">
                  <CardContent className="flex items-center justify-center p-0">
                  <ListOfcar
                    image={car.image}
                    title={car.title}
                    para={car.para}
                    link={car.link}
                  />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
    </>
  )
}
