import { Router } from "express";
import { env } from "../config/env";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/user", (req, res) => {
    const token = req.cookies.user;

    if (!token) {
        return res.status(401).json({ user: null });
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET!);
        return res.json({ user: decoded });
    } catch {
        return res.status(401).json({ user: null });
    }
});

export default router