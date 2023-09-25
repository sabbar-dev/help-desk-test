import express from "express";
import * as userControllers from "../controllers/userControllers";

const router = express.Router();

router.post("/user-signup", userControllers.userRegister);
router.post("/user-login", userControllers.userLogin);

const userRoutes = router;

export default userRoutes;
