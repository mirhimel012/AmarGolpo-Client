import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { signInUser, googleLogin, setUser } = useAuth(); // Make sure setUser exists in your context
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({ type: "", message: "" });

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // Email/password login
  const onSubmit = (data) => {
    const { email, password } = data;
    setToast({ type: "", message: "" });

    signInUser(email, password)
      .then(result => {
        if (result.user) {
          // Update user context immediately
          if (setUser) {
            setUser({
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
            });
          }
          setToast({ type: "success", message: "Login successful!" });
          setTimeout(() => {
            setToast({ type: "", message: "" });
            navigate(from);
          }, 1200);
        }
      })
      .catch(error => {
        console.error(error);
        setToast({ type: "error", message: "Login failed. Check email/password." });
      });
  };

  // Social login (Google)
  const handleSocialLogin = (socialProvider) => {
    setToast({ type: "", message: "" });
    socialProvider()
      .then(result => {
        if (result.user) {
          if (setUser) {
            setUser({
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
            });
          }
          navigate(from);
        }
      })
      .catch(error => {
        console.error(error);
        setToast({ type: "error", message: "Social login failed. Try again." });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-white to-green-100 p-5">
      <div className="flex w-full max-w-4xl overflow-hidden bg-white rounded-xl shadow-xl relative">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 relative">
          <div className="flex justify-center mb-6">
            <img className="w-14" src="https://i.ibb.co/4dDWk3Q/books.png" alt="Logo" />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome Back!</h2>
          <p className="text-center text-gray-500 mb-6">Sign in to continue to your account</p>

          {/* Google Login */}
          <button 
            onClick={() => handleSocialLogin(googleLogin)} 
            className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 mb-6 text-gray-700 hover:bg-gray-100 transition"
          >
            <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-6 h-6 mr-3"/>
            <span className="font-semibold">Sign in with Google</span>
          </button>

          <div className="flex items-center justify-between mb-6">
            <span className="border-b w-1/4 border-gray-300"></span>
            <span className="text-gray-400 uppercase text-sm">or login with email</span>
            <span className="border-b w-1/4 border-gray-300"></span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none" 
                {...register("email", { required: true })} 
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">This field is required</p>}
            </div>

            <div className="relative">
              <label className="block text-gray-700 mb-1">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password" 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-400 focus:outline-none" 
                {...register("password", { required: true })} 
              />
              <span 
                className="absolute top-9 right-3 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1">This field is required</p>}
              <Link to="#" className="text-sm text-cyan-500 hover:underline float-right mt-1">Forgot password?</Link>
            </div>

            <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 rounded-lg transition">Login</button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            New here? <Link to="/register" className="text-cyan-500 font-semibold hover:underline">Register</Link>
          </p>

          {/* Toast Message */}
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

        {/* Image Section */}
        <div className="hidden lg:block lg:w-1/2">
          <img src="https://i.ibb.co/DWDY1v8/reading-8575569-1280.jpg" alt="Login Visual" className="h-full w-full object-cover"/>
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

export default Login;
