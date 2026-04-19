export interface Subject {
    id: string;
    name: string;
    icon: string;
    createdAt: string;
}

export interface SubjectsResponse {
    success: boolean;
    message: string;
    data: Subject[];
}
