// src/components/review/ReviewList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw,
  Search,
  Clock,
  ArrowRight,
  BookOpen,
  Loader,
  AlertTriangle
} from 'lucide-react';
import reviewService from '../../services/review.service';
import './ReviewList.css';

const ReviewList = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getAllReviews();
      const reviewsWithDates = data.map(review => ({
        ...review,
        createdAt: review.createdAt || new Date().toISOString()
      }));
      setReviews(reviewsWithDates);
    } catch (err) {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const getReviewStatus = (review) => {
    if (review.reviewIncorrectAnswer && !review.reviewCorrectAnswer) {
      return 'incorrect';
    }
    if (review.reviewCorrectAnswer && !review.reviewIncorrectAnswer) {
      return 'correct';
    }
    return 'mixed';
  };

  const handleReviewClick = (reviewId) => {
    navigate(`/reviews/${reviewId}`);
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "No date available";
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return "No date available";
    }
  };

  const filteredReviews = reviews
    .filter(review => {
      const matchesSearch = review.flashCard?.subject?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

  const getStatusIcon = (status) => {
    switch (status) {
      case 'correct':
        return <CheckCircle size={20} className="status-icon correct" />;
      case 'incorrect':
        return <XCircle size={20} className="status-icon incorrect" />;
      case 'mixed':
        return <RefreshCw size={20} className="status-icon mixed" />;
      default:
        return <RefreshCw size={20} className="status-icon mixed" />;
    }
  };

  if (loading) {
    return (
      <div className="review-loading">
        <Loader className="animate-spin" size={24} />
        <span>Loading reviews...</span>
      </div>
    );
  }

  return (
    <div className="review-list-container">
      <div className="review-header">
        <h1>Review History</h1>
        
        <div className="search-section">
          <div className="search-bar">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <AlertTriangle size={20} />
          {error}
        </div>
      )}

      <div className="reviews-grid">
        {filteredReviews.map((review, index) => {
          const status = getReviewStatus(review);
          const showIncorrect = review.reviewIncorrectAnswer;
          const showCorrect = review.reviewCorrectAnswer;
          
          return (
            <div 
              key={review.reviewId} 
              className={`review-card ${status}`}
              style={{ '--delay': `${index * 0.1}s` }}
              onClick={() => handleReviewClick(review.reviewId)}
            >
              <div className="review-header">
                {getStatusIcon(status)}
                <h3>{review.flashCard?.subject}</h3>
                <span className="review-date">
                  <Clock size={16} />
                  {formatDate(review.createdAt)}
                </span>
              </div>

              <div className="review-content">
                <div className="category-badge">
                  <BookOpen size={16} />
                  {review.flashCard?.category}
                </div>

                {showIncorrect && (
                  <div className="answer-section incorrect">
                    <h4>Incorrect Answer:</h4>
                    <p>{review.reviewIncorrectAnswer}</p>
                  </div>
                )}

                {showCorrect && (
                  <div className="answer-section correct">
                    <h4>Correct Answer:</h4>
                    <p>{review.reviewCorrectAnswer}</p>
                  </div>
                )}
              </div>

              <div className="review-actions">
                <span className="view-details">
                  View Details
                  <ArrowRight size={18} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredReviews.length === 0 && (
        <div className="empty-state">
          <BookOpen size={48} />
          <h2>No Reviews Found</h2>
          <p>Complete some quizzes to see your review history</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList;