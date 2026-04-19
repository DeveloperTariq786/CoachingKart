// Base API version
const API_VERSION = '/api/v1';

// Authentication Endpoints

export const AUTH_ENDPOINTS = {
    LOGIN: `${API_VERSION}/auth/login`,

} as const;



export const ENDPOINTS = {
    AUTH: AUTH_ENDPOINTS,
    MEDIA: {
        CAROUSEL: `${API_VERSION}/platform/client/media/carousel`,
        ADS: `${API_VERSION}/platform/client/media/ads`,
        OFFERS: `${API_VERSION}/platform/client/media/offers`,
    },
    INSTITUTION: {
        BANNERS: `${API_VERSION}/institution/client/banners`,
        COURSES: `${API_VERSION}/institution/client/courses`,
        CENTERS: `${API_VERSION}/institution/client/centers`,
        SUBJECTS: `${API_VERSION}/institution/client/subjects`,
        FACULTIES: `${API_VERSION}/institution/client/faculties`,
        DETAILS: `${API_VERSION}/institution/client/institute`,
        GALLERY: `${API_VERSION}/institution/client/gallery`,
        BATCHES: `${API_VERSION}/institution/client/batches`,
        HOME_STATS: `${API_VERSION}/institution/client/stats`,
        RESULTS_TOP_10: `${API_VERSION}/institution/client/results/top-10`,
        RESULTS: `${API_VERSION}/institution/client/results`,
        RESULTS_STATS: `${API_VERSION}/institution/client/results/stats`,
        LECTURES: `${API_VERSION}/institution/client/lectures`,
        LECTURE_DETAIL: `${API_VERSION}/institution/client/lectures/detail`,
        BATCH_SUBJECTS: `${API_VERSION}/institution/client/lectures/batch-subjects`,
        REVIEWS: `${API_VERSION}/institution/client/reviews`,
        LIKE_REVIEW: `${API_VERSION}/institution/client/reviews/like`,
        RESOURCES: `${API_VERSION}/institution/client/resource`,
        BATCH_RESOURCES: `${API_VERSION}/institution/client/resource/batch`,
        STUDENT_PROFILE: `${API_VERSION}/institution/client/student/profile`,
        ABOUT: `${API_VERSION}/institution/client/about`,
    },
    COURSES: `${API_VERSION}/platform/client/courses`,
    INSTITUTIONS: `${API_VERSION}/platform/client/institutions`,
    INSTITUTIONS_NEAR_ME: `${API_VERSION}/platform/client/institutions/near-me`,
} as const;

export default ENDPOINTS;
