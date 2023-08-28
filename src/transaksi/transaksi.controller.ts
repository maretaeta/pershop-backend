import { Body, Controller, Get, Param, UseGuards, Post, Delete, SetMetadata } from "@nestjs/common";
import { UserRole, transaksi } from "@prisma/client";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TransaksiService } from "./transaksi.service"
import {JwtAuthGuard} from  "../auth/auth.guard";
import { RolesGuard } from "src/users/users.guard";



@Controller('api/v1/transaksi')
export class TransaksiController{
    constructor(private readonly TransaksiService: TransaksiService){}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    async getAllTransaksi():Promise<transaksi[]>{
        return this.TransaksiService.getAllTransaksi()
    }

    @Get(':id_transaksi')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    async getTransaksi(@Param('id_transaksi') id_transaksi:number):Promise<transaksi | null>{
        return this.TransaksiService.getTransaksi(id_transaksi)
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
    async postTransaksi(@Body() postTransaksi:transaksi):Promise<transaksi>{
        return this.TransaksiService.createTransaksi(postTransaksi)
    }

    @Delete(':id_transaksi')
    @UseGuards(JwtAuthGuard)
    async deleteTransaksi(@Param('id_transaksi') id_transaksi:number){
        await this.TransaksiService.deleteTransaksi(id_transaksi)
        return "Transaksi deleted";
    }
    
}
