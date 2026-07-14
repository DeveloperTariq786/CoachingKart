import { lectureService } from '../services/lecture.service';
import { BatchSubjectsResponse } from '../types/lecture.types';

type BatchSubjectsData = BatchSubjectsResponse['data'];

export type BatchAccessResult =
    | { ok: true; data: BatchSubjectsData }
    | { ok: false; message: string; status?: number; errorCode?: string; action?: string };

export async function verifyBatchAccess(batchId: string): Promise<BatchAccessResult> {
    try {
        const data = await lectureService.getBatchSubjects(batchId);
        return { ok: true, data };
    } catch (err: unknown) {
        const error = err as { response?: { status?: number; data?: { message?: string; errorCode?: string; action?: string } } };

        if (error?.response?.status === 403 || error?.response?.status === 401) {
            return {
                ok: false,
                status: error.response?.status,
                errorCode: error.response?.data?.errorCode,
                action: error.response?.data?.action,
                message: error.response?.data?.message || 'You do not have access to this batch',
            };
        }

        return {
            ok: false,
            message: 'Something went wrong. Please try again.',
        };
    }
}
