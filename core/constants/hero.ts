/**
 * Hero Carousel Slides Configuration
 */

export interface CarouselSlide {
    id: number;
    title: string;
    subtitle: string;
    imageUrl: string;
    tuitionId?: string;
    buttonText?: string;
}

export const CAROUSEL_SLIDES: CarouselSlide[] = [
    {
        id: 1,
        title: "Elite Science Academy",
        subtitle: "Premier coaching for JEE & NEET in Koramangala. Join the toppers' league today.",
        imageUrl: "https://picsum.photos/id/10/1920/1080",
        tuitionId: "t1",
        buttonText: "View Institute Details"
    },
    {
        id: 2,
        title: "Sharma Mathematics Circle",
        subtitle: "Expert math coaching in Andheri West. Specialized batches for Class 10 & 12 Boards.",
        imageUrl: "https://picsum.photos/id/20/1920/1080",
        tuitionId: "t3",
        buttonText: "Explore Courses"
    },
    {
        id: 3,
        title: "Civil Services Marg",
        subtitle: "Start your UPSC journey with experienced mentors in Mukherjee Nagar. Comprehensive study material included.",
        imageUrl: "https://picsum.photos/id/24/1920/1080",
        tuitionId: "t4",
        buttonText: "Start Preparation"
    }
];

export interface HeroSlide {
    id: number;
    imageUrl: string;
    title?: string;
    subtitle?: string;
}

export const INSTITUTION_HERO_SLIDES: HeroSlide[] = [
    {
        id: 1,
        imageUrl: "https://picsum.photos/id/24/1920/1080",
    },
    {
        id: 2,
        imageUrl: "https://picsum.photos/id/25/1920/1080",
    },
    {
        id: 3,
        imageUrl: "https://picsum.photos/id/26/1920/1080",
    }
];
