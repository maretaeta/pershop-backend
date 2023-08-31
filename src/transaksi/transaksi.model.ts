import { Prisma } from "@prisma/client";

export class TransaksiCreateInput implements Prisma.transaksiCreateInput {
  id_transaksi: number;
  totalHarga: number;
  user: Prisma.usersCreateNestedOneWithoutTransaksiInput;
}

