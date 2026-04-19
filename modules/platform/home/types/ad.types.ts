export interface AdInstitution {
    id: string;
    name: string;
    logo: string;
}

export interface Ad {
    id: string;
    image: string;
    buttonText: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
    institution: AdInstitution;
}

export interface AdsResponse {
    success: boolean;
    message: string;
    data: Ad[];
}
