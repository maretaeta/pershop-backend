-- CreateTable
CREATE TABLE "admin" (
    "id_admin" INTEGER NOT NULL,
    "nama_admin" CHAR(255),
    "username_admin" CHAR(255),
    "password_admin" CHAR(10),
    "role" CHAR(255),

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateTable
CREATE TABLE "barang" (
    "id_barang" INTEGER NOT NULL,
    "nama_barang" CHAR(255),
    "harga_barang" INTEGER,
    "stok_barang" INTEGER,

    CONSTRAINT "barang_pkey" PRIMARY KEY ("id_barang")
);

-- CreateTable
CREATE TABLE "kasir" (
    "id_kasir" INTEGER NOT NULL,
    "nama_kasir" CHAR(225),
    "username_kasir" CHAR(225),
    "password_kasir" CHAR(10),
    "role" CHAR(225),

    CONSTRAINT "kasir_pkey" PRIMARY KEY ("id_kasir")
);

-- CreateTable
CREATE TABLE "transaksi" (
    "id_transaksi" INTEGER NOT NULL,
    "tanggal" TIMESTAMP[],
    "id_kasir" INTEGER,

    CONSTRAINT "transaks_pkey" PRIMARY KEY ("id_transaksi")
);
