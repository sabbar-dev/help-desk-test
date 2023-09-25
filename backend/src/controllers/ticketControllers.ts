import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.ticket.findMany();
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error retrieving tickets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  const { name, email, description } = req.body;
  try {
    // Create a new ticket
    const newTicket = await prisma.ticket.create({
      data: {
        description,
        name,
        email,
        status: "new",
      },
    });

    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  const ticketId = req.params.ticketId;
  const { newStatus } = req.body;

  try {
    // Find the ticket by ID
    const ticket = await prisma.ticket.findUnique({
      where: { id: parseInt(ticketId) }, // Assuming the ticket ID is an integer
    });

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update the ticket status
    const updatedTicket = await prisma.ticket.update({
      where: { id: parseInt(ticketId) },
      data: { status: newStatus },
    });

    res.status(200).json(updatedTicket);
  } catch (error) {
    console.error("Error updating ticket status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
