import { Outlet } from "react-router-dom";
import Navigation from "../header/Navigation";
import Footer from "../footer/Footer";
import { createContext, useState, useEffect } from "react";
import { infoUser, setUser } from "../user/user.slide";
import { useDispatch, useSelector } from "react-redux";
import { getSeenProducts } from "../home/productsHome.slide";
import { useTranslation } from "react-i18next";
import Pagination from "../see_more/pagination/Pagination";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { toast } from "react-toastify";

export const userContext = createContext(null);

const ParentPage = () => {
  const info = useSelector(infoUser);
  const [user, getUserr] = useState(info);
  const seenProducts = useSelector(getSeenProducts);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/sucess", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObj) => {
          getUserr(resObj.user);
          const { email, name, phone, receiver, cardList } = resObj.user;
          dispatch(setUser({ email, name, phone, receiver, cardList }));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getUser();
  }, [dispatch]);

  useEffect(() => {
    const loadUser = () => {
      fetch("/user/getUser", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObj) => {
          const { email, name, phone, receiver, cardList } = resObj.user;
          dispatch(setUser({ name, email, phone, receiver, cardList }));
        })
        .catch((err) => {
          console.log(err);
        });
    };

    loadUser();
  }, [dispatch]);

  return (
    <userContext.Provider value={user || info}>
      <div>
        <Navigation />

        <Outlet />

        {/* seen */}
        {seenProducts.length > 0 && (
          <div className="w-[90%] m-auto mt-10">
            <h2 className="text-2xl font-semibold mt-2">{t("seen")}</h2>
            <Pagination listPro={seenProducts} num={5} col={5} />
          </div>
        )}

        <Footer />
      </div>
      {/* <MessengerCustomerChat pageId="112933455019534" appId="553429326697551" /> */}
    </userContext.Provider>
  );
};

export default ParentPage;
