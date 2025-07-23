    export interface CourtRequest {
        name: string;
        type: string;
        dimensions: string;
        pricing: number;
        images: string[];
    }

    export interface CourtResponse {
        id: string;
        name: string;
        type: string;
        dimensions: string;
        pricing: number;
        images: string[];
        createdAt: string;
        updatedAt: string;
    }