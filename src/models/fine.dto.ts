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
    newState: "PENDING" | "PAID" | "CANCELLED" | "DISPUTED";
    reason: string;
}

export interface ImportFromAptitudDto {
    plateNumber: string;
    date: string; // YYYY-MM-DD
}