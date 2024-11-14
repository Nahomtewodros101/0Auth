import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // ensure emails are unique
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true, // username must be unique
  },
  googleId: { type: String, unique: true, sparse: true },
});

// Use a single `pre` save hook to handle both username and password hashing
userSchema.pre("save", async function (next) {
  // Set the username to be the part of the email before '@'
  if (this.isNew) {
    this.username = this.email.split("@")[0];
  }

  // Hash the password if it's being modified or it's a new user
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10); // Use async salt generation
    this.password = await bcrypt.hash(this.password, salt);
  }

  next();
});

// Validate password method to compare hash
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
