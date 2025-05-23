
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
      // console.log(data);
    //   dispatch(loginUser(data));
        navigate("/");
    } catch (error) {
      console.error("Error fetching user data:", error);
        navigate("/auth/login");
    }
  };

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    console.log({ token });
    if (token) {
      localStorage.setItem("token", token);
    } else {
      console.log("No token found in URL.");
    }

    fetchUser();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      Loading...
    </div>
  );
};

export default GoogleLoginsuccess;