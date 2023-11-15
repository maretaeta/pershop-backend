import { Body, Controller, Get, Param, UseGuards, Post, Delete, SetMetadata } from "@nestjs/common";
import { UserRole, transaksi } from "@prisma/client";
import { TransaksiService } from "./transaksi.service";
import { JwtAuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "src/users/users.guard";
import { ApiTags, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger/dist/decorators";
import { CreateTransaksiDto } from '../auth/dto/transaksi.dto'; 

@ApiTags('Transaksi')
@Controller('api/v1/transaksi')
    export class TransaksiController {
    constructor(private readonly transaksiService: TransaksiService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.KASIR])
  @ApiResponse({
    status: 200,
    description: 'All Data Transaksi'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error'
  })
  async getAllTransaksi(): Promise<transaksi[]> {
    return this.transaksiService.getAllTransaksi();
  }

    @Post('create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.KASIR])
    @ApiBody({ type: CreateTransaksiDto }) 
    @ApiResponse({
        status: 200,
        description: 'Successfully Create Transaksi'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal Server Error'
    })
    async createTransaction(@Body() data: CreateTransaksiDto) {
        const userId = data.userId;
        const barangTransaksi = data.barangTransaksi;
        return this.transaksiService.createTransaction(userId, barangTransaksi);
    }


    @Delete(':id_transaksi')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiParam({
        name: 'id_transaksi',
        type: 'integer',
        required: true
    })
    @ApiResponse({
        status: 200,
        description: 'Successfuly Deleted Transaksi'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async deleteTransaksi(@Param('id_transaksi') id_transaksi: number) {
        await this.transaksiService.deleteTransaksi(id_transaksi);
        return "Transaksi deleted";
    }

    // total pendapatan
    @Get('total-value')
    async getTotalTransactionValue(): Promise<{total: number}> {
        const total = await this.transaksiService.getTotalTransactionValue()
        return{total}
    }
}

