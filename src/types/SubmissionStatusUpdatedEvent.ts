import { WebhookBody } from "./WebhookBody";

export type SubmissionStatusUpdatedEvent = WebhookBody & {
    submission: {
        id: string;
        status: "PENDING" | "APPROVED" | "REJECTED";
        form: {
            id: string;
            title: string;
            slug: string;
        },
        user: {
            id: string;
            displayName: string;
            name: string;
            avatarUrl: string;
            loginProvidersIds: {
                DISCORD: string;
            }
        }
        createdAt: Date;
    },
}