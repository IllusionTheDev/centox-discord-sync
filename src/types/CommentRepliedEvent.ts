import { WebhookBody } from "./WebhookBody";

export type CommentRepliedEvent = WebhookBody & {
    comment: {
        id: string;
        content: string;
        user: {
            id: string;
            displayName: string;
            name: string;
            avatarUrl: string;
            loginProvidersIds: {
                DISCORD: string;
            }
        },
        parentComment: {
            id: string;
            content: string;
            user: {
                id: string;
                displayName: string;
                name: string;
                avatarUrl: string;
                loginProvidersIds: {
                    DISCORD: string;
                }
            },
            createdAt: Date;
        },
        createdAt: Date;
    },
    submission: {
        id: string;
        status: "PENDING" | "APPROVED" | "REJECTED";
        user: {
            id: string;
            displayName: string;
            name: string;
            avatarUrl: string;
            loginProviderIds: {
                DISCORD: string;
            }
        },
        form: {
            id: string;
            title: string;
            slug: string;
        },
        createdAt: Date;
    }
}