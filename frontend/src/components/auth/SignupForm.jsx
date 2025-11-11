import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Phone, UserCircle } from "lucide-react";
import api from "../../axios";
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Phonenumber: "",
    role: "User",
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      setToast({ message: "Signup Successful! Redirecting to login...", type: "success" });
      
      // Navigate after showing toast
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Signup error:", error);
      const msg = error?.response?.data?.msg || "Signup failed. Please try again.";
      setToast({ message: msg, type: "error" });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Book Image */}
      <img
        src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1920&q=80"
        alt="Books Background"
        className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-105 opacity-90"
      />

      {/* Signup Container */}
      <div className="relative flex flex-col md:flex-row items-center justify-between backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden w-full max-w-5xl z-10 border border-white/40">
        {/* Signup Form with Scroll */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800 mt-30">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Full Name</label>
              <div className="flex items-center border-2 border-black rounded-lg p-2 bg-transparent focus-within:ring-2 focus-within:ring-green-400">
                <User className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full outline-none text-gray-700"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Email</label>
              <div className="flex items-center border-2 border-black rounded-lg p-2 bg-transparent focus-within:ring-2 focus-within:ring-green-400">
                <Mail className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full outline-none  text-gray-700"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Phone Number</label>
              <div className="flex items-center border-2 border-black rounded-lg p-2 bg-transparent focus-within:ring-2 focus-within:ring-green-400">
                <Phone className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="number"
                  name="Phonenumber"
                  value={formData.Phonenumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="w-full outline-none bg-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Password</label>
              <div className="flex items-center border-2 border-black rounded-lg p-2 bg-transparent focus-within:ring-2 focus-within:ring-green-400">
                <Lock className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
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

            {/* Role */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600">Role</label>
              <div className="flex items-center border-2 border-black rounded-lg p-2 bg-transparent">
                <UserCircle className="w-5 h-5 text-gray-400 mr-2" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full outline-none bg-transparent text-gray-700"
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <button onClick={() => navigate("/login")} className="text-green-600 hover:underline">Login</button>
          </p>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:flex md:w-1/2 relative h-[80vh] items-center justify-center group overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1000&q=80"
            alt="Books Side Image"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white text-center px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <h3 className="text-3xl font-bold mb-2">Join Our Library</h3>
            <p className="text-lg">Create your account and start exploring</p>
          </div>
        </div>
      </div>
      
      {/* Toast Notification */}
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
