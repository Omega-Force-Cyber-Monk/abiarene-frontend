// src/pages/Signup.tsx
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import signupphoto from "@/assets/photo/signup.svg";
import { useAppDispatch } from "@/redux/hooks/redux-hook";
import { useSignupMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setError(null);
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      const result = await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }).unwrap();

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

      // Redirect to admin dashboard after successful signup
      navigate("/admin-dashboard");
    } catch (err: any) {
      console.error("Signup failed:", err);
      setError(
        err?.data?.message || err?.error || "Signup failed. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-6xl w-full flex overflow-hidden bg-white rounded-2xl shadow-lg">
        {/* Left Side - Image */}
        <div className="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-br from-[#FFB004] to-[#F3DA7F]">
          <img
            src={signupphoto}
            alt="Signup illustration"
            className="h-full w-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-white">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans font-semibold mb-2 text-gray-800">
            CREATE YOUR ACCOUNT
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Sign up to get started and access your dashboard and features.
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="text-gray-700 font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#FFB004] focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-[#FFB004] focus:border-transparent outline-none transition-all"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#FFB004] focus:border-transparent outline-none transition-all"
                  disabled={isLoading}
                />
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
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

            {/* Confirm Password */}
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#FFB004] focus:border-transparent outline-none transition-all"
                  disabled={isLoading}
                />
                {formData.confirmPassword && (
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showConfirmPassword ? (
                      <AiOutlineEyeInvisible size={22} />
                    ) : (
                      <AiOutlineEye size={22} />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-b from-[#FFB004] to-[#F3DA7F] text-gray-800 font-semibold py-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
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
                  Creating account...
                </span>
              ) : (
                "Register"
              )}
            </button>
          </form>

          {/* Login Redirect */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#FFB004] hover:text-[#e5a000] font-medium transition-colors"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// import signupphoto from "@/assets/photo/signup.svg";
// import { useState } from "react";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Signup = () => {
//   const [password, setPassword] = useState("");
//   const [retypePassword, setRetypePassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showRetypePassword, setShowRetypePassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center  text-white">
//       <div className="max-w-5xl w-full   flex overflow-hidden">
//         {/* Left Side - Image */}
//         <div className="hidden md:flex w-1/2  items-center justify-center">
//           <img
//             src={signupphoto}
//             className="h-full w-full object-cover rounded-l-xl rounded-r-xl"
//           />
//         </div>

//         {/* Right Side - Form */}
//         <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-sans mb-2">
//             CREATE YOUR ACCOUNT
//           </h2>
//           <p className="text-gray-400 mb-6 text-sm">
//             Sign up to get started and access your dashboard and features.
//           </p>

//           <form className="space-y-4">
//             {/* Full Name */}

//             <div className="flex flex-col mb-4">
//               <label htmlFor="name" className="text-white font-sans mb-2">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-sky-300 outline-none"
//               />
//             </div>

//             {/* Phone */}

//             <div className="flex flex-col mb-4">
//               <label htmlFor="number" className="text-white font-sans mb-2">
//                 Phone Number
//               </label>

//               <div className="flex items-center space-x-2">
//                 <input
//                   type="tel"
//                   placeholder="Phone Number"
//                   className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-sky-300 outline-none"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div className="flex flex-col mb-4">
//               <label htmlFor="email" className="text-white font-sans mb-2">
//                 Email
//               </label>

//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="w-full px-4 py-3 rounded-[20px] bg-[#0F2B2E] text-white focus:ring-2 focus:ring-sky-300 outline-none"
//               />
//             </div>
//             {/* Password */}

//             <div className="flex flex-col mb-4">
//               <label htmlFor="password" className="text-white font-sans mb-2">
//                 Password
//               </label>

//               <div className="relative w-full">
//                 <input
//                   id="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 pr-12 rounded-[20px] bg-[#0F2B2E] text-white placeholder-gray-400
//                        focus:ring-2 focus:ring-sky-300 focus:border-sky-300 outline-none
//                        transition-all duration-300 shadow-sm hover:shadow-md"
//                 />

//                 {/* Show eye only if password is not empty */}
//                 {password && (
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-400
//                          hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
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

//             {/* Re-type Password */}
//             <div className="flex flex-col mb-4">
//               <label
//                 htmlFor="retypePassword"
//                 className="text-white font-sans mb-2"
//               >
//                 Re-type Password
//               </label>
//               <div className="relative w-full">
//                 <input
//                   id="retypePassword"
//                   type={showRetypePassword ? "text" : "password"}
//                   placeholder="Re-enter your password"
//                   value={retypePassword}
//                   onChange={(e) => setRetypePassword(e.target.value)}
//                   className="w-full px-4 py-3 pr-12 rounded-[20px] bg-[#0F2B2E] text-white placeholder-gray-400
//                        focus:ring-2 focus:ring-sky-300 focus:border-sky-300 outline-none
//                        transition-all duration-300 shadow-sm hover:shadow-md"
//                 />

//                 {/* Show eye only if retype password is not empty */}
//                 {retypePassword && (
//                   <button
//                     type="button"
//                     onClick={() => setShowRetypePassword(!showRetypePassword)}
//                     className="absolute inset-y-0 right-3 flex items-center text-gray-400
//                          hover:text-white transition-colors duration-200 focus:outline-none cursor-pointer"
//                     aria-label={
//                       showRetypePassword
//                         ? "Hide retype password"
//                         : "Show retype password"
//                     }
//                   >
//                     {showRetypePassword ? (
//                       <AiOutlineEyeInvisible size={22} />
//                     ) : (
//                       <AiOutlineEye size={22} />
//                     )}
//                   </button>
//                 )}
//               </div>
//             </div>
//             {/* Register Button */}
//             <button
//               type="submit"
//               className="w-full bg-[#346778] text-white hover:bg-[#114050] font-sans py-3 rounded-[20px] transition cursor-pointer"
//             >
//               Register
//             </button>
//           </form>

//           {/* Login Redirect */}
//           <p className="text-sm text-gray-400 mt-4 text-center">
//             Already have an account?
//             <a href="/login" className="text-blue-400 hover:text-sky-300 ml-1">
//               Log In
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;
