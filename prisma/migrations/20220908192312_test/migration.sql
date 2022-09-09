/*
  Warnings:

  - You are about to drop the `Countries` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Countries";

-- CreateTable
CREATE TABLE "countries" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT,
    "local_name" TEXT,
    "continent" TEXT,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);
