import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, SetMetadata } from "@nestjs/common";
import { barang } from "./barang.model";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { barangService } from "./barang.service";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/users/users.guard";
import { UserRole } from "@prisma/client";


@Controller('api/v1/barang')
export class BarangController{

    constructor(private readonly barangService: barangService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllBarang():Promise<barang[]>{
        return this.barangService.getAllBarang()
    }

    @Post('create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    async postBarang(@Body() postBarang:barang):Promise<barang>{
        return this.barangService.createBarang(postBarang)
    }

    @Get(':id_barang')
    @UseGuards(JwtAuthGuard)
    async getBarang(@Param('id_barang') id_barang:number):Promise<barang | null>{
        return this.barangService.getBarang(id_barang)
    }

    @Delete(':id_barang')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    async deleteBarang(@Param('id_barang') id_barang:number){
        await this.barangService.deleteBarang(id_barang)
        return "Barang Deleted";
        }

    @Put(':id_barang')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    async updateBarang(@Param('id_barang') id_barang:number,@Body() postBarang: barang):Promise<barang>{
        return this.barangService.updateBarang(id_barang, postBarang)
    }

}

