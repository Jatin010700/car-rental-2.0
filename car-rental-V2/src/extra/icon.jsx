import React from "react";

const iconList = [
  <i className="bi bi-google"></i>,
  <i className="bi bi-facebook"></i>,
  <i className="bi bi-microsoft"></i>,
  <i className="bi bi-twitter"></i>,
  <i className="bi bi-instagram"></i>,
];
const iconElements = iconList.map((icon, index) => (
  <div key={index} className="transition ease-in-out hover:scale-105 duration-150 cursor-pointer iconStyle">
    {icon}
  </div>
));

export function Icon() {
  return <>{iconElements}</>;
}
