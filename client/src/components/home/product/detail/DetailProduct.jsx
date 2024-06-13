import { useCallback, useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Slider from "react-slick";
import Navbar from "../../navbar/Navbar";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import mess from "./images/Facebook-Messenger-Logo-JPG.jpg";
import fb from "./images/Facebook-Logo-JPG.jpg";
import insta from "./images/Instagram-Logo-JPG.jpg";
import tw from "./images/Twitter-Logo-JPG.jpg";
import ShipPrice from "./shipping/ShipPrice";
import ShippingAdress from "./shipping/ShippingAddress";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineMinus } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import AddCard from "./AddCard";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../product.slide";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllPros, setSeenPro } from "../../productsHome.slide";
import { useTranslation } from "react-i18next";
import ProductItem from "../ProductItem";
import { infoUser, setUser } from "../../../user/user.slide";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  InstapaperShareButton,
  TwitterShareButton,
} from "react-share";
import axios from "axios";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#ee4d2d",
        marginRight: "25px",
        zIndex: 30,
        opacity: 0.8,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#ee4d2d",
        marginLeft: "25px",
        zIndex: 30,
        opacity: 0.8,
      }}
      onClick={onClick}
    />
  );
}

const DetailProduct = () => {
  const [idImg, setId] = useState(0);
  const [love, setLove] = useState(false);
  const [lover, setCountLover] = useState(345);
  const [priceShipping, setPriceShipping] = useState(false);
  const [address, setAddress] = useState(false);
  const [numberProduct, setNumberProduct] = useState(1);
  const [noticeAddcard, setNoticeAddcart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const products = useSelector(getAllPros);
  const product = products.find((x) => x._id === id);
  const { t } = useTranslation();
  const user = useSelector(infoUser);
  const relatedProducts = products.filter((x) => x.brand === product.brand);
  const [size, setSize] = useState("");

  useEffect(() => {
    dispatch(setSeenPro({ product })); // add pro has seen
    window.scrollTo({ top: 140, behavior: "smooth" });
  }, [idImg, id, product, dispatch]);

  const addFavorite = () => {
    setLove(!love);
    if (!love) {
      setCountLover(lover + 1);
    } else {
      setCountLover(lover - 1);
    }
  };
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const onShippingPrice = () => {
    setPriceShipping(true);
  };

  const offShippingPrice = () => {
    setPriceShipping(false);
  };

  const handleDecrement = () => {
    if (numberProduct === 1) {
      setNumberProduct(1);
    } else setNumberProduct(numberProduct - 1);
  };

  const handleIncrement = () => {
    if (numberProduct < product.stock) {
      setNumberProduct(numberProduct + 1);
    }
  };

  const displayNotice = useCallback(async () => {
    try {
      if (!user) {
        navigate("/login");
      } else {
        if (size === "") {
          alert("Vui lòng chọn size!");
          return false;
        }

        setNoticeAddcart(true);
        const res = await axios.post("/user/addtoCard", {
          product: {
            _id: product._id,
            name: product.title,
            actualPrice: product.actualPrice,
            img: product.album[0],
            oldPrice: product.oldPrice,
            quantity: numberProduct,
            stock: product.stock,
            size,
          },
        });

        dispatch(setUser(res.data.user));

        dispatch(
          addItem({
            _id: product._id,
            name: product.title,
            actualPrice: product.actualPrice,
            img: product.album[0],
            oldPrice: product.oldPrice,
            quantity: numberProduct,
            stock: product.stock,
            size,
          }),
        );

        setSize("");
      }
    } catch (errr) {
      console.log(errr);
    }
  }, [dispatch, navigate, user, product, numberProduct, size]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNoticeAddcart(false);
    }, 2000);

    return () => clearTimeout(timer);
  });

  const handleBuy = useCallback(async () => {
    try {
      if (!user) {
        navigate("/login");
      } else {
        if (size === "") {
          alert("Vui lòng chọn size!");
          return false;
        } else if (
          user.receiver.name === "" ||
          user.receiver.phone === "" ||
          user.receiver.address === "" ||
          user.receiver.detail === ""
        ) {
          alert("Vui lòng điền địa chỉ giao hàng!");
          return false;
        }

        const res = await axios.post("/user/addtoCard", {
          product: {
            _id: product._id,
            name: product.title,
            actualPrice: product.actualPrice,
            img: product.album[0],
            oldPrice: product.oldPrice,
            quantity: numberProduct,
            stock: product.stock,
            size,
          },
        });
        dispatch(setUser(res.data.user));
        dispatch(
          addItem({
            _id: product._id,
            name: product.title,
            actualPrice: product.actualPrice,
            img: product.album[0],
            oldPrice: product.oldPrice,
            quantity: numberProduct,
            stock: product.stock,
            size,
          }),
        );
        setSize("");
        navigate("/cart");
      }
    } catch (errr) {
      console.log(errr);
    }
  }, [dispatch, navigate, user, product, numberProduct, size]);

  return (
    <>
      <Navbar />
      {/* info product */}
      <div className="grid grid-cols-2 gap-3 w-[90%] m-auto bg-white ">
        <div className=" flex flex-col">
          <div className="mb-3 grid grid-cols-1 w-full h-[450px] place-items-stretch">
            <img
              src={product.album[idImg]}
              alt=""
              className="h-[450px] object-cover"
            />
          </div>

          <div className="flex gap-1"></div>
          <Slider {...settings}>
            {product.album.map((link, id) => (
              <img
                src={link}
                onMouseMove={() => setId(id)}
                alt="images slide"
                className="border hover:border-[#ee4d2d]"
              />
            ))}
          </Slider>

          <div className="flex justify-center gap-8 my-6 items-center">
            <div className="flex gap-2 items-center">
              <span className=" text-base"> {t("share")} </span>
              <div className="flex gap-1">
                <FacebookShareButton
                  url={
                    "https://vnexpress.net/lamborghini-huracan-evo-sieu-bo-gia-28-ty-dong-4521223.html"
                  }
                  quote={"huracan evo"}
                  hashtag="#huracan"
                >
                  <img src={fb} alt="" width="25px" height="25px" />
                </FacebookShareButton>
                <FacebookMessengerShareButton
                  url={"http://localhost:3000/detail/65e34d76afab92e6a45ab36c"}
                >
                  <img src={mess} alt="" width="25px" height="25px" />
                </FacebookMessengerShareButton>
                <InstapaperShareButton>
                  <img src={insta} alt="" width="25px" height="25px" />
                </InstapaperShareButton>

                <TwitterShareButton>
                  <img src={tw} alt="" width="25px" height="25px" />
                </TwitterShareButton>
              </div>
            </div>
            <div className="border opacity-75 border-black h-[25px]"></div>
            <div className="flex gap-1 items-center text-base">
              <button onClick={() => addFavorite()}>
                {love ? (
                  <FaHeart className="w-[1.5rem] h-[1.5rem] text-[#ee4d2d]" />
                ) : (
                  <FaRegHeart className="w-[1.5rem] h-[1.5rem] text-[#ee4d2d]" />
                )}
              </button>
              <span>
                {t("likes")}({lover})
              </span>
            </div>
          </div>
        </div>
        <div className=" px-3 mt-2  ">
          <h1 className="text-2xl font-medium">{product.title}</h1>
          <div className=" font-medium text-lg my-3">
            {`${t("brand")}: `}{" "}
            <span className=" text-blue-600 underline">{product?.brand}</span>
          </div>
          <div className="flex items-center bg-[#fafafa] justify-start gap-2 text-xl">
            <span className=" text-lg text-[#929292] line-through">
              ₫ {product.oldPrice}
            </span>
            <span className="text-main text-3xl">₫ {product?.actualPrice}</span>
            <span className="bg-[#d0011b] text-white ml-1 text-sm p-1">
              {`${t("discount")}: `}
              {(
                Math.fround(
                  1 -
                    (
                      Number(product?.actualPrice.replaceAll(".", "")) /
                      Number(product?.oldPrice.replaceAll(".", ""))
                    ).toFixed(2),
                ) * 100
              ).toFixed(0)}
              %
            </span>
          </div>

          {/* short desc */}
          <div className="mt-6">
            <div
              dangerouslySetInnerHTML={{
                __html: `${product.short_desc}`,
              }}
            ></div>
          </div>

          <div className="flex items-start justify-start mt-6">
            <div className=" mr-6 text-[#757575] w-[80px]">
              {t("transport")}
            </div>
            <div className="mr-3">
              <img
                src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/baa823ac1c58392c2031.svg"
                alt=""
                width="20px"
                height="20px"
              />
            </div>
            <div className="flex items-start flex-col gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center ">
                  <span className="text-[#757575] w-[110px]">
                    {t("shipTo")}
                  </span>
                </div>
                <button
                  className="flex gap-2 items-center justify-between"
                  onClick={() => setAddress(true)}
                >
                  <span className="text-[#000]">
                    {user.receiver.address !== ""
                      ? user?.receiver?.address.substring(0, 26)
                      : "Huyện Ba Vì"}
                  </span>
                  <img
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/c98ab2426710d89c9f14.svg"
                    alt=""
                  />
                </button>
              </div>
              <div className="flex items-center gap-3 relative">
                <span className="text-[#757575] w-[110px]">
                  {" "}
                  {t("ship_fee")}
                </span>
                <button
                  className="flex gap-2 items-center justify-between "
                  onMouseOut={offShippingPrice}
                  onMouseOver={onShippingPrice}
                >
                  <span className="text-[#000] hover:text-[#ee4d2d]">
                    ₫ 30.000
                  </span>
                  <img
                    src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/c98ab2426710d89c9f14.svg"
                    alt=""
                  />
                </button>
                {priceShipping && (
                  <div className=" absolute top-[25px] bg-white z-50">
                    <ShipPrice />
                  </div>
                )}
                {address && (
                  <div className=" absolute top-[25px]">
                    <ShippingAdress setAddress={setAddress} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-start mt-6">
            <div className=" mr-6 text-[#757575] w-[80px]">Size:</div>
            <div className="mr-3 flex items-center gap-1 w-full ">
              {product.list_size.map((s) => (
                <div
                  onClick={() => setSize(s)}
                  className={`${
                    size === s
                      ? "border-main border-[2px] text-main"
                      : "border border-[#757575]"
                  }   font-semibold  px-4 py-3 hover:cursor-pointer hover:border-[#ee4d2d] hover:text-[#ee4d2d]`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-start mt-6">
            <div className=" mr-5  text-[#757575] w-[70px]">
              {" "}
              {t("quantity")}:
            </div>
            <div className=" border-2 text-gray-400 w-fit">
              <span className="flex justify-center items-center text-black py-1 px-5">
                <button
                  onClick={handleDecrement}
                  className="border border-[#757575]"
                >
                  <AiOutlineMinus />
                </button>
                <span className="px-4 box-border text-lg">{numberProduct}</span>
                <button
                  onClick={handleIncrement}
                  className="border border-[#757575]"
                >
                  <IoMdAdd />
                </button>
              </span>
            </div>
            <span className=" ml-4 text-[#757575] text-lg">
              {`${product.stock} `} {t("available")}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1 mt-7">
            <button
              onClick={() => displayNotice()}
              className=" flex flex-row text-lg  bg-[#f0e0dd] text-[#ee4d2d] items-center justify-center border border-[#ee4d2d]"
            >
              <MdOutlineAddShoppingCart />
              <span className="ml-1 py-3 text-base"> {t("addCart")}</span>
            </button>
            <button
              onClick={() => handleBuy()}
              className=" text-base text-white bg-main items-center justify-center border border-[#ee4d2d]"
            >
              {t("buyNow")}
            </button>
          </div>
          {noticeAddcard && <AddCard />}
        </div>
      </div>

      {/* desc */}
      <div className="grid w-[90%] m-auto bg-white mt-6 p-6">
        <h2 className="text-2xl font-semibold mb-6">{t("detail_desc")}</h2>
        <div dangerouslySetInnerHTML={{ __html: `${product.long_desc}` }}></div>
      </div>

      {/* sp lien quan cung hang */}
      <div className="w-[90%] m-auto mt-10">
        <h2 className="text-2xl font-semibold mt-2">{t("relatedPro")}</h2>
        <div className="grid grid-cols-5 justify-between">
          {relatedProducts.slice(0, 5).map((pro) => (
            <ProductItem item={pro} />
          ))}
        </div>

        <Link to="/seemore" className=" flex justify-center">
          <button className="bg-[#ee4d2d] text-white px-6 py-2 text-center mt-2 hover:text-[#ee2d4d] hover:font-bold hover:bg-white">
            {t("more")}
          </button>
        </Link>
      </div>
    </>
  );
};

export default DetailProduct;
