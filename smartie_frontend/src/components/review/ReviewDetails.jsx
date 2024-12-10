import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  BookOpen,
  Clock,
  Brain,
  AlertTriangle,
  Loader
} from 'lucide-react';
import reviewService from '../../services/review.service';
import './ReviewDetails.css';

const ReviewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    loadReview();
  }, [id]);

  const loadReview = async () => {
    try {
      setLoading(true);
      const data = await reviewService.getReviewById(id);
      // Add current date if no date exists
      const reviewWithDate = {
        ...data,
        createdAt: data.createdAt || new Date().toISOString()
      };
      setReview(reviewWithDate);
    } catch (err) {
      setError(err.message || 'Failed to load review details');
      if (err.message === 'Unauthorized access to review') {
        setTimeout(() => navigate('/reviews'), 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="review-details-loading">
        <Loader className="animate-spin" size={24} />
        <span>Loading review details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="review-details-error">
        <AlertTriangle size={48} />
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/reviews')} className="back-btn">
          <ArrowLeft size={20} />
          Back to Reviews
        </button>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="review-details-error">
        <AlertTriangle size={48} />
        <h2>Review Not Found</h2>
        <p>The review you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/reviews')} className="back-btn">
          <ArrowLeft size={20} />
          Back to Reviews
        </button>
      </div>
    );
  }

  return (
    <div className="review-details-container">
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate('/reviews')}>
          <ArrowLeft size={20} />
          Back to Reviews
        </button>
        <div className="header-content">
          <h1>{review.flashCard?.subject || 'Review Details'}</h1>
          <div className="header-badges">
            <span className="category-badge">
              <BookOpen size={16} />
              {review.flashCard?.category}
            </span>
            <span className="date-badge">
              <Clock size={16} />
              {formatDate(review.createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="review-content-wrapper">
        <div className="review-main-content">
          <div className="answer-comparison">
            {review.reviewIncorrectAnswer && (
              <div className="answer-panel incorrect">
                <div className="panel-header">
                  <XCircle size={24} />
                  <h3>Your Answer</h3>
                </div>
                <div className="panel-content">
                  <p>{review.reviewIncorrectAnswer}</p>
                  <button 
                    className="explanation-btn"
                    onClick={() => setShowExplanation(!showExplanation)}
                  >
                    {showExplanation ? 'Hide' : 'Show'} Analysis
                  </button>
                  {showExplanation && (
                    <div className="explanation-content">
                      <h4>Review Points:</h4>
                      <ul>
                        <li>Compare your answer with the correct one</li>
                        <li>Notice the key differences</li>
                        <li>Focus on accuracy and precision</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {review.reviewCorrectAnswer && (
              <div className="answer-panel correct">
                <div className="panel-header">
                  <CheckCircle size={24} />
                  <h3>Correct Answer</h3>
                </div>
                <div className="panel-content">
                  <p>{review.reviewCorrectAnswer}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="review-actions">
          <button className="action-btn retry" onClick={() => navigate('/quiz')}>
            <Brain size={20} />
            Go to Quizzes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;