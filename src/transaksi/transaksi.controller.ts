// import { Body, Controller, Get, Param, UseGuards, Post, Delete, SetMetadata } from "@nestjs/common";
// import { UserRole, transaksi } from "@prisma/client";
// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { TransaksiService } from "./transaksi.service"
// import {JwtAuthGuard} from  "../auth/auth.guard";
// import { RolesGuard } from "src/users/users.guard";
// import { ApiTags, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger/dist/decorators";
// import { CreateTransactionDto } from '../auth/dto/transaksi.dto';


// @ApiTags('Transaksi')
// @Controller('api/v1/transaksi')
// export class TransaksiController{
//     constructor(private readonly TransaksiService: TransaksiService){}

//     @Get()
//     @UseGuards(JwtAuthGuard, RolesGuard)
//     @SetMetadata('roles', [UserRole.ADMIN])
//     @ApiResponse({
//         status: 200,
//         description:'All Data Transaksi'
//     })

//     @ApiResponse({
//         status: 500,
//         description:'Internal server error'
//     })
//     async getAllTransaksi():Promise<transaksi[]>{
//         return this.TransaksiService.getAllTransaksi()
//     }



//     @Get(':id_transaksi')
//     @UseGuards(JwtAuthGuard, RolesGuard)
//     @SetMetadata('roles', [UserRole.ADMIN])
//      @ApiParam({
//         name: 'id_transaksi',
//         type: 'integer',
//         required: true
//     })
//     @ApiResponse({
//         status: 200,
//         description:'Data Transaksi By ID'
//     })

//     @ApiResponse({
//         status: 500,
//         description:'Internal server error'
//     })
//     async getTransaksi(@Param('id_transaksi') id_transaksi:number):Promise<transaksi | null>{
//         return this.TransaksiService.getTransaksi(id_transaksi)
//     }



//     @Post('create')
//     @UseGuards(JwtAuthGuard)
//     @ApiBody({
//         schema: {
//             type: 'object',
//             properties: {
//                 tanggal: {
//                     type: 'date time',
//                     example: '2023-08-28T10:44:43.000Z',
//                 },
//                 totalAmount:{
//                     type: 'integer',
//                     example: '120000'
//                 },
//                 userId:{
//                     type: 'integer',
//                     example: '1'
//                 }
//             }
//         }
//     })
//     @ApiResponse({
//         status: 200,
//         description:'Successfully Create Transaksi'
//     })

//      @ApiResponse({
//         status: 500,
//         description:'Internal Server Error'
//     })
//     // async postTransaksi(@Body() postTransaksi:transaksi):Promise<transaksi>{
//     //     return this.TransaksiService.createTransaksi(postTransaksi)
//     // }
// //     @Post()
// //   async createTransaction(@Body() data: CreateTransactionDto) {
// //     return this.TransaksiService.createTransaction(data);
// //   }
    
//     async createTransaction(@Body() data: CreateTransactionDto) {
//         const userId = data.userId;
//         return this.TransaksiService.createTransaction(userId, data.barangTransaksi);
//     }



//     @Delete(':id_transaksi')
//     @UseGuards(JwtAuthGuard)
//      @ApiParam({
//         name: 'id_transaksi',
//         type: 'integer',
//         required: true
//     })
//     @ApiResponse({
//         status: 200,
//         description:'Successfuly Deleted Transaksi'
//     })

//     @ApiResponse({
//         status: 500,
//         description:'Internal server error'
//     })
//     async deleteTransaksi(@Param('id_transaksi') id_transaksi:number){
//         await this.TransaksiService.deleteTransaksi(id_transaksi)
//         return "Transaksi deleted";
//     }
    
// }

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
  @SetMetadata('roles', [UserRole.ADMIN])
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

    @Get(':id_transaksi')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiParam({
        name: 'id_transaksi',
        type: 'integer',
        required: true
    })
    @ApiResponse({
        status: 200,
        description: 'Data Transaksi By ID'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async getTransaksi(@Param('id_transaksi') id_transaksi: number): Promise<transaksi | null> {
        return this.transaksiService.getTransaksi(id_transaksi);
    }

    @Post('create')
    @UseGuards(JwtAuthGuard)
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
    @UseGuards(JwtAuthGuard)
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
    }

