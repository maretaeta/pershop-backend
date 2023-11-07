import { PrismaService } from "src/prisma.service";
import { transaksi } from "@prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { BarangTransaksiDto } from '../auth/dto/transaksi.dto'; 

@Injectable()
export class TransaksiService {
  constructor(private prisma: PrismaService) {}

  async getAllTransaksi(): Promise<transaksi[]> {
    return this.prisma.transaksi.findMany({
      include: {
        barang_transaksi: {
          include: {
            barang: true,
          },
        },
      },
    });
  }

  async getTransaksi(id_transaksi: number): Promise<transaksi | null> {
    return this.prisma.transaksi.findUnique({
      where: { id_transaksi: Number(id_transaksi) },
      include: {
        user: true,
        barang_transaksi: {
          include: {
            barang: true,
          },
        },
      },
    });
  }

      async createTransaction(userId: number, barangTransaksi: BarangTransaksiDto[]) {
      let totalHarga = 0;

      const createPromises = await Promise.all(barangTransaksi.map(async (barangDto) => {
      const barang = await this.prisma.barang.findUnique({
        where: { id_barang: barangDto.id_barang },
      });

      if (!barang) {
        throw new NotFoundException(`Barang with id ${barangDto.id_barang} not found`);
      }

      // harga per barang dengan jumlah tertentu
      const subtotal = barangDto.jumlah_barang * barang.harga_barang;
      totalHarga += subtotal;

      return {
        barang: { connect: { id_barang: barangDto.id_barang } },
        jumlah_barang: barangDto.jumlah_barang,
        subtotal: subtotal,
      };
    }));



    //totalHarga
      const transaksi = await this.prisma.transaksi.create({
        data: {
          userId,
          barang_transaksi: {
            create: createPromises,
          },
          totalHarga: totalHarga,
        },
      });

      // update stock
      await this.prisma.transaksi.update({
        where: { id_transaksi: transaksi.id_transaksi },
        data: { totalHarga: totalHarga },
      });

      for (const barangDto of barangTransaksi) {
        await this.prisma.barang.update({
          where: { id_barang: barangDto.id_barang },
          data: { stok_barang: { decrement: barangDto.jumlah_barang } },
        });
      }

      return transaksi;
    }

  async deleteTransaksi(id_transaksi: number): Promise<transaksi> {
    await this.prisma.barang_transaksi.deleteMany({
        where: { id_transaksi: Number(id_transaksi) },
      });
      return this.prisma.transaksi.delete({
        where: { id_transaksi: Number(id_transaksi) },
      });
    }
}