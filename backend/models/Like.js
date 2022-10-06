const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema({
  likecount: {
    type: Number,
    default: 1,
  },

  review: {
    type: mongoose.Schema.ObjectId,
    ref: "Review",
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

// // Static method to get avg rating and save
// LikeSchema.statics.getTotalLikes = async function (reviewId) {
//   const obj = await this.aggregate([
//     {
//       $match: { review: reviewId },
//     },
//     {
//       $group: {
//         _id: "$review",
//         totallikes: { $sum: "$likecount" },
//       },
//     },
//   ]);

//   try {
//     await this.model("Review").findByIdAndUpdate(reviewId, {
//       totallikes: obj[0].totallikes,
//     });
//   } catch (err) {
//     console.error(err);
//   }
// };

// // Call getTotalLike after save
// LikeSchema.post("save", function () {
//   this.constructor.getTotalLikes(this.review);
// });

// // Call getTotalLike before remove
// LikeSchema.pre("remove", function () {
//   this.constructor.getTotalLikes(this.review);
// });

module.exports = mongoose.model("Like", LikeSchema);
