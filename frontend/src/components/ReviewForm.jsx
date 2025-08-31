
import React, { useState } from "react";
import api from "../services/api";

function ReviewForm({ movieId }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("Review cannot be empty.");
      return;
    }
    try {
      await api.post(`/movies/${movieId}/reviews`, { rating, text });
      setText("");
      setError("");
      alert("Review submitted!");
    } catch (err) {
      console.error(err);
      setError("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Rating:
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          {[1, 2, 3, 4, 5].map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
