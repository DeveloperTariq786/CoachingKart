'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsService } from '../services/reviews.service';
import { SubmitReviewRequest, SubmitReviewResponse } from '../types/reviews.types';
import { toast } from 'sonner';

export const useSubmitReview = () => {
    const queryClient = useQueryClient();

    return useMutation<SubmitReviewResponse, Error, SubmitReviewRequest>({
        mutationFn: (data: SubmitReviewRequest) => reviewsService.submitReview(data),
        onSuccess: (response, variables) => {
            if (response.success) {
                toast.success(response.message || "Thank you for your review!");
                queryClient.invalidateQueries({ queryKey: ['institution-reviews', variables.institutionId] });
            } else {
                toast.error(response.message || "Failed to submit review");
            }
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Something went wrong";
            toast.error(message);
        },
    });
};
