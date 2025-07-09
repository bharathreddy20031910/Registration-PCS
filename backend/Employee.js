
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  qualification: String,
  passoutYear: String,
  dateTime: String,
}, { timestamps: true });

const EmployeeModel = mongoose.model("employees", EmployeeSchema);
module.exports = EmployeeModel;
