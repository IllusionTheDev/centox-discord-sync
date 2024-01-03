import { TriggerEvent } from "./TriggerEvent";

export type WebhookBody = {
    event: keyof typeof TriggerEvent;
    project: {
        id: string;
        name: string;
        slug: string;
        language: string;
        iconUrl: string;
        domain: string;
    },
    metadata: {
        guildId: string;
    }
}