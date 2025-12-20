/*
  Warnings:

  - You are about to drop the column `otp` on the `OtpStore` table. All the data in the column will be lost.
  - Added the required column `otpHash` to the `OtpStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OtpStore" DROP COLUMN "otp",
ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "otpHash" TEXT NOT NULL,
ALTER COLUMN "method" SET DEFAULT 'email';

-- CreateIndex
CREATE INDEX "OtpStore_email_idx" ON "OtpStore"("email");
