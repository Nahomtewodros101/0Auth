import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5500/api/users/register",
        formData
      );

      if (response.status === 200) {
        toast.success("Registration successful!");

        setTimeout(() => {
          navigate("/homepage");
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "Registration failed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white via-gray-100 to-blue-100">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-black focus:border-white focus:ring-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-white focus:border-black-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-white focus:border-black-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full hover:bg-gray-500 hover:text-white font-bold py-2 rounded-md transition-colors"
          >
            Register
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/login" className="text-black hover:underline">
            Already have an account? Login here
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="text-black hover:underline">
            Change your mind ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
