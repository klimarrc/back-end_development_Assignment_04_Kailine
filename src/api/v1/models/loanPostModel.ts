export type PostStatus = "pending" | "under_review" | "flagged";


export interface Loan {
    id: string;
    applicant: string;
    amount: number;
    status: PostStatus;
    createdAt: Date;
}

