const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: [true, "Company name is required"] },
  industry: { type: String, required: [true, "Industry is required"] },
  description: { type: String },

  address: { type: String, required: [true, "Address is required"] },
  city: { type: String, required: [true, "City is required"] },
  state: { type: String, required: [true, "State is required"] },
  country: { type: String, required: [true, "Country is required"] },
  pincode: { type: String, required: [true, "Pincode is required"] },

  foundedYear: {
    type: Number,
    required: [true, "Founded year is required"],
    min: [1800, "Founded year must be after 1800"]
  },

  employeeCount: {
    type: Number,
    required: [true, "Employee count is required"],
    min: [1, "Employee count must be at least 1"]
  },

  type: {
    type: String,
    enum: ["Startup", "MNC", "SME", "Other"],
    required: [true, "Company type is required"]
  },

  website: { type: String, required: [true, "Website is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
  },
  phone: { type: String, required: [true, "Phone number is required"] },

  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("Company", companySchema);