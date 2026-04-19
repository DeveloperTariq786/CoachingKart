export interface OfferInstitution {
    id: string;
    name: string;
    logo: string;
}

export interface Offer {
    id: string;
    title: string;
    description: string;
    discount: number;
    startAt: string;
    endAt: string;
    isActive: boolean;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
    institution: OfferInstitution;
    remainingSeconds: number;
}

export interface OffersResponse {
    success: boolean;
    message: string;
    data: Offer[];
}
