import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { LuLoaderCircle } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "../redux/authSlice";


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  })

  const { register, handleSubmit, formState: {errors}} = useForm({
    resolver: zodResolver(registerSchema)
  })

  const submit = (formData) => {    
    dispatch(signUp(formData));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96 select-none">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(submit)}>
          <input
            type="text"
            {...register("name")}
            placeholder="Full Name"
            className={`w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 ${errors.name ? " border-2 border-red-500" : "border focus:ring-green-500"}`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message} </p>
          )}
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
           className={`w-full px-4 py-2 mt-4 border rounded-lg focus:outline-none focus:ring-2 ${errors.email ? " border-2 border-red-500" : "border focus:ring-green-500"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message} </p>
          )}
          <div className="relative mt-4">
            <input
              type={showPassword ? "text" : "password"}
              {...register('password')}
              placeholder="Password"
             className={`w-full px-4 py-2 mt-4 rounded-lg focus:outline-none focus:ring-2 ${errors.password ? " border-2 border-red-500" : "border focus:ring-green-500"}`}
            />
            {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message} </p>
          )}
            <span
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 mt-6 rounded-md hover:bg-green-600  cursor-pointer"
          >
            {loading ? (
              <LuLoaderCircle size={20} className={`animate-spin mx-auto`} />
            ) : (
              "Sign Up"
            )}
          </button>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <FcGoogle className="mr-2" size={22} />
          Sign in with Google
        </button>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/auth/sign-in" className="text-blue-500 font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
