import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import loginphoto from "@/assets/photo/signup.svg";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks/redux-hook";

import { useLoginMutation } from "@/redux/features/auth/authApi";
import { LoginResponse } from "@/redux/features/auth/auth.type";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result: LoginResponse = await login({ email, password }).unwrap();

      dispatch(
        setUser({
          user: {
            id: result.user.id,
            email: result.user.email,
            name: `${result.user.firstName} ${result.user.lastName}`,
            role: result.user.role,
          },
          token: result.accessToken,
        }),
      );

      // Role-based redirect
      switch (result.user.role) {
        case "ADMIN":
          navigate("/admin-dashboard");
          break;
        case "DOCTOR":
        case "NURSE":
        case "LAB_TECHNICIAN":
        case "RECEPTIONIST":
        case "MODERATOR":
        case "PATIENT":
        case "USER":
          navigate("/staff-dashboard");
          break;
        default:
          navigate("/");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      alert(
        err?.data?.message || err?.error || "Login failed. Check credentials.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      <div className="max-w-5xl w-full flex overflow-hidden">
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src={loginphoto}
            alt="illustration"
            className="h-full w-full object-cover rounded-l-xl"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-transparent">
          <h2 className="text-center text-3xl md:text-4xl font-sans font-semibold tracking-wide mb-4 text-black">
            LOGIN
          </h2>

          <p className="text-start text-base md:text-lg  mb-6">
            Access to PRIMEPOS Services
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-black mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black focus:ring-2 focus:ring-[#FFB004] outline-none"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-black mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 pr-12 rounded-xl bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-[#FFB004] outline-none"
                  required
                />
                {password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-400 hover:text-black"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </button>
                )}
              </div>
            </div>

            <Link to="/admin-dashboard">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 text-center font-semibold text-black px-7 rounded-xl bg-gradient-to-b from-[#FFB004] to-[#F3DA7F] shadow-md transition-all duration-300 ease-out  hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:shadow-md focus:outline-none cursor-pointer disabled:opacity-70"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </Link>
          </form>

          {/* <p className="text-sm text-[#01D449]  mt-4 text-center cursor-pointer">
            Forget Password
          </p> */}

          {/* <p className="text-sm text-gray-400 mt-4 text-center">
            Don’t have an account?
            <Link
              to="/signup"
              className="text-blue-400 cursor-pointer hover:text-sky-300 ml-1"
            >
              Register
            </Link>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
