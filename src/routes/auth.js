// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import pools from "../config/db.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await pools.query(
      "INSERT INTO login_user (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashedPassword],
    );

    res.json(user.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default authRouter;
