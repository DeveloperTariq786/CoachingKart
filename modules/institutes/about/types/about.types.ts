export interface InstitutionAboutData {
    id: string;
    title: string | null;
    description: string | null;
    image: string | null;
    visionTitle: string | null;
    visionContent: string | null;
    missionTitle: string | null;
    missionContent: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface InstitutionAboutResponse {
    success: boolean;
    data: InstitutionAboutData;
    message?: string;
}
