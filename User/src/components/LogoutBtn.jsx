import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { setAddress } from "../redux/addressSlice";
import { setItem } from "../redux/cartSlice";
import { Logout } from "@mui/icons-material";

const LogoutBtn = ({className}) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setAddress(null));
    dispatch(setItem([]));
  };

  return (
    <button
      onClick={handleLogout}
      className={` ${className ? className : " flex whitespace-nowrap gap-1 cursor-pointer"}`}
    >
      <Logout /> Logout
    </button>
  );
};

export default LogoutBtn;
