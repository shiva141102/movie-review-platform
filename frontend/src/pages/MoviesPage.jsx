import API from '../api/api';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';


export default function MoviesPage() {
const [movies, setMovies] = useState([]);
const [query, setQuery] = useState('');
const [loading, setLoading] = useState(false);


useEffect(() => {
async function fetch() {
setLoading(true);
try {
const res = await API.get(`/movies?search=${encodeURIComponent(query)}&limit=24`);
setMovies(res.data.data || []);
} catch (err) { console.error(err); }
finally { setLoading(false); }
}
fetch();
}, [query]);


return (
<div className="page">
<h1>All Movies</h1>
<div style={{ marginBottom: 12 }}>
<input placeholder="Search movies..." value={query} onChange={e => setQuery(e.target.value)} />
</div>
{loading ? <LoadingSpinner /> : (
<div className="grid">
{movies.map(m => <MovieCard key={m._id} movie={m} />)}
</div>
)}
</div>
);
}
