import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { barang } from "./barang.model";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { barangService } from "./barang.service";


@Controller('api/v1/barang')
export class BarangController{

    constructor(private readonly barangService: barangService){}

    @Get()
    async getAllBarang():Promise<barang[]>{
        return this.barangService.getAllBarang()
    }

    @Post('create')
    async postBarang(@Body() postBarang:barang):Promise<barang>{
        return this.barangService.createBarang(postBarang)
    }

    @Get(':id_barang')
    async getBarang(@Param('id_barang') id_barang:number):Promise<barang | null>{
        return this.barangService.getBarang(id_barang)
    }

    // @Delete(':id_barang')
    // async deleteBarang(@Param('id_barang') id_barang:number):Promise<barang | null>{
    //     return this.barangService.deleteBarang(id_barang)
    // }

    @Delete(':id_barang')
    async deleteBarang(@Param('id_barang') id_barang:number){
        await this.barangService.deleteBarang(id_barang)
        return "barang deleted";
        }

    @Put(':id_barang')
    async updateBarang(@Param('id_barang') id_barang:number,@Body() postBarang: barang):Promise<barang>{
        return this.barangService.updateBarang(id_barang, postBarang)
    }

}

