// import { Prisma } from "@prisma/client";

// export class transaksi implements Prisma.transaksiCreateInput{
//     id_transaksi: number;
//     tanggal?: Prisma.transaksiCreatetanggalInput | Date[] | string[];
//     totalAmount: number;
//     user: Prisma.usersCreateNestedOneWithoutTransaksiInput;
// }

import { Prisma } from "@prisma/client";

export class TransaksiCreateInput implements Prisma.transaksiCreateInput {
  id_transaksi: number;
  tanggal?: Prisma.transaksiCreatetanggalInput | Date[] | string[];
  totalAmount: number;
  user: Prisma.usersCreateNestedOneWithoutTransaksiInput;
}
