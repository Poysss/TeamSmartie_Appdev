// src/services/review.service.js

import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const reviewService = {
  async getAllReviews() {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const allReviews = await axios.get(`${API_URL}/review/get`);
      const allFlashcards = await axios.get(`${API_URL}/flashcard/get`);
      
      // Filter reviews for flashcards owned by the current user
      const userFlashcardIds = allFlashcards.data
        .filter(flashcard => flashcard.student?.studentId === userData.studentId)
        .map(flashcard => flashcard.flashCardId);

      return allReviews.data.filter(review => 
        userFlashcardIds.includes(review.flashCard?.flashCardId)
      );
    } catch (error) {
      throw error;
    }
  },

  async getReviewById(id) {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const review = (await axios.get(`${API_URL}/review/get`)).data
        .find(r => r.reviewId.toString() === id.toString());

      if (!review) {
        throw new Error('Review not found');
      }

      // Verify review belongs to user's flashcard
      const flashcard = (await axios.get(`${API_URL}/flashcard/get`)).data
        .find(f => f.flashCardId === review.flashCard?.flashCardId);

      if (flashcard?.student?.studentId !== userData.studentId) {
        throw new Error('Unauthorized access to review');
      }

      return review;
    } catch (error) {
      throw error;
    }
  },

  async createReview(reviewData) {
    try {
      const response = await axios.post(`${API_URL}/review/add`, {
        flashCard: { flashCardId: reviewData.flashCardId },
        reviewIncorrectAnswer: reviewData.reviewIncorrectAnswer,
        reviewCorrectAnswer: reviewData.reviewCorrectAnswer
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateReview(reviewData) {
    try {
      const response = await axios.put(`${API_URL}/review/update`, {
        reviewId: reviewData.reviewId,
        flashCard: { flashCardId: reviewData.flashCardId },
        reviewIncorrectAnswer: reviewData.reviewIncorrectAnswer,
        reviewCorrectAnswer: reviewData.reviewCorrectAnswer
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteReview(reviewId) {
    try {
      const response = await axios.delete(`${API_URL}/review/delete/${reviewId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getReviewsByFlashcard(flashcardId) {
    try {
      const userData = JSON.parse(localStorage.getItem('user'));
      const allReviews = await this.getAllReviews();
      return allReviews.filter(review => 
        review.flashCard.flashCardId === flashcardId && 
        review.flashCard.student?.studentId === userData.studentId
      );
    } catch (error) {
      throw error;
    }
  }
};

export default reviewService;