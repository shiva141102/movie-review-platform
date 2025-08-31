const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


const authRoutes = require('./routes/auth.routes');
const moviesRoutes = require('./routes/movies.routes');
const usersRoutes = require('./routes/users.routes');
const errorMiddleware = require('./middlewares/error.middleware');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/users', usersRoutes);


app.use(errorMiddleware);


module.exports = app
