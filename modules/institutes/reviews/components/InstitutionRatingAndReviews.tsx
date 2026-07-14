'use client';

import React from 'react';
import { Star, ThumbsUp, BadgeCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/ui/avatar';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';
import { useReviews } from '../hooks/useReviews';
import { useLikeReview } from '../hooks/useLikeReview';
import { getBreakdownArray, formatReviewDate } from '@/core/lib/utils/review-utils';
import { ReviewForm } from './ReviewForm';
import { useAuthStore } from '@/modules/platform/auth';

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
                <div className="w-full px-4 sm:px-6 lg:px-10">
                    <div className="mb-10 md:mb-14">
                        <div className="h-8 w-64 bg-slate-200 animate-pulse rounded-lg" />
                        <div className="h-5 w-96 bg-slate-200 animate-pulse rounded-lg mt-3" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        <div className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
                            <div className="h-56 bg-slate-200 animate-pulse rounded-xl" />
                            <div className="h-40 bg-slate-200 animate-pulse rounded-xl" />
                        </div>
                        <div className="flex-1 min-w-0 space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-32 bg-slate-200 animate-pulse rounded-xl" />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="w-full px-4 sm:px-6 lg:px-10">

                {/* Section Header */}
                <div className="mb-10 md:mb-14 text-center">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 bg-background px-4 py-1.5 rounded-full mb-4 border border-foreground/10 shadow-sm">
                        <BadgeCheck size={14} className="text-primary-600" />
                        Verified Feedback
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                        What students <span className="text-primary-600">say about us</span>
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-[17px] leading-relaxed mt-3">
                        Discover genuine feedback and success stories from our verified learning community.
                    </p>
                </div>

                {/* Two-column layout on large screens */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">

                    {/* ── LEFT COLUMN ── sticky panel */}
                    <div className="w-full lg:w-[22rem] shrink-0 flex flex-col gap-4 lg:sticky lg:top-6">

                        {/* Rating Summary Card */}
                        <Card className="border-foreground/10 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-2xl bg-background">
                            <CardContent className="p-6 md:p-7">

                                {/* Average score */}
                                <div className="mb-5 pb-5 border-b border-foreground/10">
                                    <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-5xl font-bold text-foreground tracking-tight">
                                            {stats?.averageRating ?? 0}
                                        </span>
                                        <span className="text-base text-slate-400 font-medium">/ 5</span>
                                    </div>
                                    <div className="flex gap-1 mb-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                size={18}
                                                strokeWidth={1.5}
                                                className={cn(
                                                    'fill-yellow-400 text-yellow-400',
                                                    star > Math.floor(stats?.averageRating ?? 0) &&
                                                    'text-slate-200 fill-slate-200'
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium">
                                        Based on {stats?.totalReviews ?? 0} verified reviews
                                    </p>
                                </div>

                                {/* Breakdown bars */}
                                <div className="space-y-3">
                                    {breakdown.map((item) => (
                                        <div key={item.stars} className="flex items-center gap-2.5">
                                            <span className="text-sm font-semibold text-slate-600 w-2.5 text-right tabular-nums">
                                                {item.stars}
                                            </span>
                                            <Star size={12} className="fill-slate-300 text-slate-300 shrink-0" />
                                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary-500 rounded-full transition-all duration-500"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-sm text-slate-400 font-medium w-10 text-right tabular-nums">
                                                {item.percentage}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Review Form */}
                        {institutionId && <ReviewForm institutionId={institutionId} />}
                    </div>

                    {/* ── RIGHT COLUMN ── reviews list */}
                    <div className="flex-1 min-w-0 flex flex-col gap-3 md:gap-4">

                        {/* Meta row */}
                        <div className="flex items-center justify-between">
                            <div className="h-px flex-1 bg-foreground/10 hidden md:block" />
                            <span className="text-xs md:text-sm text-slate-400 font-medium md:pl-4 shrink-0">
                                Showing <span className="text-slate-600 font-semibold">{reviews.length}</span> of{' '}
                                <span className="text-slate-600 font-semibold">{pagination?.total ?? 0}</span> reviews
                            </span>
                        </div>

                        {/* Review cards */}
                        {reviews.map((review) => (
                            <Card
                                key={review.id}
                                className="border-foreground/10 shadow-sm hover:shadow-md hover:border-foreground/15 transition-all duration-200 overflow-hidden rounded-2xl bg-background"
                            >
                                <CardContent className="p-4 md:p-6">

                                    {/* Review header */}
                                    <div className="flex justify-between items-start mb-3 md:mb-4">
                                        <div className="flex gap-2.5 md:gap-3">
                                            <Avatar className="h-9 w-9 md:h-11 md:w-11 ring-2 ring-foreground/5">
                                                <AvatarImage
                                                    src={review.profile ?? undefined}
                                                    alt={review.name}
                                                />
                                                <AvatarFallback className="bg-primary-50 text-primary-600 font-semibold">
                                                    {review.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-semibold text-foreground text-sm md:text-base leading-tight">
                                                    {review.name}
                                                </h3>
                                                <p className="text-[10px] md:text-xs text-slate-400 mt-0.5">
                                                    Reviewed {formatReviewDate(review.reviewedAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex gap-0.5 bg-yellow-50 px-2 py-1 rounded-full shrink-0">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={12}
                                                    strokeWidth={1.5}
                                                    className={cn(
                                                        'fill-yellow-400 text-yellow-400',
                                                        star > review.rating &&
                                                        'text-slate-200 fill-slate-200'
                                                    )}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review body */}
                                    <p className="text-slate-600 leading-relaxed text-xs md:text-sm mb-3 md:mb-4">
                                        {review.review}
                                    </p>

                                    {/* Helpful button */}
                                    <button
                                        onClick={() => handleLike(review.id)}
                                        className={cn(
                                            'inline-flex items-center gap-1.5 text-xs md:text-sm transition-all duration-200 cursor-pointer',
                                            'active:scale-90 disabled:opacity-50 font-semibold px-3 py-1.5 rounded-full border',
                                            review.isLiked
                                                ? 'text-primary-600 bg-primary-50 border-primary-200'
                                                : 'text-slate-500 border-foreground/10 hover:text-primary-600 hover:bg-primary-50 hover:border-primary-200'
                                        )}
                                    >
                                        <ThumbsUp
                                            size={13}
                                            className={cn(
                                                'transition-all duration-300',
                                                review.isLiked && 'fill-primary-600'
                                            )}
                                        />
                                        <span>Helpful ({review.likes})</span>
                                    </button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default InstitutionRatingAndReviews;