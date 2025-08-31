import React, { useEffect, useState } from 'react';
import API from '../api/api';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';


export default function HomePage() {
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
async function load() {
setLoading(true);
try {
const res = await API.get('/movies?limit=12');
setMovies(res.data.data || []);
} catch (err) { console.error(err); }
finally { setLoading(false); }
}
load();
}, []);


return (
<div className="page">
<h1>Featured Movies</h1>
{loading ? <LoadingSpinner /> : (
<div className="grid">
{movies.map(m => <MovieCard key={m._id} movie={m} />)}
</div>
)}
</div>
);
}
