import axios from 'axios';
import API from './api'; // Your global API instance

const ReviewAPI = {
  // Get reviews for a specific book
  getReviewsByBook: async (bookId) => {
    const res = await API.get(`/api/v1/reviews/book/${bookId}`);
    return res.data;
  },

  // Create a new review (rating + optional comment)
  createReview: async (bookId, { rating, comment = "" }) => {
    const res = await API.post(`/api/v1/reviews/book/${bookId}`, { rating, comment });
    return res.data;
  },
};

export default ReviewAPI;