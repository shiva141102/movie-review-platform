
const mongoose = require("mongoose");
const Movie = require("./models/Movie");

mongoose.connect("mongodb://localhost:27017/moviesdb")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

const movies = [
  {
    title: "Inception",
    genre: "Sci-Fi",
    releaseYear: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    synopsis: "A thief who steals corporate secrets...",
    posterUrl: "https://image.tmdb.org/t/p/original/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    averageRating: 4.5
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    releaseYear: 2008,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger"],
    synopsis: "Batman raises the stakes in his war on crime...",
    posterUrl: "https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    averageRating: 4.8
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    releaseYear: 2014,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway"],
    synopsis: "A team of explorers travel through a wormhole...",
    posterUrl: "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    averageRating: 4.6
  }
];

async function seed() {
  await Movie.deleteMany({});
  await Movie.insertMany(movies);
  console.log("Database seeded!");
  mongoose.connection.close();
}

seed();
