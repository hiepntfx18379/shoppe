import sl1 from "../images/slide/slide-img1.jpg";
import sl2 from "../images/slide/slide-img2.jpg";
import sl3 from "../images/slide/slide-img3.jpg";
import sl4 from "../images/slide/slide-img4.jpg";
import sl5 from "../images/slide/slide-img5.jpg";
import sl6 from "../images/slide/slide-img6.jpg";
import sl7 from "../images/slide/slide-img7.jpg";
import sl8 from "../images/slide/slide-img8.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Advertisement = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        style={{ zIndex: 0 }}
      >
        <SwiperSlide>
          <img src={sl1} alt="images slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl2} alt="images slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl4} alt="images slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl3} alt="images slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl5} alt="images slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl6} alt="images slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl7} alt="images slide" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sl8} alt="images slide" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Advertisement;
