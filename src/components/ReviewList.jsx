import { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get('https://qr-feedback-backend-production.up.railway.app/api/reviews');
        setReviews(res.data); // ✅ You missed this line
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h2>Customer Feedback</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <div key={index} style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "1rem", borderRadius: "8px" }}>
            <strong>{review.name}</strong> <br />
            ⭐ Rating: {review.rating}/5 <br />
            {review.message}
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;
