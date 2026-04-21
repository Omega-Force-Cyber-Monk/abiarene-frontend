// src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import loginphoto from "@/assets/photo/signup.svg";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/redux-hook";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { user } = useAppSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      redirectBasedOnRole(user.role);
    }
  }, [user]);

  const redirectBasedOnRole = (role: string) => {
    const roleRoutes: Record<string, string> = {
      ADMIN: "/admin-dashboard",
      MANAGER: "/manager-dashboard",
      SERVER: "/server-dashboard",
      KITCHEN: "/kitchen-dashboard",
      CASHIER: "/cashier-dashboard",
    };
    navigate(roleRoutes[role] || "/dashboard");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    try {
      const result = await login({ email, password }).unwrap();

      dispatch(
        setUser({
          user: {
            id: result.admin.id,
            email: result.admin.email,
            name: result.admin.name,
            role: "ADMIN",
            status: result.admin.status,
            createdAt: result.admin.createdAt,
          },
          token: result.accessToken,
        }),
      );

      // Redirect after successful login
      redirectBasedOnRole("ADMIN");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(
        err?.data?.message ||
          err?.error ||
          "Login failed. Please check your credentials.",
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

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white">
          <h2 className="text-center text-3xl md:text-4xl font-sans font-semibold tracking-wide mb-4 text-gray-800">
            LOGIN
          </h2>

          <p className="text-start text-base md:text-lg mb-6 text-gray-600">
            Access to PRIMEPOS Services
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 mb-2 font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:ring-2 focus:ring-[#FFB004] focus:border-transparent outline-none transition-all"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-700 mb-2 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 pr-12 rounded-xl bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#FFB004] focus:border-transparent outline-none transition-all"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={22} />
                  ) : (
                    <AiOutlineEye size={22} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 text-center font-semibold text-gray-800 px-7 rounded-xl bg-gradient-to-b from-[#FFB004] to-[#F3DA7F] shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:shadow-md focus:outline-none cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import loginphoto from "@/assets/photo/signup.svg";
// import { setUser } from "@/redux/features/auth/authSlice";
// import { useAppDispatch } from "@/redux/hooks/redux-hook";

// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import { LoginResponse } from "@/redux/features/auth/auth.type";
// // import { Link } from "react-router-dom";

// const Login: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();
//   const dispatch = useAppDispatch();
//   const [login, { isLoading }] = useLoginMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const result: LoginResponse = await login({ email, password }).unwrap();

//       dispatch(
//         setUser({
//           user: {
//             id: result.user.id,
//             email: result.user.email,
//             name: `${result.user.firstName} ${result.user.lastName}`,
//             role: result.user.role,
//           },
//           token: result.accessToken,
//         }),
//       );

//       // Role-based redirect
//       switch (result.user.role) {
//         case "ADMIN":
//           navigate("/admin-dashboard");
//           break;
//         case "DOCTOR":
//         case "NURSE":
//         case "LAB_TECHNICIAN":
//         case "RECEPTIONIST":
//         case "MODERATOR":
//         case "PATIENT":
//         case "USER":
//           navigate("/staff-dashboard");
//           break;
//         default:
//           navigate("/");
//       }
//     } catch (err: any) {
//       console.error("Login failed:", err);
//       alert(
//         err?.data?.message || err?.error || "Login failed. Check credentials.",
//       );
//     }
//   };

//   return (
// <div className="min-h-screen flex items-center justify-center text-black">
//   <div className="max-w-5xl w-full flex overflow-hidden">
// <div className="hidden md:flex w-1/2 items-center justify-center">
//   <img
//     src={loginphoto}
//     alt="illustration"
//     className="h-full w-full object-cover rounded-l-xl"
//   />
// </div>

//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-transparent">
//           <h2 className="text-center text-3xl md:text-4xl font-sans font-semibold tracking-wide mb-4 text-black">
//             LOGIN
//           </h2>

//           <p className="text-start text-base md:text-lg  mb-6">
//             Access to PRIMEPOS Services
//           </p>

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div className="flex flex-col">
//               <label htmlFor="email" className="text-black mb-2">
//                 Email
//               </label>
//               <input
//                 id="email"
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-black focus:ring-2 focus:ring-[#FFB004] outline-none"
//                 required
//               />
//             </div>

//             <div className="flex flex-col">
//               <label htmlFor="password" className="text-black mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 border border-gray-300 pr-12 rounded-xl bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-[#FFB004] outline-none"
//                   required
//                 />
//                 {password && (
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((s) => !s)}
//                     className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-gray-400 hover:text-black"
//                     aria-label={
//                       showPassword ? "Hide password" : "Show password"
//                     }
//                   >
//                     {showPassword ? (
//                       <AiOutlineEyeInvisible size={22} />
//                     ) : (
//                       <AiOutlineEye size={22} />
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-3 text-center font-semibold text-black px-7 rounded-xl bg-gradient-to-b from-[#FFB004] to-[#F3DA7F] shadow-md transition-all duration-300 ease-out  hover:-translate-y-0.5 hover:shadow-xl hover:brightness-110 active:translate-y-0 active:shadow-md focus:outline-none cursor-pointer disabled:opacity-70"
//             >
//               {isLoading ? "Logging in..." : "Login"}
//             </button>
//           </form>

//           {/* <p className="text-sm text-[#01D449]  mt-4 text-center cursor-pointer">
//             Forget Password
//           </p> */}

//           {/* <p className="text-sm text-gray-400 mt-4 text-center">
//             Don’t have an account?
//             <Link
//               to="/signup"
//               className="text-blue-400 cursor-pointer hover:text-sky-300 ml-1"
//             >
//               Register
//             </Link>
//           </p> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
