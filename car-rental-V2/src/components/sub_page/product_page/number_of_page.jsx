import React, { useState, useEffect } from "react";

export const NumberPages = ({ currentPage, totalPages, onPageChange }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setSlideIndex(Math.max(0, Math.min(currentPage - 1, totalPages - 3)));
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null; // No need for pagination when there's only one page
  }

  const handleSlideLeft = () => {
    if (currentPage > 1) {
      setSlideIndex((prevIndex) => prevIndex - 1);
      onPageChange(currentPage - 1);
    }
  };

  const handleSlideRight = () => {
    if (currentPage < totalPages) {
      setSlideIndex((prevIndex) => prevIndex + 1);
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex justify-center gap-2 px-4 pb-4">
        <div
          className={`cursor-pointer bg-yellow rounded-full w-11 text-center active:scale-95 transition ease-in-out hover:scale-105 duration-150 ${
            currentPage > 1 ? "cursor-pointer" : "opacity-0"
          }`}
          onClick={handleSlideLeft}>
          <i className="text-L-black relative top-2 text-xl bi bi-caret-left-fill"></i>
        </div>
        {Array.from({ length: Math.min(3, totalPages) }, (_, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 border-yellow p-2 w-11 text-center rounded-full 
            hover:bg-L-black hover:text-yellow font-bold transition ease-in-out hover:scale-105 duration-150 
            ${currentPage === slideIndex + index + 1 ? "bg-L-black text-yellow" : ""}`}
            onClick={() => onPageChange(slideIndex + index + 1)}>
            {slideIndex + index + 1}
          </div>
        ))}
        <div
          className={`bg-yellow rounded-full w-11 text-center active:scale-95 transition ease-in-out hover:scale-105 duration-150 ${
            currentPage < totalPages ? "cursor-pointer" : "opacity-0"
          }`}
          onClick={handleSlideRight}>
          <i className="text-L-black relative top-2 text-xl bi bi-caret-right-fill"></i>
        </div>
      </div>
    </div>
  );
};