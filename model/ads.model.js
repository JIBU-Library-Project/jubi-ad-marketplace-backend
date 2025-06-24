const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  location: String,
  images: [mongoose.Schema.Types.Mixed],

  // Embedded vendor details
  vendorDetails: {
    id: { type: String, required: true },
    companyName: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true },
  },

  category: {
    type: String,
    enum: ["electronics", "fashion", "real-estate", "food"],
    required: true,
  },

  metadata: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
});

const imageModel = new mongoose.Schema({
  id: String,
  imageUrl: String,
});

// Metadata validation middleware
adSchema.pre("validate", function (next) {
  const meta = this.metadata;
  switch (this.category) {
    case "electronics":
      if (
        !meta.brand ||
        !meta.model ||
        !meta.storage ||
        !meta.condition ||
        !meta.warranty
      ) {
        return next(new Error("Missing fields in electronics metadata"));
      }
      break;
    case "fashion":
      if (
        !meta.brand ||
        !meta.size ||
        !meta.material ||
        !meta.gender ||
        !meta.color
      ) {
        return next(new Error("Missing fields in fashion metadata"));
      }
      break;
    case "real-estate":
      if (
        !meta.rooms ||
        !meta.bathrooms ||
        !meta.furnished ||
        !meta.paymentTerm ||
        !meta.hasParking
      ) {
        return next(new Error("Missing fields in real estate metadata"));
      }
      break;
    case "food":
      if (
        !meta.type ||
        !meta.quantity ||
        !meta.expiry ||
        !meta.origin ||
        !packaged
      ) {
        return next(new Error("Missing fields in food metadata"));
      }
      break;
    default:
      return next(new Error("Unknown category"));
  }
  next();
});

module.exports = mongoose.model("Ad", adSchema);
