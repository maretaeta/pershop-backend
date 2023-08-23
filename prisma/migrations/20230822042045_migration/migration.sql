/*
  Warnings:

  - You are about to alter the column `nama_admin` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Char(255)` to `VarChar(225)`.
  - You are about to alter the column `username_admin` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Char(255)` to `VarChar(225)`.
  - You are about to alter the column `role` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Char(255)` to `VarChar(225)`.

*/
-- AlterTable
ALTER TABLE "admin" ALTER COLUMN "nama_admin" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "username_admin" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "password_admin" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "role" SET DATA TYPE VARCHAR(225);

-- AlterTable
CREATE SEQUENCE barang_id_barang_seq;
ALTER TABLE "barang" ALTER COLUMN "id_barang" SET DEFAULT nextval('barang_id_barang_seq'),
ALTER COLUMN "nama_barang" SET DATA TYPE VARCHAR(255);
ALTER SEQUENCE barang_id_barang_seq OWNED BY "barang"."id_barang";

-- AlterTable
ALTER TABLE "kasir" ALTER COLUMN "nama_kasir" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "username_kasir" SET DATA TYPE VARCHAR(225),
ALTER COLUMN "password_kasir" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "role" SET DATA TYPE VARCHAR(225);

-- CreateTable
CREATE TABLE "users" (
    "id_users" SERIAL NOT NULL,
    "nama" VARCHAR(225),
    "username" VARCHAR(225),
    "password" VARCHAR(20),
    "role" VARCHAR(225),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_users")
);
