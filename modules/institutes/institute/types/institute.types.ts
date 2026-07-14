export interface InstitutionTheme {
    id: number;
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    accent: string;
    createdAt: string;
    updatedAt: string;
}

export interface InstitutionDetails {
    id: string | number; // Support string (transformed) and number (from API)
    name: string;
    logo: string;
    description: string;
    location: any; // Changed to any to support both string (new API) and object (old components)
    tuitionEmail: string;
    tuitionPhone: string;
    institutionTheme: InstitutionTheme;
    theme?: InstitutionTheme; // For backward compatibility
    createdAt: string;
    updatedAt: string;
    slug: string;
}

export interface InstitutionDetailsResponse {
    success: boolean;
    message: string;
    data: InstitutionDetails;
}
