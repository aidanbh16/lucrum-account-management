import { Router } from "express";
import { env } from "../config/env";

const router = Router();

router.post("/logout", (req, res) => {
    res.clearCookie("user", { httpOnly: true, secure: true, sameSite: "none", domain: env.COOKIE_DOMAIN });
  
    return res.json({ message: "Logged out successfully" });
});

export default router