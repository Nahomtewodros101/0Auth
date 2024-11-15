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
      console.log(response.data);
      navigate("/");
      toast.success("Login successful!");
    } catch (error) {
      console.log(error);
      toast.error("You dont have an account yet. Please register first.");
    }
  };

  return (
    <div className="flex items-center w-[40rem] flex-col justify-center rounded-3xl shadow-black shadow-lg h-screen bg-gradient-to-r from-white via-gray-100 to-grey-100">
      <h1 className="font-extrabold text-4xl">Join Our Community!</h1>
      <div className="max-w-md w-full bg-transparent p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4 ">
          <div>
            <label className="block text-gray-700 font-londrina">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-londrina">
              Password:
            </label>
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
            className="text-gray-500 font-bold hover:underline font-londrina"
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
