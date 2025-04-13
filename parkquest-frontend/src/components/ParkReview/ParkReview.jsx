import React, { useState, useEffect } from 'react';
import styles from './ParkReview.module.css';
import { FaEdit, FaTrashAlt, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ParkReview = ({ parkCode, userId }) => {
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
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
            setError('Error fetching reviews');
        }
    };

    const handleSubmitReview = async () => {
        if (rating < 1 || rating > 5) {
            setError("Rating must be between 1 and 5");
            return;
        }

        const userReview = { userId, parkCode, content: reviewText, rating };

        try {
            const response = await fetch('http://localhost:8081/park-reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userReview)
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }
            fetchReviews();
            setReviewText('');
            setRating(0);
            setError('');
        } catch (err) {
            setError('Error submitting review');
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
                throw new Error('Failed to delete review');
            }

            // Refresh the reviews list after successful deletion
            fetchReviews();
        } catch (err) {
            setError('Error deleting review');
        }
    };

    const handleEditReview = (reviewId, reviewContent, reviewRating) => {
        setEditingReviewId(reviewId);
        setEditingReviewText(reviewContent);
        setEditingRating(reviewRating);
    };

    const handleSaveEditReview = async () => {
        if (editingRating < 1 || editingRating > 5) {
            setError("Rating must be between 1 and 5");
            return;
        }

        const updatedReview = { userId, parkCode, content: editingReviewText, rating: editingRating };

        try {
            const response = await fetch(`http://localhost:8081/park-reviews/${editingReviewId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedReview)
            });

            if (!response.ok) {
                throw new Error('Failed to save edited review');
            }
            fetchReviews();
            setEditingReviewId(null);
            setEditingReviewText('');
            setEditingRating(0);
            setError('');
        } catch (err) {
            setError('Error saving edited review');
        }
    };

    const handleStarClick = (starRating) => {
        if (editingReviewId) {
            setEditingRating(starRating);
        } else {
            setRating(starRating);
        }
    };

    const renderStarRating = (currentRating) => {
        const fullStars = Math.floor(currentRating);
        const halfStar = currentRating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(currentRating);

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className={styles.star} />);
        }

        if (halfStar) {
            stars.push(<FaStarHalfAlt key={fullStars} className={styles.star} />);
        }

        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={fullStars + halfStar + i} className={styles.star} />);
        }

        return stars;
    };

    const renderReviews = () => {
        return reviews.map((review) => (
            <div key={review.reviewId} className={styles.review}>
                <div className={styles.reviewHeader}>
                    <span className={styles.userId}>{`user ${review.userId}`}</span>
                    {String(review.userId) === String(userId) && (
                        <div className={styles.reviewActions}>
                            <button onClick={() => handleEditReview(review.reviewId, review.content, review.rating)} className={styles.editBtn}>
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDeleteReview(review.reviewId)} className={styles.deleteBtn}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    )}
                </div>
                <p>{review.content}</p>
                <p><strong>Rating:</strong> {renderStarRating(review.rating)}</p>
            </div>
        ));
    };

    return (
        <div className={styles.parkReviewContainer}>
            <h1>Park Reviews</h1>

            <div className={styles.reviewForm}>
                <textarea
                    value={editingReviewId ? editingReviewText : reviewText}
                    onChange={(e) => editingReviewId ? setEditingReviewText(e.target.value) : setReviewText(e.target.value)}
                    placeholder="Write your review..."
                    className={styles.reviewTextarea}
                />
                <div className={styles.ratingContainer}>
                    {renderStarRating(rating).map((star, index) => (
                        <div key={index} onClick={() => handleStarClick(index + 1)}>
                            {star}
                        </div>
                    ))}
                </div>
                <button
                    onClick={editingReviewId ? handleSaveEditReview : handleSubmitReview}
                    className={styles.submitBtn}
                >
                    {editingReviewId ? 'Edit Review' : 'Submit Review'}
                </button>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <div className={styles.reviews}>
                {reviews.length > 0 ? renderReviews() : <p>No reviews yet.</p>}
            </div>
        </div>
    );
};

export default ParkReview;
