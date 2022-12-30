import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//Sign in logic if user already exist
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Does not exist" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        return res.status(404).json({ message: "Invalid Credentials." });
      } else {
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          "test ",
          { expiresIn: "1h" }
        );
        res.status(200).json({ result: existingUser, token });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

//Signup logic for new user
export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    } else if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password don't match." });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const result = await User.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });
      const token = await jwt.sign(
        { email: result.email, id: result._id },
        "test",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ result, token });
    }
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong!" });
  }
};