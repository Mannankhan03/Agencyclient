import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userschema from "../model/Usermodel.js";

// we can use this logic for both admin login as weell as user

const registerUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email ID" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters long",
      });
    }

    const existingUser = await userschema.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email is already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      userName,
      email,
      password: hashedPassword,
    };

    const newUser = new userschema(userData);
    const user = await newUser.save();

    const atoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      atoken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//api for login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign( {role : "admin"},process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid Credential" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser };
