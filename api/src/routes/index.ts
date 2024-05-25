import express from "express";
import authRoutes from "./auth.routes";


const router = express.Router();

router.use("/users", authRoutes);

router.get("*", function (req, res) {
	res.status(404).json({ error: "Page not found" });
});

export default router;
