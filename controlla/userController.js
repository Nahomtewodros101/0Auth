import { OAuth2Client } from "google-auth-library";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // Ensure correct environment variable
const client = new OAuth2Client(CLIENT_ID);

// Function to generate JWT token
const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Getting all users
export const GetAllusers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users.length) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

// Creating and registering a new user
export const postusers = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    // Ensure all fields are provided
    if (!name || !email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists by email
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Check if the username already exists
    const usernameExist = await User.findOne({ username: username });
    if (usernameExist) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // If the user doesn't exist, create a new user
    const user = new User({ name, email, password, username });

    // Save the new user to the database
    await user.save();

    // Generate JWT token after user creation
    const token = generateToken(user._id, user.email);

    // Send the created user and JWT token in the response
    res
      .status(201)
      .json({ message: "User registered successfully", user, token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Initialize the OAuth client with the Google OAuth client ID and log the user in
export const loginUsers = async (req, res) => {
  const { email, password, googleToken } = req.body;

  // If Google token is provided, use OAuth to log in
  if (googleToken) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });

      const payload = ticket.getPayload();
      const { sub, email: googleEmail, name } = payload;

      let user = await User.findOne({ email: googleEmail });

      if (!user) {
        user = new User({
          name,
          email: googleEmail,
          googleId: sub, // Store Google ID for reference
        });
        await user.save();
      }

      const token = generateToken(user._id, user.email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour expiration time
      });

      res.json({
        message: "Login successful with Google",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });
    } catch (error) {
      console.error("Google login error: ", error);
      res.status(400).json({ message: "Invalid Google token" });
    }
  } else {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user._id, user.email);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour expiration time
      });

      res.json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          username: user.username,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in" });
    }
  }
};

export const logoutUser = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // Retrieve the userId from request parameters
    const { userId } = req.params;

    // Delete the user from the database
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Logout successful and user deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging out" });
  }
};
