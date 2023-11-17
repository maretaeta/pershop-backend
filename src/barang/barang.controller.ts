import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, SetMetadata } from "@nestjs/common";
import { barang } from "./barang.model";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { barangService } from "./barang.service";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/users/users.guard";
import { UserRole } from "@prisma/client";
import { ApiTags, ApiResponse, ApiBody, ApiParam } from "@nestjs/swagger/dist/decorators";

@ApiTags('Barang')
@Controller('api/v1/barang')
export class BarangController{

    constructor(private readonly barangService: barangService){}

    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN, UserRole.KASIR])
    @ApiResponse({
        status: 200,
        description:'All data Barang'
    })

    @ApiResponse({
        status: 500,
        description:'Internal server error'
    })
    async getAllBarang():Promise<barang[]>{
        return this.barangService.getAllBarang()
    }



    @Post('create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN, UserRole.KASIR])
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nama_barang: {
                    type: 'string',
                    example: 'Wishkas',
                },
                harga_barang: {
                    type: 'number',
                    example: '12000'
                },
                stok_barang:{
                    type: 'number',
                    example: '12'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description:'Successfully Create Barang'
    })

     @ApiResponse({
        status: 500,
        description:'Internal Server Error'
    })
    async postBarang(@Body() postBarang:barang):Promise<barang>{
        return this.barangService.createBarang(postBarang)
    }


    @Delete(':id_barang')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiParam({
        name: 'id_barang',
        type: 'integer',
        required: true
    })
    @ApiResponse({
        status: 200,
        description:'Successfully Deleted Barang'
    })

     @ApiResponse({
        status: 500,
        description:'Internal Server Error'
    })
    async deleteBarang(@Param('id_barang') id_barang:number){
        await this.barangService.deleteBarang(id_barang)
        return "Barang Deleted";
    }


    @Put(':id_barang')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN, UserRole.KASIR])
    @ApiParam({
        name: 'id_barang',
        type: 'integer',
        required: true
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nama_barang: {
                    type: 'string',
                    example: 'Wishkas',
                },
                harga_barang: {
                    type: 'number',
                    example: '12000'
                },
                stok_barang:{
                    type: 'number',
                    example: '12'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description:'Successfully Update Barang'
    })

     @ApiResponse({
        status: 500,
        description:'Internal Server Error'
    })
    async updateBarang(@Param('id_barang') id_barang:number,@Body() postBarang: barang):Promise<barang>{
        return this.barangService.updateBarang(id_barang, postBarang)
    }

    @Get('totalBarang')
    @UseGuards(JwtAuthGuard)
    @ApiResponse({
        status: 200,
        description:'All Data Stok Barang'
    })

    @ApiResponse({
        status: 500,
        description:'Internal server error'
    })
    async SumtotalBarang():Promise<{total: number}>{
        const total = await this.barangService.totalBarang()
        return {total}
    }


}

