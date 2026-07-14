import apiClient from '@/core/api/axios/client';
import { ApplyBatchRequest, ApplyBatchResponse } from '../types/payment.types';

export const paymentService = {
    applyForBatch: async (data: ApplyBatchRequest): Promise<ApplyBatchResponse> => {
        const response = await apiClient.post<ApplyBatchResponse>('/api/v1/institution/client/students/apply', data);
        return response.data;
    },
};
