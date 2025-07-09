// import { useEffect, useState } from 'react';
// import axios from 'axios';

// function ReviewList() {
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5000/reviews')
//       .then(res => setReviews(res.data))
//       .catch(err => console.error('Error fetching reviews:', err));
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h2>Customer Feedback</h2>
//       {reviews.length === 0 ? (
//         <p>No reviews yet.</p>
//       ) : (
//         reviews.map((review, index) => (
//           <div key={index} style={styles.card}>
//             <h4>{review.name}</h4>
//             <p><strong>Comment:</strong> {review.comment}</p>
//             <p><strong>Rating:</strong> ⭐ {review.rating}</p>
//             <p style={{ fontSize: "0.8rem", color: "gray" }}>{new Date(review.createdAt).toLocaleString()}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     maxWidth: 600,
//     margin: "2rem auto",
//     padding: "1rem"
//   },
//   card: {
//     border: "1px solid #ccc",
//     padding: "1rem",
//     borderRadius: "10px",
//     marginBottom: "1rem",
//     backgroundColor: "#f1f1f1"
//   }
// };

// export default ReviewList;


import { useEffect, useState } from 'react';
import axios from 'axios';

function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axios.get('https://qr-feedback-backend-production.up.railway.app');
        setReviews(res.data);
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
