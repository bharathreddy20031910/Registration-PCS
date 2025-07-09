
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const EmployeeModel = require("./Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/registration", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post('/registration', async (req, res) => {
  const { email, phone } = req.body;

  try {
    const existing = await EmployeeModel.findOne({ $or: [{ email }, { phone }] });

    if (existing) {
      if (existing.email === email) {
        return res.status(400).json({ error: "Email already exists" });
      }
      if (existing.phone === phone) {
        return res.status(400).json({ error: "Phone number already exists" });
      }
    }

    const newUser = await EmployeeModel.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/admin', async (req, res) => {
  try {
    const allUsers = await EmployeeModel.find({});
    res.send({ status: "ok", data: allUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/registration', async (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'Date is required' });

  try {
    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const registrations = await EmployeeModel.find({
      createdAt: { $gte: start, $lt: end }
    });

    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
