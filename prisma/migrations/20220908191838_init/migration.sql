-- CreateTable
CREATE TABLE "Countries" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "iso2" TEXT NOT NULL,
    "iso3" TEXT,
    "local_name" TEXT,
    "continent" TEXT,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);
