import { PrismaService } from "src/prisma.service";
import { barang } from "./barang.model";
import { Injectable } from "@nestjs/common";

@Injectable()
export class barangService {
    constructor(private prisma:PrismaService){};

    async getAllBarang(): Promise<barang[]>{
        return this.prisma.barang.findMany();
    }

    // async getBarang(id_barang:number):Promise<barang | null>{
    //     return this.prisma.barang.findUnique({where: {id_barang:Number(id_barang)}})
        
    // }

    async createBarang(data: barang): Promise<barang>{
        return this.prisma.barang.create({
            data, 
        })
    }
 
    async updateBarang(id_barang: number, data: barang): Promise<barang> {
    return this.prisma.barang.update({
        where: {
            id_barang:Number(id_barang)
        },
        data:{  
            nama_barang: data.nama_barang, 
            harga_barang:data.harga_barang, 
            stok_barang:data.stok_barang,
            image: data.image
            }
        });
    }


    async deleteBarang(id_barang: number): Promise<barang> {
        await this.prisma.barang_transaksi.deleteMany({
            where: { id_barang: Number(id_barang) },
        });

        return this.prisma.barang.delete({
            where: { id_barang: Number(id_barang) },
        });
    }

    async totalBarang(): Promise<number>{
        const totalStock = await this.prisma.barang.aggregate({
            _sum: {stok_barang: true}
        })

        return totalStock._sum.stok_barang || 0
    }

}

