import express from "express";
import * as ticketControllers from "../controllers/ticketControllers";
import { requireAdminAuth } from "../../middlewares/authMiddleware";

const router = express.Router();

router.post("/create", ticketControllers.createTicket);
router.get("/", ticketControllers.getAllTickets);
router.put("/:ticketId", requireAdminAuth, ticketControllers.updateTicket);

const ticketRoutes = router;

export default ticketRoutes;
