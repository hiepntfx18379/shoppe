import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./components/home/Home";
import UpdatePassword from "./components/user/password/update/UpdatePassword";
import Login from "./components/user/login/Login";
import Register from "./components/user/register/Register";
import ForgotPassword from "./components/user/password//forgot/ForgotPassword";
import VerifiedPassword from "./components/user/password/update/VerifiedPassword";
import SeeMore from "./components/see_more/SeeMore";
import FilterProducts from "./components/see_more/right/FilterProducts";
import DetailProduct from "./components/home/product/detail/DetailProduct";
import CartProduct from "./components/cart/CartProduct";
import CheckOut from "./components/checkout/CheckOut";
import ParentPage from "./components/parentPage/ParentPage";
import OTPVerify from "./components/user/register/OTPVerify";
import InfoUSer from "./components/user/register/InfoUSer";
import Verify from "./components/user/password/forgot/Verify";
import ResetPassword from "./components/user/password/forgot/ResetPassword";
import { useSelector } from "react-redux";
import { infoUser } from "./components/user/user.slide";
import Profile from "./components/user/profile/Profile";
import Info from "./components/user/profile/Info";
import Orders from "./components/user/profile/orders/Orders";
import ChangePassword from "./components/user/profile/ChangePassword";
import VerifyOldPwd from "./components/user/profile/VerifyOldPwd";

function App() {
  const user = useSelector(infoUser);

  return (
    <>
      <Routes>
        <Route path="/" element={<ParentPage />}>
          <Route index element={user ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyOtp" element={<OTPVerify />} />
          <Route path="/infoUser" element={<InfoUSer />} />
          <Route path="/forgotPwd" element={<ForgotPassword />} />
          <Route path="/verifyForgotPwd" element={<Verify />} />
          <Route
            path="/resetPassword/:activation_token"
            element={<ResetPassword />}
          />
          <Route path="/verifiedPwd" element={<VerifiedPassword />} />
          <Route path="/updatePwd" element={<UpdatePassword />} />
          <Route path="/seemore" element={<SeeMore />}>
            <Route index element={<FilterProducts />} />
            <Route path=":slug" element={<FilterProducts />} />
          </Route>
          <Route path="/detail/:id" element={<DetailProduct />} />
          <Route path="/cart" element={<CartProduct />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<Info />} />
            <Route path="purchase" element={<Orders />} />
            <Route path="verifyOldPwd" element={<VerifyOldPwd />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
