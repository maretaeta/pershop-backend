// import { PrismaService } from "src/prisma.service";
// import { transaksi } from "./transaksi.model";
// import {Injectable} from "@nestjs/common"

// @Injectable()
// export class transaksiService{
//     constructor(private prisma:PrismaService){};

//     async getAllTransaksi(): Promise<transaksi[]>{
//         return this.prisma.transaksi.findMany();
//     }

//     async getTransaksi(id_transaksi:number):Promise<transaksi | null>{
//         return this.prisma.transaksi.findUnique({where: {id_transaksi:Number(id_transaksi)}})
        
//     }
// }