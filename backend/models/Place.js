const mongoose = require("mongoose");
const geocoder = require("../utils/geocoder");

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },

  category: {
    type: String,
    required: [true, "Please add a place type"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },

  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating must can not be more than 5"],
  },

  photo: {
    type: String,
    default: "no-photo.jpg",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// Geocode & create location field
PlaceSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].countryCode,
  };

  // // Do not save address in DB
  // this.address = undefined;
  next();
});
module.exports = mongoose.model("Place", PlaceSchema);
