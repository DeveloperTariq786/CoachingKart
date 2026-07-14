export interface ApplyBatchRequest {
    batchId: string;
}

export interface ApplyBatchResponse {
    success: boolean;
    message: string;
    data?: any;
}
