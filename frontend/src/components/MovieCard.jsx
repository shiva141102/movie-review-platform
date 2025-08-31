import React from 'react';
import { Link } from 'react-router-dom';


export default function MovieCard({ movie }) {
return (
<div className="movie-card">
<Link to={`/movies/${movie._id}`}>
<img src={movie.posterUrl || 'https://via.placeholder.com/300x450'} alt={movie.title} />
</Link>
<div className="movie-info">
<h3>{movie.title}</h3>
<p className="meta">{movie.releaseYear} • {movie.genres?.slice(0,2).join(', ')}</p>
<p className="rating">⭐ {movie.averageRating ?? '—'}</p>
</div>
</div>
);
}
