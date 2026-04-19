export interface Institution {
    id: string;
    name: string;
    logo: string;
}

export interface CarouselSlide {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    image: string;
    institutionId: string;
    createdAt: string;
    updatedAt: string;
    institution: Institution;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}
