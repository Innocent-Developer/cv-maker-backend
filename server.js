const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const routers = require("./routes/routes");
const connectDB = require("./database/connectdb");

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
