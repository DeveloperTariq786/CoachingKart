export interface Course {
    id: string;
    name: string;
    icon: string;
    color: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
    centerCount: number;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface CoursesResponse {
    success: boolean;
    message: string;
    data: Course[];
    pagination: PaginationInfo;
}
