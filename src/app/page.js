import Home2About from "@/components/about/Home2About";
import Home2Activities from "@/components/activities/Home2Activities";
import Home2Banner from "@/components/banner/Home2Banner";
import Home2Banner2 from "@/components/banner/Home2Banner2";
import Footer from "@/components/footer/Footer";
import Header2 from "@/components/header/Header2";

import Home2VideoSection from "@/components/videoSection/Home2VideoSection";
import Home2WhyChoose from "@/components/whyChoose/Home2WhyChoose";
import DigitalPaymentSection from "@/components/features/DigitalPaymentSection";
import PartnersSection from "@/components/partners/PartnersSection";
import React from "react";

export const metadata = {
  title: "iTravelsHub - Tour & Travel Agency  NextJs Template",
  description:
    "iTravelsHub is a NextJs Template for Tour and Travel Agency purpose",
  icons: {
    icon: "/assets/img/sm-logo.svg",
  },
};

const page = () => {
  return (
    <>
      <Header2 />
      <Home2Banner />
      <DigitalPaymentSection />

      <Home2About />
      <Home2Activities />
      <Home2WhyChoose />
      <Home2VideoSection />
      <Home2Banner2 />
      <PartnersSection />
      <Footer style="style-2" />
    </>
  );
};

export default page;
