const mongoose = require('mongoose');

const DislikeSchema = new mongoose.Schema({
  dislikecount: {
    type: Number,
    default: 1
  },

  review: {
    type: mongoose.Schema.ObjectId,
    ref: 'Review',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Dislike', DislikeSchema);
