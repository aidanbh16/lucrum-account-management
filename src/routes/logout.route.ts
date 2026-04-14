import { Router } from "express";

const router = Router();

router.post("/logout", (req, res) => {
    res.clearCookie("user");
  
    return res.json({ message: "Logged out successfully" });
});

export default router