const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Normal user
  firstName: { type: String },
  lastName: { type: String },
  userName: { type: String },

  // Common fields
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "vendor"],
    required: true,
    default: "user",
  },

  // Vendor
  companyName: { type: String },
  phone: { type: String },
  location: { type: String },
  number: { type: String },
});

// Conditional validation
userSchema.pre("validate", function (next) {
  if (this.role === "vendor") {
    if (!this.companyName)
      this.invalidate("companyName", "Required for vendors");
    if (!this.phone) this.invalidate("phone", "Required for vendors");
    if (!this.location) this.invalidate("location", "Required for vendors");
    if (!this.number) this.invalidate("number", "Required for vendors");
  } else {
    if (!this.firstName) this.invalidate("firstName", "Required for users");
    if (!this.lastName) this.invalidate("lastName", "Required for users");
    if (!this.userName) this.invalidate("userName", "Required for users");
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
