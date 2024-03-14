import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { productColumns, ordersColumns, userColumns } from "./datatablesource";
import NewProduct from "./add/newProduct/NewProduct";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateProduct from "./update/updateProduct/UpdateProduct";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import UpdateUser from "./update/updateUser/UpdateUser";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuufeOYng-ve2PKMolBS59gfiCz19Dn_U",
  authDomain: "admin-dashboard-e9faf.firebaseapp.com",
  projectId: "admin-dashboard-e9faf",
  storageBucket: "admin-dashboard-e9faf.appspot.com",
  messagingSenderId: "47960880587",
  appId: "1:47960880587:web:30ed94a5e1da9aa618b24e",
  measurementId: "G-CKVNG4HSLR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="user">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />

              <Route
                path="update/:id"
                element={
                  <ProtectedRoute>
                    <UpdateUser inputs={userInputs} title="Edit User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="product">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={productColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewProduct
                      inputs={productInputs}
                      title="Add New Product"
                    />
                  </ProtectedRoute>
                }
              />

              <Route
                path="update/:id"
                element={
                  <ProtectedRoute>
                    <UpdateProduct
                      inputs={productInputs}
                      title="Edit Product"
                    />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="orders">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={ordersColumns} />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
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
    </div>
  );
}

export default App;
