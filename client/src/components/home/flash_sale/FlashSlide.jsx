import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FlashSaleItem from "./FlashSaleItem";

const FlashSlide = ({ products }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  return (
    <div className="">
      <Slider {...settings}>
        {products.slice(0, 10).map((pro, id) => (
          <FlashSaleItem pro={pro} key={id} />
        ))}
      </Slider>
    </div>
  );
};

export default FlashSlide;
