import { Get, SetMetadata, UseGuards } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UserService } from "./users.service";
// import { Request, Response } from 'express';
import { UserRole } from "@prisma/client";
import { RolesGuard  } from "./users.guard";
import { JwtAuthGuard } from "src/auth/auth.guard";
import { ApiTags, ApiResponse } from "@nestjs/swagger/dist";
// import { ApiOperation } from "@nestjs/swagger/dist";

@ApiTags('User')
@Controller('api/v1/users')
export class UserController{
     constructor(private readonly usersService: UserService){}
     
    @Get()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN]) 

    @ApiResponse({
        status: 200,
        description:'All data Users'
    })

    @ApiResponse({
        status: 403,
        description:'Forbidden'
    })

     @ApiResponse({
        status: 500,
        description:'Internal server error'
    })

    async getAllUsers(): Promise<any> {
        try {
            const result = await this.usersService.getAllUsers();
            return {
                status: 'Okay',
                message: 'Successfully fetch data',
                data: result,
            };
        } catch (error) {
            return {
                status: 'Error',
                messege: 'Internal Server Error',
                error: error.message,
            };
        }
    }
}

