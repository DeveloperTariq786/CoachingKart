export interface Banner {
    id: string;
    image: string;
    heading: string;
    description: string;
    createdAt: string;
}

export interface BannerResponse {
    success: boolean;
    message: string;
    data: Banner[];
}
