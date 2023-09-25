import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const saltRounds = 10;

export const userRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // Check if user already exists
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Create a new user
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      role: "user",
      password: hashedPassword,
    },
  });

  res.status(201).json({ user: newUser });
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await prisma.user.findFirst({
    where: { email },
  });

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create and send a JWT token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

export const testUsers = async (req: Request, res: Response) => {
  res.send("test user controller");
};
