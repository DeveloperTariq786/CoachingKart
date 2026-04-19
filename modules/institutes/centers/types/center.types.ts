export interface Location {
    id: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
}

export interface InstitutionCenter {
    id: string;
    name: string;
    image: string;
    phone: string;
    institutionId: string;
    locationId: string | null;
    createdAt: string;
    updatedAt: string;
    location: Location | null;
}

export interface InstitutionCentersResponse {
    success: boolean;
    message: string;
    data: {
        centers: InstitutionCenter[];
        totalCenters: number;
    };
}
