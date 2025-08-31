
import React, { useEffect, useState } from "react";
import api from "../services/api";
import MovieCard from "../components/MovieCard";

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    fetchMovies();
  }, [search, genre]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/movies", {
        params: { search, genre }
      });
      setMovies(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Featured Movies</h1>

      {/* Search & Filter */}
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">All Genres</option>
          <option value="Action">Action</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
