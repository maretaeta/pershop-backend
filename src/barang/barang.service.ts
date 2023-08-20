import { PrismaService } from "src/prisma.service";
import { barang } from "./barang.model";

export class barangService {
    constructor(private prisma:PrismaService){};

    async getAllbarang(): Promise<barang[]>{
        return this.prisma.barang.findMany();
    }

    async getbarang(id_barang:number):Promise<barang | null>{
        return this.prisma.barang.findUnique({where: {id_barang:Number(id_barang)}})
        
    }

    async createbarang(data: barang): Promise<barang>{
        return this.prisma.barang.create({
            data, 
        })
    }

    async updatebarang(id_barang:number, data:barang):Promise<barang>{
        return this.prisma.barang.update({
            where: {id_barang:Number(id_barang)},
            data:{nama_barang: data.nama_barang, harga_barang:data.harga_barang, stok_barang:data.stok_barang}
        })
    }


    async deletebarang(id_barang:number):Promise<barang>{
        return this.prisma.barang.delete({
            where:{id_barang:Number(id_barang)},
       
        })
    }
}

