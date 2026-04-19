export interface InstitutionLocation {
    city: string;
    address: string;
    country: string;
}

export interface InstitutionCourse {
    id: string;
    name: string;
}

export interface Institution {
    id: string;
    name: string;
    logo: string;
    coverImage: string | null;
    description: string;
    location: InstitutionLocation;
    centerCount: number;
    courseCount: number;
    totalResults: number;
    rankScore: number;
    rating: number;
    totalReviews: number;
    courses: InstitutionCourse[];
    slug: string;
}

export interface NearMeInstitution {
    id: string;
    name: string;
    slug: string;
    logo: string;
    coverImage: string | null;
    description: string;
    location: InstitutionLocation;
    rating: number;
    totalReviews: number;
    distance: number;
    courses: { id: string; name: string; slug: string }[];
}

export interface NearMeResponse {
    success: boolean;
    message: string;
    data: NearMeInstitution[];
}

export interface NearMeQueryParams {
    latitude?: number;
    longitude?: number;
    radius?: number;
    limit?: number;
}

export interface PaginationInfo {
    limit: number;
    total: number;
}

export interface InstitutionsResponse {
    success: boolean;
    message: string;
    data: Institution[];
    pagination: PaginationInfo;
}

export interface InstitutionsQueryParams {
    limit?: number;
    sortBy?: string;
    page?: number;
    courseName?: string;
    search?: string;
}
