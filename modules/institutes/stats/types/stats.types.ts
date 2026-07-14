export interface InstitutionHomeStats {
    institutionId: string;
    totalEnrolledStudents: number;
    totalFacultyExperience: number;
    successRate: string;
    coursesOffered: number;
}

export interface InstitutionHomeStatsResponse {
    success: boolean;
    data: InstitutionHomeStats;
}
