export interface Batch {
    id: string;
    name: string;
    session: string;
    description: string;
    academicFee: number;
    createdAt: string;
    program?: {
        id: string;
        name: string;
    };
}

export interface BatchesResponse {
    success: boolean;
    message: string;
    data: Batch[];
}
