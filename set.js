const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUpEYjhualFwVi9pSnFzYklZU2Fsc2UzQTQvS1BOWDU4LzBEMjBYcVVVYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOCt2QjVaOHcwSzNmTnYvK1hPMFRLaklQanNZemxINVd6c3YxbGlIK2tHND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnTHNQK2Vxdk82b2RlQ1hQMlBKTFRaNEZ2eEtnMmZYOGpySG9zb0ZEbm5NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyQ1JuSEJkNDd0M0xRZWpSQUZsclUzc3Q0UmZmWWNKQzRIdGdSR0Jxa1cwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldMdjlUWXBJdDhRcnphYnV6QmRhTzNXK1hKVGlaMVFVR0VSa0llSjVqRzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxveHA5ZE9TdlNqTkJUNnZET2JsNGpLa25PNUZ1R0xqeFhvQjZkMjJPQkE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0VoK3ByYnJ2blRpb1l4dzk0WExRRnJRWk5UYlNTRjZreXNVRXhWdlRXbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQVk1dDJuT1g5Z1FpWDlpUlFEa05PNXpPS0lFb3U5ZXlRSGNiNnhlZGl6bz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiYnYxdjA0WlNMMGhtNlhCejhhY3dweTE2NGQ3OUFnVDhONjFGNWhEZEhHQTFSNzRCQWZlOXVsVUxneXE5NFE0NTRyUzFqOXRZUytVKzMwZzBVVWhBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg1LCJhZHZTZWNyZXRLZXkiOiJ1aTNReGZkb1NRbnQyc2tQQVFOUjFwMEMwZlhVOGczRGhCT0RjRVQ1REZrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ0cXlaQVRUSlNfU01yelluNHZQWXBRIiwicGhvbmVJZCI6IjFjZDZlYmFiLTYwMDEtNDMwNC04MzdhLTUxOTNiNjE0MjllYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyVkFqZXFLSTBWL0NBd01IZXFucnVmbVBMWXc9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoialA2djdocVlVdVluNkt0SFBFcUUxQlBuWVFVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkZKTEs5TlJMIiwibWUiOnsiaWQiOiIyNTU3NDkyNjM0MzI6MTFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xuUi9Za0JFTU82a2JRR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkJKNEM1YzQwRWUwY0J1bFo2dEg4cmZ3OG9Sb2xwYkhMTHU5WkFVcTBhaGM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlhMajlEUzI1L2xaYmxtdk1DeExBY1FIOWhLTFZHYWs5TVVadnR6N3pOV2lpZjB6a3laQWUyc3NWOUx3czJYNGZDRkt2ZVRHMjR2YnFKaFJwdGZwQ0JRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJqdWRNcnhnSGlQV2QwT0wvazF3NW1mYW1XV0c1ZmpCS2FqSGo4dk1kVUNVN3hTblJYOG1FSlZqVDQyOUJlMXRvK2dDQkNucTJjWTMrYXNGcml2MlFndz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc0OTI2MzQzMjoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRU2VBdVhPTkJIdEhBYnBXZXJSL0szOFBLRWFKYVd4eXk3dldRRkt0R29YIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5OTUwNjcyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9WVCJ9',
    PREFIXE: process.env.PREFIX || "J",
    OWNER_NAME: process.env.OWNER_NAME || "Javan",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'Javan',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/fd124f7e9271111c3bcc1.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
