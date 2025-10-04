import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [50, "Name must be less than 50 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    trim:true,
    lowercase:true,
    match:[/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Please provide a valid email'] // regular experession for input 
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"],
  },
   role: {
    type: String,
    enum: ["user", "admin"], // restrict roles
    default: "user",         // default role is 'user'
  },
},   {timestamps:true});//created at aor updated at 

const User = mongoose.model("User", userSchema);

export default User;

