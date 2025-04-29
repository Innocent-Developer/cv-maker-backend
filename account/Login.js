const AccountCreate = require("../Schema/accountcreate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { Email, password } = req.body;

  // Check if email and password are provided
  if (!Email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Normalize email to lowercase before searching (for case-insensitive matching)
    const account = await AccountCreate.findOne({ Email: Email.toLowerCase() }).select("+password");

    if (!account) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: account._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful.", token , accountId: account._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = login;
