// Data Transfer Objects for API requests/responses

export interface RegisterFineDto {
    plateNumber: string;
    // evidenceFile: Express.Multer.File; // Handled by multer directly in controller
    location: string;
    infractionType: string;
    cost: number;
    ownerIdentifier: string;
    externalSystemId?: string;
}

export interface UpdateFineStatusDto {
    newState: number; // 0: PENDING, 1: PAID, 2: APPEALED, 3: RESOLVED_APPEAL, 4: CANCELLED
    reason: string;
}

export interface ImportFromAptitudDto {
    plateNumber: string;
    date: string; // YYYY-MM-DD
}