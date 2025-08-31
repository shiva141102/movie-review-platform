import React, { useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';


export default function ReviewForm({ movieId, onSuccess }) {
const { user } = useContext(AuthContext);
const [rating, setRating] = useState(5);
const [text, setText] = useState('');
const [loading, setLoading] = useState(false);


if (!user) return <div>Please log in to post a review.</div>;


const submit = async (e) => {
e.preventDefault();
if (!rating) return alert('Select rating');
setLoading(true);
try {
await API.post(`/movies/${movieId}/reviews`, { rating, text });
setText('');
setRating(5);
onSuccess?.();
} catch (err) {
alert(err.response?.data?.error || 'Failed to post review');
} finally { setLoading(false); }
};


return (
<form onSubmit={submit} className="review-form">
<label>Rating</label>
<select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
{[5,4,3,2,1].map(n => (<option key={n} value={n}>{n}</option>))}
</select>


<label>Review</label>
<textarea value={text} onChange={e => setText(e.target.value)} rows={4} />


<button type="submit" disabled={loading}>{loading ? 'Posting...' : 'Post Review'}</button>
</form>
);
}
