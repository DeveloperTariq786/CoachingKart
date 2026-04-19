export interface InstitutionHomeStats {
    institutionId: string;
    totalEnrolledStudents: number;
    totalFacultyExperience: number;
    successRate: string;
}

export interface InstitutionHomeStatsResponse {
    success: boolean;
    data: InstitutionHomeStats;
}
