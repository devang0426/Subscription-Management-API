import mongoose from "mongoose";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; 
import {JWT_SECRET, JWT_EXPIRES_IN }from"../config/env.js";

//http://localhost:5500/api/v1/auth/sign-in
export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 422;
      throw error;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user in transaction
    const newUser = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser[0]._id }, // Payload
      JWT_SECRET,     // Secret key
      { expiresIn:JWT_EXPIRES_IN } // Expiry
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: newUser[0]._id,
        name: newUser[0].name,
        email: newUser[0].email,
        password: newUser[0].password,
        createdAT: newUser[0].createdAt,
        updatedAt: newUser[0].updatedAt,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signin = async (req, res, next) => {
    try {
        const{email, password} =req.body;

        const user = await User.findOne({email});
        if(!user){
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            const error = new Error("Invalid password");
            error.statusCode = 401;
            throw error;
        }
        //if it is invalid the above 
        //if it is valid the below
        const token = jwt.sign(
            {userId: user._id},
            JWT_SECRET,
            {expiresIn:JWT_EXPIRES_IN}
        );
        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user,})

    } catch (error) {
        next(error);
    }
};



export const signout = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};