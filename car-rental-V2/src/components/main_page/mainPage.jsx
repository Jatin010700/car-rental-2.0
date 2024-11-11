import React from 'react';
import { NavBar } from '../navbar/navbar';
import { Header } from './header';
import AdvancedCarousel from '../main_page/car';
import { ChooseUs } from './chooseUs';
import { Review } from './reviews';
import { Footer } from '../main_page/footer';

export function Home() {
  return (
    <>
      <NavBar />
        <Header />
        <AdvancedCarousel />
        <ChooseUs />
        <Review />
      <Footer /> 
    </>
  );
}
