import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { VscPassFilled } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { infoUser, setUser } from "../user/user.slide";
import { useNavigate } from "react-router-dom";

const Total = ({ total, products }) => {
  const infoBuyer = useSelector(infoUser);
  const [active, setActive] = useState("cod");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkoutCard = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51OrjgR01xya3lYTPQBNckpF3wWEAD1gpp6Qea0l41xhRNoewm2u62fIm8YbeAUXFfqeXTbmeBSsuaqa3pSKfXWSf00j6OWe604",
      );
      const response = await axios.post("/order/create-checkout-session", {
        products,
        infoBuyer,
      });

      await Promise.all(
        products.map(async (it) => {
          await axios.post("/user/deleteproduct", { idPro: it._id });
        }),
      );

      const session = response.data.id;
      const result = stripe.redirectToCheckout({
        sessionId: session,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch {}
  };

  const checkoutCod = async () => {
    try {
      const response = await axios.post("/order/checkoutCod", {
        products,
        infoBuyer,
      });

      await Promise.all(
        products.map(
          async (it) =>
            await axios.post("/user/deleteproduct", {
              idPro: it._id,
              size: it.size,
            }),
        ),
      ).then(async (res) => {
        dispatch(setUser(res[0].data.user));
      });
      navigate("/profile/purchase");
      toast.success(response.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <div className=" w-[90%] m-auto bg-white mt-5">
      <div className="flex items-center gap-4 py-7 pl-5" role="group">
        <span className="text-base font-medium">{t("payment")} </span>
        <button
          onClick={() => setActive("card")}
          className={`px-4 py-4 text-base font-medium  bg-white border  ${
            active === "card"
              ? "text-[#ee4d2d] border-[#ee4d2d]"
              : "text-black border"
          }  focus:z-10 hover:text-main hover:border-main relative`}
        >
          <span>{t("credit")}</span>
          {active === "card" && (
            <VscPassFilled className=" fill-main absolute bottom-0 right-0 " />
          )}
        </button>
        <button
          onClick={() => setActive("cod")}
          className={`px-4 py-4 text-base font-medium  bg-white border ${
            active === "cod"
              ? "text-[#ee4d2d] border-[#ee4d2d] "
              : "text-black border"
          }  focus:z-10 hover:text-main hover:border-main relative`}
        >
          <span>{t("cash")}</span>
          {active === "cod" && (
            <VscPassFilled className=" fill-main absolute bottom-0 right-0 " />
          )}
        </button>
      </div>
      <hr />
      <div className="pl-5 my-5">
        {active === "cod" && (
          <>
            <span className=" mr-5">{t("cash")} </span>
            <span>{t("contentCash")}</span>
          </>
        )}
        {active === "card" && <>{t("contentCredit")} </>}
      </div>
      <hr />
      <div className="my-5 flex justify-end pr-5">
        <div>
          <div className="flex gap-5 text-base mb-5 justify-between items-center text-[#757575] ">
            <span>{t("checkoutTotal")} </span>
            <span>₫ {new Intl.NumberFormat("en-DE").format(total)}</span>
          </div>
          <div className="flex gap-5 text-base mb-5 justify-between items-center text-[#757575] ">
            <span>{t("checkoutShipping")}</span>
            <span>₫ {new Intl.NumberFormat("en-DE").format(30000)}</span>
          </div>
          <div className="flex gap-5 text-base mb-5 justify-between items-center  ">
            <span className="text-[#757575]">{t("checkoutPayment")} </span>
            <span className="text-main text-3xl">
              ₫ {new Intl.NumberFormat("en-DE").format(total + 30000)}
            </span>
          </div>
        </div>
      </div>
      <hr />
      <div className=" flex justify-between items-center p-5">
        <span>
          {t("terms")}{" "}
          <span className=" text-blue-500">{t("transaction")}</span>
        </span>
        {active === "cod" ? (
          <button
            className="bg-main w-[200px] text-base text-white px-4 py-4"
            onClick={() => checkoutCod()}
          >
            {/* <Link to="/bill">{t("checkoutOrder")}</Link> */}
            {t("checkoutOrder")}
          </button>
        ) : (
          <button
            className="bg-main w-[200px] text-base text-white px-4 py-4"
            onClick={() => checkoutCard()}
          >
            {/* <Link to="/bill">{t("checkoutOrder")}</Link> */}
            {t("paymentCheckout")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Total;
