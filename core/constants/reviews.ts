
export interface Review {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    rating: number;
    date: string;
    content: string;
    helpfulCount: number;
}

export interface RatingStats {
    average: number;
    totalReviews: number;
    breakdown: {
        stars: number;
        percentage: number;
    }[];
}

export const MOCK_REVIEWS: Review[] = [
    {
        id: '1',
        author: {
            name: 'Sarah Jenkins',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
        },
        rating: 5,
        date: '2 days ago',
        content: "The SAT prep course here is exceptional. The instructors don't just teach the content; they provide strategies for time management and handling difficult questions. My score improved by 200 points in just 3 months. Highly recommend the intensive weekend workshops!",
        helpfulCount: 12
    },
    {
        id: '2',
        author: {
            name: 'Marcus Thompson',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80',
        },
        rating: 5,
        date: '1 week ago',
        content: "Enrolled my son for 10th-grade Math and Science. The batch size is small (about 8 students), which allows for individual attention. The monthly progress reports are very detailed and help us track improvement. The only downside is the limited parking space near the center during peak hours.",
        helpfulCount: 5
    },
    {
        id: '3',
        author: {
            name: 'Jason L.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
        },
        rating: 5,
        date: '3 weeks ago',
        content: "Great study environment and the digital resources (LMS) are really helpful for revising concepts at home. The mock tests are exactly like the real exams.",
        helpfulCount: 2
    }
];

export const MOCK_RATING_STATS: RatingStats = {
    average: 4.8,
    totalReviews: 124,
    breakdown: [
        { stars: 5, percentage: 70 },
        { stars: 4, percentage: 20 },
        { stars: 3, percentage: 5 },
        { stars: 2, percentage: 3 },
        { stars: 1, percentage: 2 },
    ]
};
