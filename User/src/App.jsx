import { Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Header from "./components/Header";
import { Footer, ServiceSection, SubscribeSection } from "./components";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addToCart, getCart } from "./redux/cartSlice";
import { logout, validateToken } from "./redux/authSlice";
import { useRef } from "react";
import { fetchAddress } from "./redux/addressSlice";

function App() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token)
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // seconds
    const timeLeft = decoded.exp - currentTime;

    if (timeLeft <= 0) {
      dispatch(logout());
    } else {
      dispatch(validateToken(decoded));
      dispatch(getCart());
      dispatch(fetchAddress())

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Set a new timeout to logout when token expires
      timeoutRef.current = setTimeout(() => {
        dispatch(logout());
      }, timeLeft * 1000);
    }

    // Cleanup on unmount or token change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [token, dispatch]);

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
