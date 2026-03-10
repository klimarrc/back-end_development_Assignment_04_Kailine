export type EventStatus = "pending" | "under_review" | "flagged";


export interface events {
    id: string;
    applicant: string;
    amount: number;
    status: EventStatus;
    createdAt: Date;
}

