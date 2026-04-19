import { ReviewsData } from '@/modules/institutes/reviews/types/reviews.types';

/** Convert ratingBreakdown object to a sorted array for display (5 → 1) */
export const getBreakdownArray = (data: ReviewsData | undefined) => {
    if (!data) return [];
    return [5, 4, 3, 2, 1].map((star) => ({
        stars: star,
        percentage: data.stats.ratingBreakdown[String(star)]?.percentage ?? 0,
    }));
};

/** Format ISO date string to a human-readable relative or short date */
export const formatReviewDate = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};
