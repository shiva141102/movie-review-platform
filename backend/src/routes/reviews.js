
const express = require("express");
const router = express.Router({ mergeParams: true });
const Review = require("../models/Review");
const Movie = require("../models/Movie");
const authMiddleware = require("../middlewares/auth");
const { validateReview } = require("../middlewares/validate");

// GET /movies/:id/reviews → get reviews for a movie
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ movie: req.params.id }).populate("user", "username");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /movies/:id/reviews → submit new review
router.post("/", authMiddleware, validateReview, async (req, res) => {
  try {
    const { rating, text } = req.body;

    const review = new Review({
      movie: req.params.id,
      user: req.user.id,
      rating,
      text,
      createdAt: new Date(),
    });

    await review.save();

    // Update average rating in Movie
    const reviews = await Review.find({ movie: req.params.id });
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Movie.findByIdAndUpdate(req.params.id, { averageRating: avg });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
