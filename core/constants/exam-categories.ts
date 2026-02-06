/**
 * Exam Categories Interface
 */
export interface ExamCategory {
    id: string;
    title: string;
    tags: string[];
    icon: string;
    color: string; // Background accent color for the icon container
}

/**
 * Mock Exam Categories Data
 */
export const EXAM_CATEGORIES: ExamCategory[] = [
    {
        id: 'neet',
        title: 'NEET',
        tags: ['Class 11', 'Class 12', 'Dropper'],
        icon: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png', // Medical icon placeholder
        color: 'bg-rose-50',
    },
    {
        id: 'iit-jee',
        title: 'IIT JEE',
        tags: ['Class 11', 'Class 12', 'Dropper'],
        icon: 'https://cdn-icons-png.flaticon.com/512/2000/2000216.png', // Atom/Science icon
        color: 'bg-orange-50',
    },
    {
        id: 'pre-foundation',
        title: 'Pre Foundation',
        tags: ['Class 8', 'Class 9', 'Class 10'],
        icon: 'https://cdn-icons-png.flaticon.com/512/2997/2997274.png', // School bag icon
        color: 'bg-yellow-50',
    },
    {
        id: 'school-boards',
        title: 'School Boards',
        tags: ['CBSE', 'ICSE', 'UP Board', 'Maharashtra Board'],
        icon: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png', // Books icon
        color: 'bg-blue-50',
    },
    {
        id: 'upsc',
        title: 'UPSC',
        tags: ['Prelims', 'Mains', 'Interview'],
        icon: 'https://cdn-icons-png.flaticon.com/512/9319/9319266.png', // Government building/People
        color: 'bg-sky-50',
    },
    {
        id: 'govt-exams',
        title: 'Govt Job Exams',
        tags: ['SSC', 'Banking', 'Teaching', 'Judiciary'],
        icon: 'https://cdn-icons-png.flaticon.com/512/2451/2451290.png', // Government icon
        color: 'bg-slate-50',
    },
];
