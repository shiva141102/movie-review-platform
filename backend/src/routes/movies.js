
const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const authMiddleware = require("../middlewares/auth"); // your existing auth
const { validateMovie } = require("../middlewares/validate");

// GET /movies → pagination, search, genre filter
router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "", genre } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (genre) filter.genre = genre;

    const movies = await Movie.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Movie.countDocuments(filter);

    res.json({ data: movies, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /movies/:id → get movie by ID
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST /movies → create movie (admin only)
router.post("/", authMiddleware, validateMovie, async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
