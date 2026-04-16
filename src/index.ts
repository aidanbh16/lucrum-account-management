import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env";

import signupRoute from "./routes/signup.route";
import loginRoute from "./routes/login.route";
import logoutRoute from "./routes/logout.route";
import userRoute from "./routes/user.route"

const app = express();

const allowedOrigins = process.env.ALLOWED_FRONTEND_ORIGINS?.split(",") || [];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", signupRoute);
app.use("/auth", loginRoute);
app.use("/auth", logoutRoute);
app.use("/auth", userRoute);

app.get("/", (req, res) => {
  res.send("Lucrum Account Management System is running");
});

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});