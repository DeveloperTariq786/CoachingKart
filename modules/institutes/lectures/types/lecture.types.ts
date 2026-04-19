export interface Subject {
    id: string;
    name: string;
    icon: string;
}

export interface Faculty {
    name: string;
    profileImage: string;
    tag?: string;
}

export interface Lecture {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    duration: number;
    order: number;
    createdAt: string;
    updatedAt: string;
    faculty: Faculty;
    subjectId: string;
}

export interface BatchSubjectsResponse {
    success: boolean;
    message: string;
    data: {
        batch: {
            name: string;
        };
        subjects: Subject[];
    };
}

export interface LecturesResponse {
    success: boolean;
    message: string;
    data: {
        lectures: Lecture[];
        pagination: {
            currentPage: number;
            limit: number;
            totalLectures: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
    };
}

export interface LectureDetailResponse {
    success: boolean;
    message: string;
    data: Lecture & {
        resources: {
            studyMaterials: number;
        }
    };
}
