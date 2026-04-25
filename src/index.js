import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pools from "./config/db.js";
import router from "./routes/routes.js";
import authRouter from "./routes/auth.js";
import loginAuthRouter from "./routes/userLogin.js";
import errorHandling from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/api", router);
app.use("/signup", authRouter);
app.use("/auth", loginAuthRouter);

// Error middleware (should be LAST)
app.use(errorHandling);

// ✅ Start server only if NOT testing
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server starts : ${port}`);
  });
}

// ✅ Export app for testing
export default app;