'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService } from '../services/reviews.service';
import { LikeReviewResponse, ReviewsResponse } from '../types/reviews.types';
import { toast } from 'sonner';

export const useLikeReview = (institutionId: string | undefined) => {
    const queryClient = useQueryClient();

    return useMutation<LikeReviewResponse, Error, string, { previousReviews?: ReviewsResponse }>({
        mutationFn: (reviewId: string) => reviewsService.likeReview(reviewId),
        
        onMutate: async (reviewId) => {
            await queryClient.cancelQueries({ queryKey: ['institution-reviews', institutionId] });

            const previousReviews = queryClient.getQueryData<ReviewsResponse>(['institution-reviews', institutionId]);

            if (previousReviews) {
                queryClient.setQueryData<ReviewsResponse>(['institution-reviews', institutionId], {
                    ...previousReviews,
                    data: {
                        ...previousReviews.data,
                        reviews: previousReviews.data.reviews.map((review) => {
                            if (review.id === reviewId) {
                                // Explicitly check for preferred state to avoid miscalculation
                                const isCurrentlyLiked = !!review.isLiked;
                                const newIsLiked = !isCurrentlyLiked;
                                
                                return {
                                    ...review,
                                    isLiked: newIsLiked,
                                    // If unliking (newIsLiked is false), decrease. If liking, increase.
                                    likes: newIsLiked 
                                        ? (review.likes + 1) 
                                        : Math.max(0, review.likes - 1),
                                };
                            }
                            return review;
                        }),
                    },
                });
            }

            return { previousReviews };
        },

        onError: (err, reviewId, context) => {
            if (context?.previousReviews) {
                queryClient.setQueryData(['institution-reviews', institutionId], context.previousReviews);
            }
            const message = (err as any)?.response?.data?.message || "Something went wrong";
            toast.error(message);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['institution-reviews', institutionId] });
        },
    });
};
