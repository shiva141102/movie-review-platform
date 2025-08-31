const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
rating: { type: Number, min: 1, max: 5, required: true },
text: { type: String, default: '' },
createdAt: { type: Date, default: Date.now }
});


const MovieSchema = new mongoose.Schema({
title: { type: String, required: true },
genres: [String],
releaseYear: Number,
director: String,
cast: [String],
synopsis: String,
posterUrl: String,
averageRating: { type: Number, default: 0 },
reviews: [ReviewSchema],
createdAt: { type: Date, default: Date.now }
});


MovieSchema.methods.recalculateAverage = function() {
if (!this.reviews || this.reviews.length === 0) {
this.averageRating = 0;
return;
}
const sum = this.reviews.reduce((s, r) => s + r.rating, 0);
this.averageRating = Math.round((sum / this.reviews.length) * 10) / 10;
};


module.exports = mongoose.model('Movie', MovieSchema);
