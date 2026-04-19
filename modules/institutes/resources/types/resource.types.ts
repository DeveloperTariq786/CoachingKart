export interface Resource {
    id: string;
    order: number;
    fileUrl: string | null;
    textContent: string | null;
    externalUrl: string | null;
    releaseAt: string;
    lectureId: string;
    createdAt: string;
    updatedAt: string;
    lecture?: {
        title: string;
        order: number;
    };
}

export interface ResourcesResponse {
    success: boolean;
    data: Resource[];
}
