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

export interface HeroSlide {
    id: string | number;
    imageUrl: string;
    title?: string;
    subtitle?: string;
}

export interface InstitutionHeroProps {
    name: string;
    subtitle: string;
    slides?: HeroSlide[];
    institutionId?: string;
    isLoading?: boolean;
}

