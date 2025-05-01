const express = require("express");
const cors = require("cors"); // ✅ Add this
const dotenv = require("dotenv");
const routers = require("./routes/routes");
const connectDB = require("./database/connectdb");

dotenv.config();

const app = express();

// ✅ Use CORS middleware
app.use(cors({
  origin: "*", // Frontend origin
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use("/", routers);

app.get("/", (req, res) => {
  res.send(`Backend is running on port ${process.env.PORT || 5000}`);
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
