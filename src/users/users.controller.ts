import { Get, SetMetadata, UseGuards, Post, Param, Put, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { UserRole } from '@prisma/client';
import { RolesGuard } from './users.guard';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ApiTags, ApiResponse } from '@nestjs/swagger/dist';
import { FileInterceptor } from '@nestjs/platform-express';
import { Users } from './users.model';



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

    @Put(':userId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiResponse({
        status: 200,
        description: 'Update user data',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateUser(@Param('userId') userId: number, @Body() data: Partial<Users>): Promise<any> {
        try {
            const updatedUser = await this.usersService.updateUser(userId, data);
            return {
                status: 'Okay',
                message: 'User data updated successfully',
                data: updatedUser,
            };
        } catch (error) {
            return {
                status: 'Error',
                message: 'Internal Server Error',
                error: error.message,
            };
        }
    }

    @Post(':userId/profile-image')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @SetMetadata('roles', [UserRole.ADMIN])
    @ApiResponse({
        status: 201,
        description: 'Update user profile image',
    })
    @ApiResponse({
        status: 403,
        description: 'Forbidden',
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error',
    })
    @UseInterceptors(FileInterceptor('image'))
    async updateUserProfileImage(@Param('userId') userId: number, @UploadedFile() image: any): Promise<any> {
        try {
            const imageUrl = await this.usersService.updateUserProfile(userId, image.filename); 
            return {
                status: 'Okay',
                message: 'User profile image updated successfully',
                imageUrl,
            };
        } catch (error) {
            return {
                status: 'Error',
                message: 'Internal Server Error',
                error: error.message,
            };
        }
    }

}

