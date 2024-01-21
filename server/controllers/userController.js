import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { sendMail } from "../utils/oAuth.js";

//Sign in logic if user already exist
export const signin = async (req, res) => {
  const { email, password, googleId } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User Does not exist" });
    } else {
      //Check the finded user is actually have verified account or not
      if (existingUser.isVerified) {
        if (!googleId) {
          const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
          );
          if (!isPasswordCorrect) {
            return res.status(404).json({ message: "Invalid Credentials." });
          }
        }
        const token = jwt.sign(
          { email: existingUser.email, id: existingUser._id },
          "test",
          { expiresIn: "1h" }
        );
        return res.status(200).json({ result: existingUser, token });
      } else {
        //If user is not verified in database
        const verificationToken = jwt.sign(
          { email },
          "verification_secret_key",
          {
            expiresIn: "1h",
          }
        );
        const verification = {
          email,
          verificationLink: `${process.env.LIVE_URL}/user/verification?email=${email}&token=${verificationToken}`,
          message: "Please verify your email",
        };
        //Send email for email verification
        await sendMail(verification);
        return res.status(401).json({
          status: "failed",
          message:
            "Your Verification is incomplete! check your mail for verification link.",
        });
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
    const existingUser = await User.findOne({ email });
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
        isVerified: false,
      });
      //Create email verification token
      const verificationToken = jwt.sign({ email }, "verification_secret_key", {
        expiresIn: "1h",
      });
      const verification = {
        email,
        verificationLink: `http://localhost:${process.env.PORT}/user/verification?email=${email}&token=${verificationToken}`,
        message: "Please verify your email",
      };
      //Send email for email verification
      await sendMail(verification);
      return res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: "Somthing went wrong!" });
  }
};

//Verification of the User
export const userVerification = async (req, res, next) => {
  const { email, token } = req.query;
  try {
    if (email && token) {
      //verify the token
      const decoded = jwt.verify(token, "verification_secret_key");
      const existingUser = await User.findOne({ email: decoded?.email });
      if (existingUser) {
        await User.updateOne({ email: decoded?.email }, { isVerified: true });
        //For success
        await sendMail({
          email: decoded?.email,
          message: "Congratulations, Verification Completed!",
        });
        return res.status(200).send("Successfully verified!");
      }
      return res.status(400).send("User not found!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
