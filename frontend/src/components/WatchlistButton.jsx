import React, { useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';


export default function WatchlistButton({ userId, movieId, initialAdded }) {
const { user } = useContext(AuthContext);
const [added, setAdded] = useState(initialAdded || false);
const [loading, setLoading] = useState(false);


if (!user) return null;


const toggle = async () => {
setLoading(true);
try {
if (!added) {
await API.post(`/users/${userId}/watchlist`, { movieId });
setAdded(true);
} else {
await API.delete(`/users/${userId}/watchlist/${movieId}`);
setAdded(false);
}
} catch (err) { alert(err.response?.data?.error || 'Failed'); }
finally { setLoading(false); }
};


return (
<button onClick={toggle} disabled={loading} className="watchlist-btn">
{added ? 'Remove from Watchlist' : 'Add to Watchlist'}
</button>
);
}
