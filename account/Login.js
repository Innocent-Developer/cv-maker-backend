const AccountCreate = require("../Schema/accountcreate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config(); // Make sure this is at the top

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
  const { Email, password } = req.body;

  if (!Email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const account = await AccountCreate.findOne({ Email: Email.toLowerCase() }).select("+password");

    if (!account) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    if (!JWT_SECRET) {
      return res.status(500).json({ error: "JWT_SECRET is not defined in environment." });
    }

    const token = jwt.sign({ id: account._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful.", token, accountId: account._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;
