-- AlterTable
ALTER TABLE "audit_log" ADD COLUMN     "client_ip" VARCHAR(45),
ADD COLUMN     "user_agent" VARCHAR(255);
