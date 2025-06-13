
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setToken, validateToken } from "../redux/authSlice";
import toast from "react-hot-toast";

const GoogleLoginsuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/user-details`,
        {
          withCredentials: true, // Important to send cookies!
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = res.data;
      dispatch(validateToken(data));
        navigate("/");
    } catch (error) {
      console.error("Error fetching user data:", error);
        navigate("/auth/login");
    }
  };

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (token) {
      dispatch(setToken(token))
      localStorage.setItem("token", token);
    } else {
      toast.error("No token found in URL.");
    }

    // fetchUser();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      Loading...
    </div>
  );
};

export default GoogleLoginsuccess;