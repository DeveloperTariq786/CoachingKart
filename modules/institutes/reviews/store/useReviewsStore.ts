import { create } from 'zustand';
import { ReviewsData } from '../types/reviews.types';

interface ReviewsState {
    reviewsData: ReviewsData | null;
    setReviewsData: (data: ReviewsData) => void;
}

export const useReviewsStore = create<ReviewsState>((set) => ({
    reviewsData: null,
    setReviewsData: (reviewsData) => set({ reviewsData }),
}));
