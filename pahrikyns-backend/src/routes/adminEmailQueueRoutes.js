const router = require("express").Router();
const prisma = require("../config/prismaClient");

router.get("/", async (req, res) => {
  const emails = await prisma.emailQueue.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json({ emails });
});

module.exports = router;
