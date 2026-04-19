/**
 * Featured Tuition Interface
 */
export interface FeaturedTuition {
    id: string;
    name: string;
    slug: string;
    location: string;
    rating: number;
    reviewCount: number;
    imageUrl: string;
    desc: string;
    exams: string[];
}

/**
 * Mock Featured Tuitions Data
 */
export const FEATURED_TUITIONS: FeaturedTuition[] = [
    {
        id: "t1",
        name: "Elite Science Academy",
        slug: "elite-science-academy",
        location: "Koramangala, Bangalore",
        rating: 4.8,
        reviewCount: 320,
        imageUrl: "https://picsum.photos/id/11/800/600",
        desc: "Premier science coaching with expert faculty and proven results for competitive exams.",
        exams: ["JEE", "NEET", "CET"]
    },
    {
        id: "t2",
        name: "Progressive Learning Hub",
        slug: "progressive-learning-hub",
        location: "Indiranagar, Bangalore",
        rating: 4.6,
        reviewCount: 156,
        imageUrl: "https://picsum.photos/id/12/800/600",
        desc: "Comprehensive school level coaching focused on conceptual clarity and board exams.",
        exams: ["CBSE", "ICSE", "State Boards"]
    },
    {
        id: "t3",
        name: "Sharma Mathematics Circle",
        slug: "sharma-mathematics-circle",
        location: "Andheri West, Mumbai",
        rating: 4.9,
        reviewCount: 410,
        imageUrl: "https://picsum.photos/id/13/800/600",
        desc: "Specialized mathematics coaching for advanced competitive exams and scholarship tests.",
        exams: ["JEE Advanced", "KVPY", "Math "]
    },
    {
        id: "t4",
        name: "Civil Services Marg",
        slug: "civil-services-marg",
        location: "Mukherjee Nagar, Delhi",
        rating: 4.7,
        reviewCount: 890,
        imageUrl: "https://picsum.photos/id/14/800/600",
        desc: "Comprehensive civil services coaching for aspirants preparing for competitive exams.",
        exams: ["UPSC", "SSC", "States PSC"]
    },
    {
        id: "t5",
        name: "Global Language Institute",
        slug: "global-language-institute",
        location: "Sector 18, Noida",
        rating: 4.5,
        reviewCount: 230,
        imageUrl: "https://picsum.photos/id/15/800/600",
        desc: "Comprehensive language coaching for international exams and proficiency tests.",
        exams: ["IELTS", "TOEFL", "GRE", "GMAT"]
    },
    {
        id: "t6",
        name: "Apex Foundation Academy",
        slug: "apex-foundation-academy",
        location: "Gachibowli, Hyderabad",
        rating: 4.8,
        reviewCount: 180,
        imageUrl: "https://picsum.photos/id/16/800/600",
        desc: "Comprehensive foundation coaching for NTSE, NSO, and IMO exams.",
        exams: ["NTSE", "NSO", "IMO"]
    }
];
