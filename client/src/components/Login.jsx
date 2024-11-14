import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5500/api/users/login",
        {
          email,
          password,
        }
      );
      console.log(response.data); // Handle response data as needed
      navigate("/"); // Redirect to home after successful login
      toast.success("Login successful!");
    } catch (err) {
      toast.error(
        "Login failed: " + err.response?.data?.message || "Unknown error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center rounded-3xl shadow-black shadow-lg h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <Link
            to="/register"
            className="text-gray-500 font-bold hover:underline"
          >
            Register <FontAwesomeIcon icon="fa-solid fa-plus" />
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
