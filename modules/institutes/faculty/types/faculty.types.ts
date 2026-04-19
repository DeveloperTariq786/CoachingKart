export interface FacultySubject {
    name: string;
}

export interface Faculty {
    id: string;
    name: string;
    profileImage: string;
    experience: string;
    tag: string;
    description: string;
    subject: FacultySubject;
    createdAt: string;
}

export interface FacultiesResponse {
    success: boolean;
    message: string;
    data: Faculty[];
}

export interface FacultiesQueryParams {
    institutionId: string;
    subjectId?: string;
}
