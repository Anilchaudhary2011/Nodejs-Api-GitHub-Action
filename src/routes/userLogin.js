import express from "express";

import pools from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginAuthRouter = express.Router();

loginAuthRouter.post("/userlogin", async (req, res) => {
  const { email, password } = req.body || {};
  try {
    const user = await pools.query(
      "SELECT * FROM login_user WHERE LOWER(email) = LOWER($1)",
      [email],
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default loginAuthRouter;
