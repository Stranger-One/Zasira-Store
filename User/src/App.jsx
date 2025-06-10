import { Outlet, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import Header from "./components/Header";
import { Footer, ServiceSection, SubscribeSection } from "./components";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart } from "./redux/cartSlice";
import { fetchAddress } from "./redux/addressSlice";
import { logout, validateToken } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth);


  const checkTokenExpiry = (token) => {
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      
      if (decoded.exp < currentTime) {
        logout();
      } else {
        dispatch(validateToken(decoded))
        // Set timeout to auto-logout when token expires
        setTimeout(logout, (decoded.exp - currentTime) * 1000);
      }
    }
  };

  useEffect(() => {
    checkTokenExpiry(token);
  }, [token]);

  return (
    <div className="bg-gray-400 w-full ">
      <Toaster />
      <div className=" w-full min-h-screen bg-gray-100 max-w-[1600px] mx-auto h-full relative">
        <Header />
        <Outlet />
        <SubscribeSection />
        <ServiceSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;
