"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config({ path: `./.env.local`, overwrite: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const discord_js_1 = require("discord.js");
const SubmissionStatusUpdatedEvent_1 = __importDefault(require("./event-handlers/SubmissionStatusUpdatedEvent"));
const ApplicationSubmittedEvent_1 = __importDefault(require("./event-handlers/ApplicationSubmittedEvent"));
const SubmissionCommentedEvent_1 = __importDefault(require("./event-handlers/SubmissionCommentedEvent"));
const CommentRepliedEvent_1 = __importDefault(require("./event-handlers/CommentRepliedEvent"));
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMembers,
    ],
});
client.on('ready', async () => {
    console.log("\x1b[32mdiscord.js\x1b[0m  Client is Ready");
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/webhook', async (req, res) => {
    if (!req.headers["x-centox-webhook-secret"])
        return res.status(401).send("Unauthorized - no secret provided");
    if (req.headers["x-centox-webhook-secret"] !== process.env.WEBHOOK_SECRET)
        return res.status(401).send("Unauthorized - invalid secret");
    let data = req.body;
    console.log("\x1b[32mexpress\x1b[0m     Webhook Received");
    console.log("\x1b[32mexpress\x1b[0m     Webhook Event: " + data.event);
    const guild = await client.guilds.fetch(process.env.DISCORD_SERVER_ID);
    if (!guild)
        return res.status(404).send("Guild not found");
    if (!guild.available)
        return res.status(503).send("Guild not available");
    res.status(200).send("OK");
    switch (data.event) {
        case "application.submitted":
            await (0, ApplicationSubmittedEvent_1.default)(client, guild, data);
            break;
        case "submission.commented":
            await (0, SubmissionCommentedEvent_1.default)(client, guild, data);
            break;
        case "comment.replied":
            await (0, CommentRepliedEvent_1.default)(client, guild, data);
            break;
        case "submission.status.updated":
            await (0, SubmissionStatusUpdatedEvent_1.default)(client, guild, data);
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
});
//# sourceMappingURL=index.js.map