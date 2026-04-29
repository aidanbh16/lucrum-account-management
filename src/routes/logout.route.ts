import { Router } from "express";

const router = Router();

router.post("/logout", (req, res) => {
    res.clearCookie("user", { httpOnly: true, secure: true, sameSite: "none" });
  
    return res.json({ message: "Logged out successfully" });
});

export default router