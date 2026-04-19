export interface InstitutionCourse {
    id: string;
    name: string;
    icon: string;
    color: string;
    createdAt: string;
    programs: { id: string; name: string }[];
}

export interface InstitutionCoursesResponse {
    success: boolean;
    message: string;
    data: InstitutionCourse[];
}
