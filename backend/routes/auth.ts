import express from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prismaClient.js";
import { createToken, validateToken } from "../services/authn.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  //email, password
  try {
    const { email, password } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = createToken({
      id: newUser.id,
      name: newUser.name || "",
      email: newUser.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.status(201).json({
      message: "User created!",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const stored = await prisma.user.findUnique({
      where: { email },
    });
    if (!stored) {
      return res.status(400).json({ message: "User does not exists!" });
    }
    const isMatch = await bcrypt.compare(password, stored.password);
    if (isMatch) {
      const token = createToken({
        id: stored.id,
        name: stored.name || "",
        email: stored.email,
      });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        message: "Signed in successfully",
        user: { id: stored.id, email: stored.email, name: stored.name },
      });
    }
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default authRouter;
