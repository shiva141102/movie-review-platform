const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
username: { type: String, required: true, unique: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true },
profilePicture: String,
joinDate: { type: Date, default: Date.now },
watchlist: [{ movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }, addedAt: Date }],
isAdmin: { type: Boolean, default: false }
});


module.exports = mongoose.model('User', UserSchema);
