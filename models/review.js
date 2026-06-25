const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true
    },

    rating: {
        type: Number,   // ✅ Must be Number
        min: 1,
        max: 5,
        required: true
    },

    Date: {
        type: Date,
        default: Date.now
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
});

module.exports = mongoose.model("Review", ReviewSchema);