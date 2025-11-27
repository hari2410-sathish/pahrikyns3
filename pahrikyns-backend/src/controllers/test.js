import prisma from "../generated/prisma/index.js";

export const test = async (req, res) => {
  const admins = await prisma.admin.findMany();
  res.json(admins);
};
