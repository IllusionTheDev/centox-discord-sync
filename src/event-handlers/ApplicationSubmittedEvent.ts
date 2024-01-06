import { ApplicationSubmittedEvent } from "../types/ApplicationSubmittedEvent";
import { Client, Guild } from "discord.js";
 
export default async function handle(client: Client, guild: Guild, event: ApplicationSubmittedEvent){

    // This event is not handled
}