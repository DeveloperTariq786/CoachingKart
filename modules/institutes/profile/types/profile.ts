export interface Location {
    city: string;
    address: string;
    country: string;
}

export interface Institution {
    id: string;
    name: string;
    logo: string;
    location: Location;
    slug: string;
}

export interface Course {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export interface Program {
    id: string;
    name: string;
}

export interface Batch {
    id: string;
    name: string;
    session: string;
}

export interface Enrollment {
    enrollmentId: string;
    status: 'ACTIVE' | 'COMPLETED' | 'PENDING';
    joinedAt: string;
    batch: Batch;
    program: Program;
    course: Course;
    institution: Institution;
}

export interface StudentProfileData {
    id: string;
    name: string;
    email: string;
    enrolledAt: string;
    enrollments: Enrollment[];
}

export interface StudentProfileResponse {
    success: boolean;
    message: string;
    data: StudentProfileData;
}
