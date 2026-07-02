import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import boardRouter from "./routes/board.js";

const PORT = 3000;
const app = express();

app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/user", authRouter);
app.use("/api/boards", boardRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
