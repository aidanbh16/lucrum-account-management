import { Router } from "express";
import { pool } from "../db/client";
import { hashPassword } from "../utils/bcrypt";

const router = Router();

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!password || !/[A-Z]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one capital letter" });
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return res.status(400).json({ error: "Password must contain at least one special character" });
  }

  try {
    const validUsername = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if(validUsername.rowCount !== 0) return res.status(409).json({error: "Username already exists"})

    const validEmail = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if(validEmail.rowCount !== 0) return res.status(409).json({error: "Email already in use"})

    const hashedPassword = await hashPassword(password);

    const result = await pool.query(
      `INSERT INTO users (username, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, username, email`,
      [username, email, hashedPassword]
    );

    return res.json({
      message: "User created",
      user: result.rows[0],
    });

  } catch (err: any) {
    return res.status(400).json({
      error: err.message,
    });
  }
});

export default router;