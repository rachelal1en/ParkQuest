import React, { useState, useEffect } from 'react';
import styles from './ParkReview.module.css';
import toast, { Toaster } from 'react-hot-toast'; // For better error handling

const ParkReview = ({ parkCode, userId }) => {
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [submitError, setSubmitError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [editError, setEditError] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editingReviewText, setEditingReviewText] = useState('');
    const [editingRating, setEditingRating] = useState(0);

    useEffect(() => {
        fetchReviews();
    }, [parkCode]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8081/park-reviews/${parkCode}`);
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            const data = await response.json();
            setReviews(data);
        } catch (err) {
            toast.error('Failed to fetch reviews.');
        }
    };

    const handleSubmitReview = async () => {
        if (!reviewText.trim()) {
            setSubmitError("Review cannot be empty.");
            toast.error('Review cannot be empty.');
            return;
        }
        if (rating < 1 || rating > 5) {
            setSubmitError("Rating must be between 1 and 5.");
            toast.error('Rating must be between 1 and 5.');
            return;
        }

        const userReview = { userId, parkCode, content: reviewText, rating };

        try {
            const response = await fetch('http://localhost:8081/park-reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userReview),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            fetchReviews();
            setReviewText('');
            setRating(0);
            setSubmitError('');
            toast.success('Review submitted successfully!');
        } catch (err) {
            toast.error('Error submitting review.');
        }
    };

    const handleDeleteReview = async (reviewId) => {
        const userConfirmed = window.confirm("Are you sure you want to delete this review?");
        if (!userConfirmed) return;

        try {
            const response = await fetch(`http://localhost:8081/park-reviews/${reviewId}?userId=${userId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete review.');
            }

            toast.success('Review deleted successfully!');
            fetchReviews();
        } catch (err) {
            toast.error('Failed to delete review.');
        }
    };

    return (
        <div className={styles.reviewContainer}>
            <Toaster /> {/* Display toast notifications */}
            {/* Review Form */}
            <form onSubmit={(e) => e.preventDefault()}>
                <h3>Leave a Review</h3>
                <textarea
                    placeholder="Write your review here..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Rating (1-5)"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    min="1"
                    max="5"
                />
                <button onClick={handleSubmitReview}>Submit</button>
                {submitError && <p>{submitError}</p>}
            </form>

            {/* Review List */}
            <ul>
                {reviews.map((review) => (
                    <li key={review.id}>
                        <p>{review.content}</p>
                        <p>Rating: {review.rating}</p>
                        <p>By User: {review.userId}</p>
                        {review.userId === userId && (
                            <div>
                                <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ParkReview;