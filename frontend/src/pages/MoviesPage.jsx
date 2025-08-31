
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ReviewForm from "../components/ReviewForm";

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/movies/${id}`);
      setMovie(data);
      // Check if in watchlist
      const wl = await api.get(`/users/123/watchlist`); // replace 123 with logged-in user id
      setInWatchlist(wl.data.some((m) => m._id === id));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const toggleWatchlist = async () => {
    try {
      if (inWatchlist) {
        await api.delete(`/users/123/watchlist/${id}`);
        setInWatchlist(false);
      } else {
        await api.post(`/users/123/watchlist`, { movieId: id });
        setInWatchlist(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.synopsis}</p>
      <p>⭐ {movie.averageRating}</p>
      <button onClick={toggleWatchlist}>
        {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
      <ReviewForm movieId={id} />
    </div>
  );
}

export default MoviePage;
