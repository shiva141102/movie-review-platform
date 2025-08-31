const Movie = require('../models/Movie');


exports.getMovies = async (req, res, next) => {
try {
const { page = 1, limit = 12, search, genre, year, minRating, sort } = req.query;
const q = {};
if (search) q.title = { $regex: search, $options: 'i' };
if (genre) q.genres = genre;
if (year) q.releaseYear = Number(year);
if (minRating) q.averageRating = { $gte: Number(minRating) };


let mongoQuery = Movie.find(q);


if (sort === 'rating') mongoQuery = mongoQuery.sort({ averageRating: -1 });
else if (sort === 'newest') mongoQuery = mongoQuery.sort({ createdAt: -1 });


const total = await Movie.countDocuments(q);
const movies = await mongoQuery.skip((page - 1) * limit).limit(Number(limit)).exec();


res.json({ data: movies, meta: { total, page: Number(page), limit: Number(limit) } });
} catch (err) { next(err); }
};


exports.getMovieById = async (req, res, next) => {
try {
const movie = await Movie.findById(req.params.id).populate('reviews.user', 'username profilePicture');
if (!movie) return res.status(404).json({ error: 'Movie not found' });
res.json(movie);
} catch (err) { next(err); }
};


exports.addReview = async (req, res, next) => {
try {
const { rating, text } = req.body;
if (!rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Invalid rating' });


const movie = await Movie.findById(req.params.id);
if (!movie) return res.status(404).json({ error: 'Movie not found' });


movie.reviews.push({ user: req.user._id, rating, text });
movie.recalculateAverage();
await movie.save();


res.status(201).json({ message: 'Review added', averageRating: movie.averageRating });
} catch (err) { next(err); }
};
