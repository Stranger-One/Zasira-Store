import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsAuthenticated, setUserData } from "../redux/authSlice";
import { setAddress } from "../redux/addressSlice";
import { setItem } from "../redux/cartSlice";
import { Logout } from "@mui/icons-material";

const LogoutBtn = ({className}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setUserData(null));
    dispatch(setIsAuthenticated(false));
    dispatch(setAddress(null));
    dispatch(setItem([]));
    navigate("/auth/sign-in");
  };
  return (
    <button
      onClick={handleLogout}
      className={` ${className ? className : " flex whitespace-nowrap gap-1 cursor-pointer"} `}
    >
      <Logout /> Logout
    </button>
  );
};

export default LogoutBtn;
