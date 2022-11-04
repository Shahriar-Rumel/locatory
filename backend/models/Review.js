const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a title for the review"],
    maxlength: 100,
  },
  description: {
    type: String,
    required: [true, "Please add some description"],
  },
  averagebudget: {
    type: Number,
    required: [true, "Please add a budget"],
  },

  accessibility: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  decoration: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  service: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  familyfriendly: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  transportation: {
    type: String,
    required: [true, "Please add a transportation medium"],
    enum: ["bus", "car", "rickshaw", "walk"],
  },
  setting: {
    type: String,
    required: [true, "Please add a setting"],
    enum: ["indoor", "outdoor"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  place: {
    type: mongoose.Schema.ObjectId,
    ref: "Place",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  username: {
    type: String,
  },
  userphoto: {
    type: String,
    default: "nophoto.jpg",
  },
  totallikes: {
    type: Number,
    default: 1,
  },
  totaldislikes: {
    type: Number,
    default: 1,
  },
});

// Static method to get avg rating and save
ReviewSchema.statics.getAverageRating = async function (placeId) {
  const obj = await this.aggregate([
    {
      $match: { place: placeId },
    },
    {
      $group: {
        _id: "$place",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  try {
    await this.model("Place").findByIdAndUpdate(placeId, {
      averageRating: obj[0].averageRating.toFixed(2),
    });
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageCost after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.place);
});

// Call getAverageCost before remove
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.place);
});

module.exports = mongoose.model("Review", ReviewSchema);
