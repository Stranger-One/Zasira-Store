import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const RouteProtector = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token && !pathname.includes("/auth")) {
      navigate("/auth/sign-in");
    } else if (token && pathname.includes("/auth")) {
      navigate("/");
    }
  }, [token, navigate, pathname]);

  return <>{children}</>;
};

export default RouteProtector;
