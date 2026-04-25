import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pools from "./config/db.js";
import router from "./routes/routes.js";
import authRouter from "./routes/auth.js";
import loginAuthRouter from "./routes/userLogin.js"
import errorHandling from "./middleware/errorHandler.js"

dotenv.config();

const app = express();
const port = process.env.PORT;


app.use(express.json());
app.use(cors());
// middlewares error
app.use(errorHandling);
// Route
app.use("/api", router);
app.use("/signup", authRouter);
app.use("/auth", loginAuthRouter);

// run server
app.listen(port, () => {
  console.log(`server starts : ${port}`);
});
