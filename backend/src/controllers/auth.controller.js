const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


const registerSchema = Joi.object({
username: Joi.string().min(3).required(),
email: Joi.string().email().required(),
password: Joi.string().min(6).required()
});


exports.register = async (req, res, next) => {
try {
const { error, value } = registerSchema.validate(req.body);
if (error) return res.status(400).json({ error: error.details[0].message });
const { username, email, password } = value;
const existing = await User.findOne({ $or: [{ email }, { username }] });
if (existing) return res.status(409).json({ error: 'User already exists' });
const hashed = await bcrypt.hash(password, 10);
const user = await User.create({ username, email, password: hashed });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email } });
} catch (err) { next(err); }
};


exports.login = async (req, res, next) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ error: 'Invalid credentials' });
const ok = await bcrypt.compare(password, user.password);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
} catch (err) { next(err); }
};
