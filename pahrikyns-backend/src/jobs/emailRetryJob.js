const cron = require("node-cron");
const { processEmailQueue } = require("../services/emailQueueService");

function startEmailRetryJob() {
  cron.schedule("*/5 * * * *", async () => {
    console.log("🔁 Running Email Retry Queue...");
    await processEmailQueue();
  });
}

module.exports = startEmailRetryJob;
