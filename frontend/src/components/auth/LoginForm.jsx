import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../axios";

export default function LoginForm({ onAuthSuccess, setCurrentPage }) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const res = await api.post('/auth/login', formData);
      console.log(res.data.user.role);
      
      if (typeof setCurrentPage === "function") setCurrentPage("home");
      if (typeof onAuthSuccess === "function") onAuthSuccess();

      if(res.data.user.role==='Admin') navigate("/admin");
      else
         navigate("/app");
    } catch (error) {
      console.error("Login error:", error);
      const msg = error?.response?.data?.msg || "Login failed. Please try again.";
      alert(msg);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1920&q=80"
        alt="Books Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 opacity-90"
      />

      {/* Login Container */}
      <div className="relative flex flex-col md:flex-row items-center justify-between bg-white/60 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl z-10 transition-transform hover:scale-105 duration-300 border border-white/40">
        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-400">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full outline-none bg-transparent text-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 focus-within:ring-2 focus-within:ring-blue-400">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full outline-none bg-transparent text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don’t have an account?<button onClick={() => navigate("/signup")} className="text-blue-600 hover:underline"> Sign up</button>
          </p>
        </div>

        <div className="hidden md:flex md:w-1/2 relative h-full items-center justify-center group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80"
            alt="Books Side Image"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-3xl font-bold mb-2">Welcome Back</h3>
            <p className="text-lg">Discover your next favorite read</p>
          </div>
        </div>
      </div>
    </div>
  );
}