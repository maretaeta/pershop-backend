import { PrismaService } from "src/prisma.service";
import { transaksi } from "@prisma/client"; 
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransaksiService {
  constructor(private prisma: PrismaService) {}

  async getAllTransaksi(): Promise<transaksi[]> {
    return this.prisma.transaksi.findMany();
  }

  async getTransaksi(id_transaksi: number): Promise<transaksi | null> {
    return this.prisma.transaksi.findUnique({
      where: { id_transaksi: Number(id_transaksi) },
      include: { user: true }, 
    });
  }

  
  async createTransaksi(data: transaksi): Promise<transaksi> {
    return this.prisma.transaksi.create({
      data: {
        id_transaksi: data.id_transaksi,
        tanggal: data.tanggal,
        totalAmount: data.totalAmount,
        user: { connect: { id_users: data.userId } }
      }
    });
  }


  async deleteTransaksi(id_transaksi:number):Promise<transaksi>{
    return this.prisma.transaksi.delete({
        where:{id_transaksi:Number(id_transaksi)}
    })
  }
}
