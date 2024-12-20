import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw,
  BookOpen,
  Loader
} from 'lucide-react';
import flashcardService from '../../services/flashcard.service';
import './FlashcardStudy.css';

const FlashcardStudy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flashcard, setFlashcard] = useState(null);
  const [contents, setContents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFlashcard();
  }, [id]);

  const loadFlashcard = async () => {
    try {
      setLoading(true);
      setError('');
      
      const flashcardData = await flashcardService.getFlashcardById(id);
      if (!flashcardData) {
        throw new Error('Flashcard not found');
      }

      const contentsData = await flashcardService.getFlashcardContentsById(id);
      if (!contentsData || contentsData.length === 0) {
        throw new Error('No content found for this flashcard');
      }

      setFlashcard(flashcardData);
      setContents(contentsData);
    } catch (err) {
      console.error('Error loading flashcard:', err);
      setError(err.message || 'Failed to load flashcard');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < contents.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  if (loading) {
    return (
      <div className="study-loading">
        <Loader className="animate-spin" size={24} />
        <span>Loading flashcard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="study-error">
        <div className="error-content">
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={() => navigate('/flashcards')} className="back-btn">
            <ArrowLeft size={20} />
            Back to Flashcards
          </button>
        </div>
      </div>
    );
  }

  if (!contents.length) {
    return (
      <div className="study-empty">
        <BookOpen size={48} />
        <h2>No Content Available</h2>
        <p>This flashcard deck has no content to study.</p>
        <button onClick={() => navigate('/flashcards')} className="back-btn">
          Back to Flashcards
        </button>
      </div>
    );
  }

  const currentContent = contents[currentIndex];

  return (
    <div className="study-container">
      <div className="study-header">
        <button className="back-btn" onClick={() => navigate('/flashcards')}>
          <ArrowLeft size={20} />
          Back to Flashcards
        </button>
        <div className="study-info">
          <h1>{flashcard.subject}</h1>
          <span className="category-badge">{flashcard.category}</span>
        </div>
      </div>

      <div className="quiz-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentIndex + 1) / contents.length) * 100}%` }}
          />
        </div>
        <div className="progress-stats">
          <span>Card {currentIndex + 1} of {contents.length}</span>
        </div>
      </div>

      <div className={`flashcard-study ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <div className="flashcard-inner">
          <div className="flashcard-front">
            <div className="card-content">
              <h2>Question</h2>
              <p>{currentContent.question}</p>
            </div>
            <div className="card-footer">
              <span className="card-counter">
                {currentIndex + 1} / {contents.length}
              </span>
              <button className="flip-hint">
                <RotateCw size={18} />
                Click to flip
              </button>
            </div>
          </div>
          <div className="flashcard-back">
            <div className="card-content">
              <h2>Answer</h2>
              <p>{currentContent.answer}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="study-navigation">
        <button 
          className="nav-btn"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ArrowLeft size={20} />
          Previous
        </button>
        <button 
          className="nav-btn"
          onClick={handleNext}
          disabled={currentIndex === contents.length - 1}
        >
          Next
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardStudy;