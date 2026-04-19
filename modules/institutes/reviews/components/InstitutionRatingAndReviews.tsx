'use client';

import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/ui/avatar';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';
import { useReviews } from '../hooks/useReviews';
import { useLikeReview } from '../hooks/useLikeReview';
import { getBreakdownArray, formatReviewDate } from '@/core/lib/utils/review-utils';
import { ReviewForm } from './ReviewForm';
import useAuthStore from '@/core/store/auth.store';

interface InstitutionRatingAndReviewsProps {
    institutionId?: string;
}

const InstitutionRatingAndReviews: React.FC<InstitutionRatingAndReviewsProps> = ({ institutionId }) => {
    const { isAuthenticated } = useAuthStore();
    const { data: response, isLoading } = useReviews(institutionId);
    const likeReviewMutation = useLikeReview(institutionId);

    const handleLike = (reviewId: string) => {
        if (!isAuthenticated) return;
        likeReviewMutation.mutate(reviewId);
    };

    const reviewsData = response?.data;
    const reviews = reviewsData?.reviews ?? [];
    const stats = reviewsData?.stats;
    const pagination = reviewsData?.pagination;
    const breakdown = getBreakdownArray(reviewsData);

    if (isLoading) {
        return (
            <section className="py-12 md:py-16 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10 md:mb-14">
                        <div className="h-8 w-64 bg-slate-200 animate-pulse rounded-lg"></div>
                        <div className="h-5 w-96 bg-slate-200 animate-pulse rounded-lg mt-3"></div>
                    </div>
                    <div className="h-40 bg-slate-200 animate-pulse rounded-xl mb-6"></div>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-xl"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
                        What students <span className="text-primary-600">say about us</span>
                    </h2>
                    <p className="text-slate-500 text-sm md:text-lg mt-3 font-medium max-w-2xl leading-relaxed">
                        Discover genuine feedback and success stories from our verified learning community.
                    </p>
                </div>

                {/* Rating Summary Card */}
                <Card className="mb-6 md:mb-8 border-foreground/10 shadow-sm overflow-hidden rounded-xl bg-background">
                    <CardContent className="p-4 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                            {/* Average Score */}
                            <div className="flex flex-col items-center md:items-start md:pr-8 md:border-r border-foreground/10">
                                <div className="text-4xl md:text-5xl font-bold text-foreground mb-1">
                                    {stats?.averageRating ?? 0}<span className="text-lg md:text-xl text-slate-400 font-normal">/ 5</span>
                                </div>
                                <div className="flex gap-0.5 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={16}
                                            className={cn(
                                                "fill-yellow-400 text-yellow-400",
                                                star > Math.floor(stats?.averageRating ?? 0) && "text-slate-200 fill-slate-200"
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-500 text-xs md:text-sm">{stats?.totalReviews ?? 0} verified reviews</p>
                            </div>

                            {/* Breakdown Bars */}
                            <div className="flex-1 w-full space-y-1.5 md:space-y-2">
                                {breakdown.map((item) => (
                                    <div key={item.stars} className="flex items-center gap-2 md:gap-3">
                                        <span className="text-xs md:text-sm font-medium text-slate-600 w-3">{item.stars}</span>
                                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary-500 rounded-full transition-all"
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-xs md:text-sm text-slate-400 w-8 md:w-10 text-right">{item.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Review Form */}
                {institutionId && <ReviewForm institutionId={institutionId} />}


                {/* Controls */}
                <div className="flex items-center justify-end mb-5 md:mb-6">
                    <div className="text-xs md:text-sm text-slate-400 font-medium">
                        Showing {reviews.length} of {pagination?.total ?? 0} reviews
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-3 md:space-y-4">
                    {reviews.map((review) => (
                        <Card key={review.id} className="border-foreground/10 shadow-sm overflow-hidden rounded-xl bg-background">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <div className="flex gap-2.5 md:gap-3">
                                        <Avatar className="h-8 w-8 md:h-10 md:w-10">
                                            <AvatarImage src={review.profile ?? undefined} alt={review.name} />
                                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-foreground text-sm md:text-base">{review.name}</h3>
                                            <p className="text-[10px] md:text-xs text-slate-400">Reviewed {formatReviewDate(review.reviewedAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={12}
                                                className={cn(
                                                    "fill-yellow-400 text-yellow-400",
                                                    star > review.rating && "text-slate-200 fill-slate-200"
                                                )}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className="text-slate-600 leading-relaxed text-xs md:text-sm mb-3 md:mb-4">
                                    {review.review}
                                </p>

                                <button
                                    onClick={() => handleLike(review.id)}
                                    className={cn(
                                        "flex items-center gap-1.5 text-xs md:text-sm transition-all duration-200 cursor-pointer",
                                        "active:scale-90 disabled:opacity-50 font-bold",
                                        review.isLiked
                                            ? "text-primary-600"
                                            : "text-slate-500 hover:text-primary-600"
                                    )}
                                >
                                    <ThumbsUp
                                        size={14}
                                        className={cn(
                                            "transition-all duration-300",
                                            review.isLiked && "fill-primary-600"
                                        )}
                                    />
                                    <span>Helpful ({review.likes})</span>
                                </button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default InstitutionRatingAndReviews;
