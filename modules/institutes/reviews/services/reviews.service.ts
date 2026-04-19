import { apiClient } from '@/core/api/axios/client';
import ENDPOINTS from '@/core/api/endpoint/endpoints';
import { LikeReviewResponse, ReviewsResponse, SubmitReviewRequest, SubmitReviewResponse } from '../types/reviews.types';

export const reviewsService = {
    getReviews: async (institutionId: string): Promise<ReviewsResponse> => {
        const response = await apiClient.get<ReviewsResponse>(
            ENDPOINTS.INSTITUTION.REVIEWS,
            { params: { institutionId } }
        );
        return response.data;
    },
    submitReview: async (data: SubmitReviewRequest): Promise<SubmitReviewResponse> => {
        const response = await apiClient.post<SubmitReviewResponse>(
            ENDPOINTS.INSTITUTION.REVIEWS,
            data
        );
        return response.data;
    },
    likeReview: async (reviewId: string): Promise<LikeReviewResponse> => {
        const response = await apiClient.patch<LikeReviewResponse>(
            ENDPOINTS.INSTITUTION.LIKE_REVIEW,
            {},
            { params: { reviewId } }
        );
        return response.data;
    },
};
