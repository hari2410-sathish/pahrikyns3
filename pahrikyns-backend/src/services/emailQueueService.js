const prisma = require("../config/prismaClient");
const sendEmail = require("../config/email");

const MAX_RETRY = 5;

async function queueEmail({ to, subject, body, attachment }) {
  return prisma.emailQueue.create({
    data: { to, subject, body, attachment },
  });
}

async function processEmailQueue() {
  const pending = await prisma.emailQueue.findMany({
    where: {
      status: "PENDING",
      attempts: { lt: MAX_RETRY },
    },
    take: 10,
  });

  for (const mail of pending) {
    try {
      await sendEmail({
        to: mail.to,
        subject: mail.subject,
        text: mail.body,
        attachments: mail.attachment
          ? [{ filename: "invoice.pdf", path: mail.attachment }]
          : [],
      });

      await prisma.emailQueue.update({
        where: { id: mail.id },
        data: { status: "SENT" },
      });
    } catch (err) {
      await prisma.emailQueue.update({
        where: { id: mail.id },
        data: {
          attempts: { increment: 1 },
          lastError: err.message,
          status: "PENDING",
        },
      });
    }
  }
}

module.exports = {
  queueEmail,
  processEmailQueue,
};
