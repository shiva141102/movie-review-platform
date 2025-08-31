
const { body, validationResult } = require("express-validator");

// Validation rules for review
const validateReview = [
  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("text")
    .notEmpty()
    .withMessage("Review text cannot be empty"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

// Validation rules for movie (admin)
const validateMovie = [
  body("title").notEmpty().withMessage("Title is required"),
  body("genre").notEmpty().withMessage("Genre is required"),
  body("releaseYear").isInt().withMessage("Release year must be a number"),
  body("director").notEmpty().withMessage("Director is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];

module.exports = { validateReview, validateMovie };
