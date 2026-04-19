export interface InstitutionTheme {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
    foreground?: string;
}

export interface InstitutionDetails {
    id: string;
    name: string;
    logo: string;
    description: string;
    theme?: InstitutionTheme;
    location: {
        city: string;
        address: string;
        country: string;
    };
    tuitionEmail: string;
    tuitionPhone: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
}

export interface InstitutionDetailsResponse {
    success: boolean;
    data: InstitutionDetails;
}
