export interface ReviewItem {
    id: string;
    name: string;
    profile: string | null;
    rating: number;
    review: string;
    likes: number;
    isLiked: boolean;
    reviewedAt: string;
}

export interface RatingBreakdownItem {
    count: number;
    percentage: number;
}

export interface ReviewStats {
    averageRating: number;
    totalReviews: number;
    ratingBreakdown: Record<string, RatingBreakdownItem>;
}

export interface ReviewPagination {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface ReviewsData {
    stats: ReviewStats;
    reviews: ReviewItem[];
    pagination: ReviewPagination;
}

export interface ReviewsResponse {
    success: boolean;
    message: string;
    data: ReviewsData;
}

export interface SubmitReviewRequest {
    rating: number;
    review: string;
    institutionId: string;
}

export interface SubmitReviewResponse {
    success: boolean;
    message: string;
}

export interface LikeReviewResponse {
    success: boolean;
    message: string;
}
