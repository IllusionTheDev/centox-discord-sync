import { WebhookBody } from "./WebhookBody";

export type ApplicationSubmittedEvent = WebhookBody & {
    submission: {
        id: string;
        form: {
            id: string;
            title: string;
            slug: string;
        },
        answers: {
            fieldId: string;
            fieldName: string;
            value: string;
        }[],
        createdAt: Date;
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
}