/**
 * Institution Center Interface
 */
export interface InstitutionCenter {
    id: string;
    cityName: string;
    imageUrl: string;
}

/**
 * Mock Institution Centers Data
 */
export const INSTITUTION_CENTERS: InstitutionCenter[] = [
    {
        id: 'kota',
        cityName: 'Kota',
        imageUrl: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&q=80',
    },
    {
        id: 'bareilly',
        cityName: 'Bareilly',
        imageUrl: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&q=80',
    },
    {
        id: 'patna',
        cityName: 'Patna',
        imageUrl: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&q=80',
    },
    {
        id: 'noida',
        cityName: 'Noida',
        imageUrl: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&q=80',
    },
    {
        id: 'new-delhi',
        cityName: 'New Delhi',
        imageUrl: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&q=80',
    },
    {
        id: 'kolkata',
        cityName: 'Kolkata',
        imageUrl: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&q=80',
    },
    {
        id: 'ahmedabad',
        cityName: 'Ahmedabad',
        imageUrl: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&q=80',
    },
    {
        id: 'jaipur',
        cityName: 'Jaipur',
        imageUrl: 'https://images.unsplash.com/photo-1519922639192-e73293ca430e?auto=format&fit=crop&q=80',
    },
];
