import express from "express";
import bcrypt from "bcryptjs";
import {prisma} from "../prismaClient.js";

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
    return res.status(201).json({
      message: "User created!",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default authRouter;
