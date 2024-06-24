import { Router } from "express";
import { addUser, getUser } from "../controllers/users.controller";
const router = Router();
router.post("/add", addUser);
router.get("/get", getUser);
export default router;
