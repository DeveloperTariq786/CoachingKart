
export interface FacultyMember {
    id: string;
    name: string;
    role: string;
    department: string;
    experience: string;
    avatar: string;
    description: string;
}

export const FACULTY_DEPARTMENTS = [
    'All Departments',
    'Science',
    'Mathematics',
    'Humanities',
    'Computer Science',
];

export const MOCK_FACULTY: FacultyMember[] = [
    {
        id: '1',
        name: 'Dr. Aris Thorne',
        role: 'Senior Physics Faculty',
        department: 'Science',
        experience: '12+',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80',
        description: 'Specialist in Quantum Mechanics and Advanced Electromagnetism. Former research fellow with a...',
    },
    {
        id: '2',
        name: 'Sarah Jenkins',
        role: 'Head of Mathematics',
        department: 'Mathematics',
        experience: '8+',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80',
        description: 'Focused on competitive exam preparation and logic development. Author of two...',
    },
    {
        id: '3',
        name: 'Michael Chen',
        role: 'HOD Biology',
        department: 'Science',
        experience: '15+',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
        description: 'Expert in Molecular Biology and Genetics. Known for interactive lab sessions and high success...',
    },
    {
        id: '4',
        name: 'Emma Davis',
        role: 'English Lit. Expert',
        department: 'Humanities',
        experience: '6+',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
        description: 'A specialist in Victorian literature and creative writing. Focuses on enhancing communication skills...',
    },
    {
        id: '5',
        name: 'Dr. Raj Patel',
        role: 'Chemistry Faculty',
        department: 'Science',
        experience: '10+',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
        description: 'Organic Chemistry expert with focus on JEE and NEET preparation. Multiple rank holders...',
    },
    {
        id: '6',
        name: 'Lisa Wang',
        role: 'CS Instructor',
        department: 'Computer Science',
        experience: '5+',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
        description: 'Full-stack developer turned educator. Specializes in Python, Data Structures and Algorithms...',
    },
];
