import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Add from "./pages/add";
import List from "./pages/list";
import Orders from "./pages/orderlist";
import Login from "./components/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./pages/editproduct";
import OrderDetails from "./pages/OrderDetails";
import ProductForm from "./components/ProductForm";
import EditProductDetails from "./pages/EditProductDetails";
import ProductDetails from "./pages/ProductDetails";
import Dashboard from "./pages/Dashboard";

export const backendURL = "http://localhost:5500";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Save token in local storage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    // console.log({pathname});
    if (pathname === "/" || pathname === "/admin" || pathname === "/admin/") {
      navigate("/admin/dashboard");
    }
  }, [pathname]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {token ? (
        <div className=" w-full">
          <Navbar setToken={setToken} />
          <div className="flex min-h-screen relative">
            <div className="w-[250px] flex-shrink-0 bg-white border-r-2">
              <Sidebar />
            </div>
            <div className="px-4 w-full my-8 text-gray-600 ">
              <Routes>
                <Route
                  path="/admin/dashboard"
                  element={<Dashboard token={token} />}
                />
                <Route path="/admin/list" element={<List token={token} />} />
                <Route
                  path="/admin/product/:productId"
                  element={<ProductDetails token={token} />}
                />
                <Route path="/admin/add" element={<Add token={token} />} />
                <Route
                  path="/admin/edit-product/:id"
                  element={<EditProductDetails token={token} />}
                />
                <Route
                  path="/admin/orders"
                  element={<Orders token={token} />}
                />
                <Route
                  path="/admin/order/:orderId"
                  element={<OrderDetails token={token} />}
                />
                <Route
                  path="/admin/login"
                  element={<Login setToken={setToken} />}
                />
              </Routes>
            </div>
          </div>
        </div>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
};

export default App;
