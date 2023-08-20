import { Prisma } from "@prisma/client";

export class barang implements Prisma.barangCreateInput{
    id_barang: number;
    nama_barang?: string;
    harga_barang?: number;
    stok_barang?: number;
}

