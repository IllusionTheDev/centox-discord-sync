"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
async function handle(client, guild, event) {
    const user = await guild.members.fetch(event.submission.user.loginProvidersIds.DISCORD);
    if (!user)
        return console.log("\x1b[32mdiscord.js\x1b[0m  User not found");
    let roleId = config_1.FORM_TO_ROLE[event.submission.form.slug];
    if (!roleId)
        return console.log("\x1b[32mdiscord.js\x1b[0m  No role not found for form");
    let role = await guild.roles.fetch(roleId);
    if (!role)
        return console.log("\x1b[32mdiscord.js\x1b[0m  Role not found with id " + roleId);
    if (event.submission.status !== "APPROVED")
        return;
    try {
        await user.roles.add(role, "Application Approved on Centox");
    }
    catch (error) {
        console.log("\x1b[32mdiscord.js\x1b[0m  Error adding role to user");
        console.log(error);
    }
}
exports.default = handle;
//# sourceMappingURL=SubmissionStatusUpdatedEvent.js.map