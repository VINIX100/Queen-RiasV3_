const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUlhYWtyZUMzVVhOZ0pxS0tYV05Ja1R3ZG9FNFhZb1dpRmFUamFoWnJVZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUJrZ2VHQUNkMWRXUEFFWUVaeFBqT3VhS3JaUWQ5UE9HNFlhZVBzbmlTND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTT1lTQWErdjAvVWErdjVKRllsS0M4MzNFMCt5TU1EajkrdWxpS3NoKzJVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXcEUrQkRINGRUUUhSdFgrN3RXRzQ3U3ZPUzZINVZhaGJzMWo2S1Zka0dBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktDazlwOTJtbkUwWUNQcHBLRWlOUi9FY044bkpaTldnb2NBd093cnNOV1k9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9KQmFaMytNWTZVWCtWWXJuWlFEelF4V1dzdkl5T2ZORFJHd2Ireml3WG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT01PWmxYcXB4VFJ2L2R1RWxIZ1VsVlhpZkE5VHNyandab3YyNHF5VlVuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZG5aL3hNQ1lJbnFUYzNvRVU2RnNkZWVBRHFBNnNGSnptQnpqSmIzR0tpMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVrb0RYQWVBYlQ0U3JtQ3lva2kyd2doejQwTFpwVnhtTTI2L2thMDh1Q05RVUpaNmt1dWJXb0MwVEZ1UTN4c1pNWXUxRTFGSnU5ZVpEMmlYc3YxOURRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUwLCJhZHZTZWNyZXRLZXkiOiI5a0pLZWVudDBWRTJRamlYZkx3Mkdqc2xHTUpzTDA4dGdSbzZta1hDUktvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJXQllIMzFCNSIsIm1lIjp7ImlkIjoiMjM0OTEyNTc5MTE4NTo5QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjExNTM2MjgyOTcyMTYyOjlAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPeU84bXNRMmJUTndBWVlCQ0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ2YlZ1eExzN25VUEJqZCtESUc5OEJRWHVjZ0RTVFNKSGo0WXoxbTZOUUN3PSIsImFjY291bnRTaWduYXR1cmUiOiJuMkNJVFozSWhrbnJudDdjdUhqS29qamttZ3IzVGg0MVlzSit1M0hKaU03ay9ER09lVUpOak1TaEZpMlZOUThVNzYxYUxnbWtjdTBRS1VQL2VtTVlBUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiZ05WOFpXSmRBV2tvMVJUbmJKdnp3WUp0USt6QVE4Q1R2ZFphaDB6c0pJT0VrWTh3aDM4T05yL3daUGhpVm9TQ0IzNzFDNnNQdjlRbDBCR3NHUzVlQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTI1NzkxMTg1OjlAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYjIxYnNTN081MUR3WTNmZ3lCdmZBVUY3bklBMGswaVI0K0dNOVp1alVBcyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSUNBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ2MDk4NzkwLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYifQ==",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id/', 
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
