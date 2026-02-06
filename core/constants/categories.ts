/**
 * Tuition Category Interface
 */
export interface Category {
    id: string;
    name: string;
    count: string;
    iconName: string;
}

/**
 * Mock Categories Data
 */
export const CATEGORIES: Category[] = [
    {
        id: "1",
        name: "JEE / Engineering",
        count: "150+ Centers",
        iconName: "Binary",
    },
    {
        id: "2",
        name: "NEET / Medical",
        count: "120+ Centers",
        iconName: "Stethoscope",
    },
    {
        id: "3",
        name: "UPSC / Civil Services",
        count: "80+ Centers",
        iconName: "FileText",
    },
    {
        id: "4",
        name: "Foundation (8-10)",
        count: "200+ Centers",
        iconName: "BookOpen",
    },
    {
        id: "5",
        name: "CBSE Boards",
        count: "300+ Centers",
        iconName: "GraduationCap",
    },
    {
        id: "6",
        name: "ICSE Boards",
        count: "100+ Centers",
        iconName: "School",
    },
    {
        id: "7",
        name: "Commerce",
        count: "90+ Centers",
        iconName: "TrendingUp",
    },
    {
        id: "8",
        name: "Study Abroad",
        count: "50+ Centers",
        iconName: "Globe",
    },
    {
        id: "9",
        name: "JEE / Engineering",
        count: "50+ Centers",
        iconName: "Binary",
    }
];
