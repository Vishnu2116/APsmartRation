import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "test_secret";

const validUser = {
  username: "admin",
  password: "1234",
};

export const loginUser = (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", username, password); // ✅ Debug

  if (username === validUser.username && password === validUser.password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token, username });
  } else {
    return res.status(401).json({ error: "Invalid credentials" });
  }
};
