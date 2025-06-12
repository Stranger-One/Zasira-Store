import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";
import { login } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const loginSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submit = (formData) => {
    dispatch(login(formData));
  };

  const handleGoogleLogin = () => {
    // console.log("Google Login clicked");
    window.open("http://localhost:5000/auth/google", "_self");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Email"
            />
            {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message} </p>
          )}
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Password"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="text-right mb-4">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition  cursor-pointer">
            {loading ? (
              <LuLoaderCircle size={20} className={`animate-spin mx-auto`} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
        >
          <FcGoogle className="mr-2" size={22} />
          Sign in with Google
        </button>

        <p className="text-center mt-4 text-gray-700">
          Not have an account?{" "}
          <Link to="/auth/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
