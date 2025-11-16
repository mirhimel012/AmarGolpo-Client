import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Register = () => {
  const { createUser, updateUserProfile, setUser } = useAuth(); // Make sure setUser exists in your context
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password, image, fullName } = data;

    // Clear previous toast
    setToast({ type: "", message: "" });

    // Password validation
    if (password.length < 6) return setToast({ type: "error", message: "Password must be at least 6 characters" });
    if (!/[A-Z]/.test(password)) return setToast({ type: "error", message: "Password must contain at least one uppercase letter" });
    if (!/[a-z]/.test(password)) return setToast({ type: "error", message: "Password must contain at least one lowercase letter" });

    // Create user
    createUser(email, password)
      .then((userCredential) => {
        return updateUserProfile(fullName, image).then(() => {
          // Update user context immediately
          if (setUser) {
            setUser({
              email,
              displayName: fullName,
              photoURL: image,
            });
          }
          setToast({ type: "success", message: "Registration successful!" });
          setTimeout(() => {
            setToast({ type: "", message: "" });
            navigate("/"); // Navigate after short delay
          }, 1500);
        });
      })
      .catch((error) => {
        console.error(error);
        setToast({ type: "error", message: "Registration failed. Please try again." });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-white to-purple-100 animate-fadeIn">
      <div className="flex w-full max-w-4xl overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-200 transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl relative">
        {/* Left Image */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src="https://i.ibb.co/2g7Nxq3/books-2596809-1920.jpg"
            alt="Books"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form */}
        <div className="w-full px-8 py-10 lg:w-1/2 relative">
          <div className="flex justify-center mb-4">
            <img className="w-16" src="https://i.ibb.co/4dDWk3Q/books.png" alt="Logo" />
          </div>
          <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">Register Here!</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300 focus:scale-105 transform transition-all duration-200"
                {...register("fullName", { required: true })}
              />
              {errors.fullName && <span className="text-red-500 text-sm mt-1">This field is required</span>}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300 focus:scale-105 transform transition-all duration-200"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-red-500 text-sm mt-1">This field is required</span>}
            </div>

            {/* Image URL */}
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                placeholder="Profile Image URL"
                className="input input-bordered rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300 focus:scale-105 transform transition-all duration-200"
                {...register("image")}
              />
            </div>

            {/* Password */}
            <div className="relative flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Password</label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="input input-bordered rounded-xl border-gray-300 focus:ring-2 focus:ring-purple-300 pr-12 w-full"
                  {...register("password", { required: true })}
                />
                <span
                  className="absolute right-3 flex items-center h-full cursor-pointer text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <span className="text-red-500 text-sm mt-1">This field is required</span>}
            </div>

            {/* Register Button */}
            <button className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
              Register
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 mt-2">
              Already have an account?{" "}
              <Link className="text-purple-600 font-bold hover:underline" to="/login">
                Login
              </Link>
            </p>
          </form>

          {/* Toast Messages */}
          {toast.message && (
            <div
              className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-3xl text-white p-3 px-6 font-semibold animate-fadeIn ${
                toast.type === "error" ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {toast.message}
            </div>
          )}
        </div>
      </div>

      {/* Fade-in Animation */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Register;
