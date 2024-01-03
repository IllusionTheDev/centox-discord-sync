import { WebhookBody } from './types/WebhookBody';
require("dotenv").config({ path: `./.env.local`, overwrite: true })
require("dotenv").config();

import express from 'express';
import { Client as DiscordClient, GatewayIntentBits } from 'discord.js';

import handleSubmissionStatusUpdatedEvent from './event-handlers/SubmissionStatusUpdatedEvent';
import handleApplicationSubmittedEvent from './event-handlers/ApplicationSubmittedEvent';
import handleSubmissionCommentedEvent from './event-handlers/SubmissionCommentedEvent';
import handleCommentRepliedEvent from './event-handlers/CommentRepliedEvent';

import type { SubmissionStatusUpdatedEvent } from './types/SubmissionStatusUpdatedEvent';
import type { ApplicationSubmittedEvent } from './types/ApplicationSubmittedEvent';
import type { SubmissionCommentedEvent } from './types/SubmissionCommentedEvent';
import type { CommentRepliedEvent } from './types/CommentRepliedEvent';

const client = new DiscordClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ],
});

client.on('ready', async () => {
    console.log("\x1b[32mdiscord.js\x1b[0m  Client is Ready");
})

const app = express();

app.use(express.json())

app.post('/webhook', async (req, res) => {
    if(!req.headers["x-centox-webhook-secret"]) return res.status(401).send("Unauthorized - no secret provided");
    if(req.headers["x-centox-webhook-secret"] !== process.env.WEBHOOK_SECRET) return res.status(401).send("Unauthorized - invalid secret");

    let data = req.body as WebhookBody;
    console.log("\x1b[32mexpress\x1b[0m     Webhook Received");
    console.log("\x1b[32mexpress\x1b[0m     Webhook Event: " + data.event);
    
    const guild = await client.guilds.fetch(process.env.DISCORD_SERVER_ID as string);
    if(!guild) return res.status(404).send("Guild not found");
    if(!guild.available) return res.status(503).send("Guild not available");
    
    res.status(200).send("OK");

    switch(data.event){
        case "application.submitted":
            await handleApplicationSubmittedEvent(client, guild, data as ApplicationSubmittedEvent);
            break;
        case "submission.commented":
            await handleSubmissionCommentedEvent(client, guild, data as SubmissionCommentedEvent);
            break;
        case "comment.replied":
            await handleCommentRepliedEvent(client, guild, data as CommentRepliedEvent);
            break;
        case "submission.status.updated":
            await handleSubmissionStatusUpdatedEvent(client, guild, data as SubmissionStatusUpdatedEvent);
            break;
        default:
            console.log("\x1b[32mexpress\x1b[0m     Webhook Event: " + data.event + " not handled");
    }
    return;
});

client.login(process.env.DISCORD_BOT_TOKEN)
.then(() => {
    app.listen(process.env.PORT || 9004, () => {
        console.log("\x1b[32mexpress\x1b[0m     Server is online");
    });     
})