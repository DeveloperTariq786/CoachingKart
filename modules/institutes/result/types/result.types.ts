export interface PerformerCourse {
    id: string;
    name: string;
}

export interface TopPerformer {
    id: string;
    profile: string;
    rank: string;
    score: string;
    name: string;
    courseId: string;
    course: PerformerCourse;
}

export interface TopPerformersResponse {
    success: boolean;
    data: TopPerformer[];
}

export interface Result {
    id: string;
    profile: string;
    rank: string;
    score: string;
    name: string;
    session: string;
    courseId: string;
    course: PerformerCourse;
}

export interface ResultsQueryParams {
    institutionId: string;
    courseId?: string;
    year?: string;
    page?: number;
    limit?: number;
}

export interface ResultsResponse {
    success: boolean;
    data: Result[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

export interface ResultStats {
    courseId: string;
    course: string;
    qualifiedCount: number;
}

export interface ResultStatsResponse {
    success: boolean;
    data: ResultStats[];
}
