import express from "express";
import * as userControllers from "../controllers/userControllers";

const router = express.Router();

router.post("/user-signup", userControllers.userRegister);
router.get("/test", userControllers.testUsers);

const userRoutes = router;

export default userRoutes;
