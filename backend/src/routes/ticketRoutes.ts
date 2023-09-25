import express from "express";
import * as ticketControllers from "../controllers/ticketControllers";

const router = express.Router();

router.post("/create", ticketControllers.createTicket);
router.get("/", ticketControllers.getAllTickets);
router.put("/:ticketId", ticketControllers.updateTicket);

const ticketRoutes = router;

export default ticketRoutes;
