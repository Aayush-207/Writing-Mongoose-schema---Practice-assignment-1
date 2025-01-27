// Import Mongoose
const mongoose = require("mongoose");

// Define the User Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: [String], // Array of strings
      default: ["user"],
    },
    profile: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      age: {
        type: Number,
        min: 0, // Optional validation for age
      },
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the User Model
const User = mongoose.model("User", userSchema);

// Export the User Model
module.exports = User;