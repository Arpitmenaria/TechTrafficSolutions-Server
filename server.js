// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Add this line to handle root URL
app.get("/", (req, res) => {
  res.send("Tech Traffic Solutions backend is running 🚀");
});

app.use('/api', require('./routes/inquiryRoutes'));
app.use('/api', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
