import { Router } from "express";

const router = Router();

router.post("/logout", (req, res) => {
    res.clearCookie("user");

    res.clearCookie("user", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: ".lucrumproject.com",
    });
  
    return res.json({ message: "Logged out successfully" });
});

export default router