import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const saltRounds = 10;

export const userRegister = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log("body====================", req.body);
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
  // Create and send a JWT token
  //   const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });
  res.status(201).json({ user: newUser });
};

export const testUsers = async (req: Request, res: Response) => {
  res.send("test user controller");
};
