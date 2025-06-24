const Ads = require("../model/ads.model");
const mongoose = require("mongoose");
const uploadFile = require("../utils/cloudinary.util");

const getAllAds = async (req, res, next) => {
  const { title, description, price, location, category } = req.query;

  try {
    const filter = {};

    if (title) filter.title = { $regex: title, $options: "i" };
    if (description)
      filter.description = { $regex: description, $options: "i" };
    if (price) filter.price = price;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (category) filter.category = category;

    // If no query params, return all ads
    const adverts =
      Object.keys(filter).length === 0
        ? await Ads.find()
        : await Ads.find(filter);

    return res.success("ads", adverts, 200);
  } catch (error) {
    next(error);
  }
};

// getting ads by id
const getAdsById = async (req, res, next) => {
  const id = req.params.id;
  const isIdValid = mongoose.Types.ObjectId.isValid(id);

  if (!isIdValid) {
    return res.status(400).json({ message: "Invalid ID format." });
  }
  try {
    const ad = await Ads.findById(id);
    if (!ad) {
      return res.status(404).json({
        message: `Ad with ID: ${id} is not found`,
      });
    }
    return res.success("ad", ad);
  } catch (error) {
    next(error);
  }
};

// posting an ad
const postAds = async (req, res, next) => {
  const {
    title,
    description,
    price,
    location,
    category,
    brand,
    model,
    storage,
    condition,
    warranty,
    size,
    material,
    gender,
    color,
    rooms,
    bathrooms,
    furnished,
    paymentTerm,
    hasParking,
    type,
    quantity,
    expiry,
    origin,
    packaged,
  } = req.body;
  const { _id, companyName, phone, location: userLocation, email } = req.user;
  const files = req.files;

  try {
    const uploadFiles = files.map((file) => {
      return uploadFile(file.path);
    });

    const response = await Promise.all(uploadFiles);
    const images = response.map((res) => res.secure_url);
    console.log(images);
    const newAd = await Ads.create({
      title,
      description,
      price,
      location,
      images,
      category,
      vendorDetails: {
        id: _id,
        companyName,
        phone,
        location: userLocation,
        email,
      },
      metadata: {
        ...(category === "electronics"
          ? { brand, model, storage, condition, warranty }
          : category === "fashion"
          ? { brand, size, material, gender, color }
          : category === "real-estate"
          ? { rooms, bathrooms, furnished, paymentTerm, hasParking }
          : { type, quantity, expiry, origin, packaged }),
      },
    });

    return res.success("ad", newAd, 201);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAds,
  getAdsById,
  postAds,
};
