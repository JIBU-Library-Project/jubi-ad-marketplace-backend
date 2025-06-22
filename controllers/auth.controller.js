const bcrypt = require("bcryptjs");
const User = require("../model/user.model");
const { signToken } = require("../utils/jwt.util");

const signUp = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      role = "user",
      companyName,
      phone,
      location,
      number,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      role,
      email,
      password: hashedPassword,
      ...(role === "user"
        ? { firstName, lastName, userName }
        : { companyName, phone, location, number }),
    });

    await newUser.save();
    return res.success("user", newUser, 201);
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const userObj = user.toObject();
    const { password: userPassword, ...userWithoutPassword } = userObj;
    const token = signToken(userWithoutPassword);
    return res.success("user", {
      details: userWithoutPassword,
      token,
    });
  } catch (error) {
    next(error);
  }
};

const protectedRoute = (req, res, next) => {
  try {
    res.send("This is a protected route");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  signIn,
  protectedRoute,
};
