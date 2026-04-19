'use client';

import React, { useState } from 'react';
import { useAuthStore } from '@/core/store/auth.store';
import { useSubmitReview } from '../hooks/useSubmitReview';
import { Button } from '@/core/components/ui/button';
import { Textarea } from '@/core/components/ui/textarea';
import { Card, CardContent } from '@/core/components/ui/card';
import { Star, Loader2 } from 'lucide-react';
import { cn } from '@/core/lib/utils/utils';
import { useRouter } from 'next/navigation';
import { useReviewsStore } from '../store/useReviewsStore';

interface ReviewFormProps {
    institutionId: string;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ institutionId }) => {
    const { isAuthenticated, user } = useAuthStore();
    const { reviewsData } = useReviewsStore();
    const router = useRouter();
    const submitReviewMutation = useSubmitReview();

    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [reviewText, setReviewText] = useState('');

    // Check if user has already reviewed
    const hasReviewed = reviewsData?.reviews.some(r => r.name === user?.name);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!rating || !reviewText.trim()) return;

        submitReviewMutation.mutate({
            institutionId,
            rating,
            review: reviewText,
        }, {
            onSuccess: (data) => {
                if (data.success) {
                    setRating(0);
                    setReviewText('');
                }
            }
        });
    };

    if (!isAuthenticated) return null;

    if (hasReviewed) {
        return (
            <div className="mb-8 p-3 bg-primary-50/50 border border-primary-100 rounded-xl text-center max-w-md mx-auto">
                <p className="text-primary-700 font-semibold text-xs md:text-sm">
                    Thank you! You've already shared your review here.
                </p>
            </div>
        );
    }

    return (
        <Card className="mb-10 border-slate-200 shadow-xl overflow-hidden bg-white max-w-xl mx-auto rounded-2xl">
            <CardContent className="p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">Share your experience</h3>
                    <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    className="p-1 focus:outline-none transition-all hover:scale-125 hover:-translate-y-1 cursor-pointer"
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHover(star)}
                                    onMouseLeave={() => setHover(0)}
                                >
                                    <Star
                                        size={22}
                                        className={cn(
                                            "transition-colors duration-200",
                                            (hover || rating) >= star
                                                ? "fill-yellow-400 text-yellow-400 filter drop-shadow-[0_0_2px_rgba(250,204,21,0.5)]"
                                                : "fill-slate-100 text-slate-300"
                                        )}
                                    />
                                </button>
                            ))}
                        </div>
                        {rating > 0 && (
                            <div className="hidden sm:flex items-center">
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-100">
                                    {rating === 5 ? 'Excellent' : rating === 4 ? 'Great' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative group">
                        <Textarea
                            placeholder="Tell us what you loved about teaching, environment, and support..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="min-h-[110px] text-base resize-none bg-slate-50/30 border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 rounded-2xl p-5 transition-all placeholder:text-slate-400 text-slate-800 font-medium"
                            required
                        />

                    </div>

                    <div className="flex justify-end pt-2">
                        <Button
                            type="submit"
                            disabled={!rating || !reviewText.trim() || submitReviewMutation.isPending}
                            className={cn(
                                "h-11 px-8 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95 disabled:shadow-none cursor-pointer",
                                submitReviewMutation.isPending ? "bg-primary-600" : "bg-primary-600 hover:bg-primary-700 hover:shadow-primary-500/20"
                            )}
                        >
                            {submitReviewMutation.isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Posting...
                                </span>
                            ) : (
                                'Post Review'
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
