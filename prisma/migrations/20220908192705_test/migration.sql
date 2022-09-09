-- AlterTable
CREATE SEQUENCE "countries_id_seq";
ALTER TABLE "countries" ALTER COLUMN "id" SET DEFAULT nextval('countries_id_seq');
ALTER SEQUENCE "countries_id_seq" OWNED BY "countries"."id";
