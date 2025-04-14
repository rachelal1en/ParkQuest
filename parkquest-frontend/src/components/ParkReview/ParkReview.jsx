import React, { useState, useEffect } from 'react';
import styles from './ParkReview.module.css';
import { FaEdit, FaTrashAlt, FaStar, FaRegStar } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const ParkReview = ({ parkCode, userId }) => {
    const [reviews, setReviews] = useState([]);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [submitError, setSubmitError] = useState('');
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editingReviewText, setEditingReviewText] = useState('');
    const [editingRating, setEditingRating] = useState(0);
    const [editError, setEditError] = useState('');
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    useEffect(() => {
        fetchReviews();
    }, [parkCode]);

    const fetchReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8081/park-reviews/${parkCode}`);
            if (!response.ok) throw new Error('Failed to fetch reviews');
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

            if (!response.ok) throw new Error('Failed to submit review');

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

            if (!response.ok) throw new Error('Failed to delete review.');

            fetchReviews();
        } catch (err) {
            toast.error('Error deleting review');
        }
    };

    const handleEditReview = (reviewId, reviewContent, reviewRating) => {
        setEditingReviewId(reviewId);
        setEditingReviewText(reviewContent);
        setEditingRating(reviewRating);
        setEditError('');
    };

    const handleSaveEditReview = async () => {
        if (!editingReviewText.trim()) {
            setEditError("Review cannot be empty");
            return;
        }
        if (editingRating < 1 || editingRating > 5) {
            setEditError("Rating must be between 1 and 5");
            return;
        }

        const updatedReview = { userId, parkCode, content: editingReviewText, rating: editingRating };

        try {
            const response = await fetch(`http://localhost:8081/park-reviews/${editingReviewId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedReview)
            });

            if (!response.ok) throw new Error('Failed to save edited review.');

            fetchReviews();
            setEditingReviewId(null);
            setEditingReviewText('');
            setEditingRating(0);
            toast.success('Review updated!');
        } catch (err) {
            toast.error('Error saving edited review');
        }
    };

    const handleStarClick = (starRating) => {
        if (editingReviewId) {
            setEditingRating(starRating);
        } else {
            setRating(starRating);
        }
    };

    const renderReviews = () => {
        return reviews.map((review) => (
            <div key={review.reviewId} className={styles.review}>
                <div className={styles.reviewHeader}>
                    <span className={styles.userId}>{`user ${review.userId}`}</span>
                    {(String(review.userId) === String(userId) || isAdmin) && (
                        <div className={styles.reviewActions}>
                            {String(review.userId) === String(userId) && (
                                <button onClick={() => handleEditReview(review.reviewId, review.content, review.rating)} className={styles.editBtn}>
                                    <FaEdit />
                                </button>
                            )}
                            <button onClick={() => handleDeleteReview(review.reviewId)} className={styles.deleteBtn}>
                                <FaTrashAlt />
                            </button>
                        </div>
                    )}
                </div>
                <p>{review.content}</p>
                <p><strong>Rating:</strong> {renderStarIcons(review.rating)}</p>
            </div>
        ));
    };

    const renderStarIcons = (currentRating) => {
        return [1, 2, 3, 4, 5].map((i) =>
            i <= currentRating ? (
                <FaStar key={i} className={styles.star} />
            ) : (
                <FaRegStar key={i} className={styles.star} />
            )
        );
    };

    return (
        <div className={styles.parkReviewContainer}>
            <Toaster position="top-right" />
            <h1>Park Reviews</h1>

            <div className={styles.reviewForm}>
                <textarea
                    placeholder="Write your review here..."
                    value={editingReviewId ? editingReviewText : reviewText}
                    onChange={(e) =>
                        editingReviewId
                            ? setEditingReviewText(e.target.value)
                            : setReviewText(e.target.value)
                    }
                    className={styles.reviewTextarea}
                />
                <div className={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} onClick={() => handleStarClick(star)}>
                            {editingReviewId
                                ? editingRating >= star
                                    ? <FaStar className={styles.star} />
                                    : <FaRegStar className={styles.star} />
                                : rating >= star
                                    ? <FaStar className={styles.star} />
                                    : <FaRegStar className={styles.star} />}
                        </div>
                    ))}
                </div>

                {editingReviewId ? (
                    <button onClick={handleSaveEditReview} className={styles.submitBtn}>Save Edit</button>
                ) : (
                    <button onClick={handleSubmitReview} className={styles.submitBtn}>Submit Review</button>
                )}

                {(submitError || editError) && (
                    <p className={styles.errorText}>{submitError || editError}</p>
                )}
            </div>

            <div className={styles.reviews}>
                {reviews.length > 0 ? renderReviews() : <p>No reviews yet.</p>}
            </div>
        </div>
    );
};

export default ParkReview;
