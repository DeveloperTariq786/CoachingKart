'use client';

import React from 'react';
import { Star, ThumbsUp, ChevronDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/ui/avatar';
import { Card, CardContent } from '@/core/components/ui/card';
import { cn } from '@/core/lib/utils/utils';
import { MOCK_REVIEWS, MOCK_RATING_STATS } from '@/core/constants';

const InstitutionRatingAndReviews: React.FC = () => {
    return (
        <section className="py-12 md:py-16 bg-slate-50/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-10 md:mb-14">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                        What students <span className="text-primary-600">say about us</span>
                    </h2>
                    <p className="text-slate-500 text-sm md:text-lg mt-3 font-medium max-w-2xl leading-relaxed">
                        Discover genuine feedback and success stories from our verified learning community.
                    </p>
                </div>

                {/* Rating Summary Card */}
                <Card className="mb-6 md:mb-8 border-slate-200 shadow-sm overflow-hidden rounded-xl bg-white">
                    <CardContent className="p-4 md:p-8">
                        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                            {/* Average Score */}
                            <div className="flex flex-col items-center md:items-start md:pr-8 md:border-r border-slate-200">
                                <div className="text-4xl md:text-5xl font-bold text-slate-900 mb-1">
                                    {MOCK_RATING_STATS.average}<span className="text-lg md:text-xl text-slate-400 font-normal">/ 5</span>
                                </div>
                                <div className="flex gap-0.5 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={16}
                                            className={cn(
                                                "fill-yellow-400 text-yellow-400",
                                                star > Math.floor(MOCK_RATING_STATS.average) && "text-slate-200 fill-slate-200"
                                            )}
                                        />
                                    ))}
                                </div>
                                <p className="text-slate-500 text-xs md:text-sm">{MOCK_RATING_STATS.totalReviews} verified reviews</p>
                            </div>

                            {/* Breakdown Bars */}
                            <div className="flex-1 w-full space-y-1.5 md:space-y-2">
                                {MOCK_RATING_STATS.breakdown.map((item) => (
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

                {/* Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-5 md:mb-6">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs md:text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        <ChevronDown size={14} />
                        Sort: Newest
                    </button>
                    <div className="text-xs md:text-sm text-slate-400">
                        Showing 1-10 of {MOCK_RATING_STATS.totalReviews} reviews
                    </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-3 md:space-y-4">
                    {MOCK_REVIEWS.map((review) => (
                        <Card key={review.id} className="border-slate-200 shadow-sm overflow-hidden rounded-xl bg-white">
                            <CardContent className="p-4 md:p-6">
                                <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <div className="flex gap-2.5 md:gap-3">
                                        <Avatar className="h-8 w-8 md:h-10 md:w-10">
                                            <AvatarImage src={review.author.avatar} alt={review.author.name} />
                                            <AvatarFallback>{review.author.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 text-sm md:text-base">{review.author.name}</h3>
                                            <p className="text-[10px] md:text-xs text-slate-400">Reviewed {review.date}</p>
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
                                    {review.content}
                                </p>

                                <button className="flex items-center gap-1.5 text-xs md:text-sm text-slate-500 hover:text-primary-600 transition-colors">
                                    <ThumbsUp size={12} />
                                    Helpful ({review.helpfulCount})
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
