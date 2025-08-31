const User = require('../models/User');
const Movie = require('../models/Movie');


exports.getProfile = async (req, res, next) => {
try {
const user = await User.findById(req.params.id).select('-password').populate('watchlist.movie', 'title posterUrl releaseYear averageRating');
if (!user) return res.status(404).json({ error: 'User not found' });
const reviews = await Movie.find({ 'reviews.user': user._id }, { 'reviews.$': 1, title: 1 });
res.json({ user, reviews });
} catch (err) { next(err); }
};


exports.updateProfile = async (req, res, next) => {
try {
if (req.user._id.toString() !== req.params.id && !req.user.isAdmin) return res.status(403).json({ error: 'Forbidden' });
const update = (({ username, profilePicture }) => ({ username, profilePicture }))(req.body);
const user = await User.findByIdAndUpdate(req.params.id, update, { new: true }).select('-password');
res.json(user);
} catch (err) { next(err); }
};


exports.getWatchlist = async (req, res, next) => {
try {
const user = await User.findById(req.params.id).populate('watchlist.movie', 'title posterUrl releaseYear averageRating');
if (!user) return res.status(404).json({ error: 'User not found' });
res.json(user.watchlist);
} catch (err) { next(err); }
};


exports.addToWatchlist = async (req, res, next) => {
try {
const { movieId } = req.body;
const user = await User.findById(req.params.id);
if (!user) return res.status(404).json({ error: 'User not found' });
if (user.watchlist.find(w => w.movie.toString() === movieId)) return res.status(409).json({ error: 'Already in watchlist' });
user.watchlist.push({ movie: movieId, addedAt: new Date() });
await user.save();
res.status(201).json(user.watchlist);
} catch (err) { next(err); }
};


exports.removeFromWatchlist = async (req, res, next) => {
try {
const user = await User.findById(req.params.id);
user.watchlist = user.watchlist.filter(w => w.movie.toString() !== req.params.movieId);
await user.save();
res.json(user.watchlist);
} catch (err) { next(err); }
