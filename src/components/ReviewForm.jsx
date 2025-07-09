import { useState } from 'react';
import axios from 'axios';

function ReviewForm({ onReviewSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    comment: '',
    rating: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://qr-feedback-backend-production.up.railway.app/api/reviews', {
        name: formData.name,
        message: formData.comment,  // backend expects `message`, not `comment`
        rating: formData.rating     // optional: if you added this to backend
      });
      alert('Thank you for your feedback!');

      setFormData({
        name: '',
        comment: '',
        rating: ''
      });

      if (onReviewSubmitted) onReviewSubmitted();
    } catch (err) {
      console.error('❌ Submit Error:', err.response?.data || err.message);
      alert('Something went wrong!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem"
      }}
    >
      <h2>Leave a Review</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <textarea
        name="comment"
        placeholder="Your Feedback"
        value={formData.comment}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={formData.rating}
        onChange={handleChange}
        required
        min="1"
        max="5"
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
