import { Post, Controller, Req, Res, Body, Param, Put, UseGuards, BadRequestException } from "@nestjs/common";
import { AuthService } from "./auth.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loginDto } from "./dto/login-user.dto";
import { Request, Response } from 'express';
import { RegisterUserDto } from "./dto/register-user.dto";
import { ApiTags, ApiBody, ApiResponse } from "@nestjs/swagger/dist/decorators";
import { UserService } from "src/users/users.service"; 
import { JwtAuthGuard } from "./auth.guard";

@ApiTags('User')
@Controller('api/v1/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UserService, 
    ) {}

    @Post('login')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'gege',
                },
                password: {
                    type: 'string',
                    example: 'gege123'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully Login'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: loginDto): Promise<any> {
        try {
            const result = await this.authService.login(loginDto);
            return response.status(200).json({
                status: 'Okay',
                message: 'Successfully Login',
                result: result
            });
        } catch (err) {
            return response.status(500).json({
                status: 'Error',
                message: 'Internal Service Error',
                error: err.message,
            });
        }
    }

    @Post('register')
    // @UsePipes(new ValidationPipe({ transform: true }))
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                nama: {
                    type: 'string',
                    example: 'gege',
                },
                username: {
                    type: 'string',
                    example: 'gege',
                },
                password: {
                    type: 'string',
                    example: 'gege123'
                },
                role: {
                    type: 'enum',
                    example: 'KASIR'
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Successfully Register'
    })
    @ApiResponse({
        status: 500,
        description: 'Internal server error'
    })
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUserDto): Promise<any> {
        try {
            const result = await this.authService.register(registerDto);
            return response.status(200).json({
                status: 'Okay',
                message: 'Successfully register',
                result: result
            });
        } catch (err) {
            return response.status(500).json({
                status: 'Error',
                message: 'Internal Service Error',
            });
        }
    }

    @Put(':id_users/password')
    @UseGuards(JwtAuthGuard) 
    async updatePassword(
        @Param('id_users') userId: number,
        @Body('newPassword') newPassword: string
    ): Promise<any> {
        try {
            if (!newPassword) {
                throw new BadRequestException('New password is required');
            }

        const updatedUser = await this.authService.updateUserPassword(userId, newPassword);
        return {
            status: 'Okay',
            message: 'User password updated successfully',
            data: updatedUser,
        };
    } catch (error) {
        return {
            status: 'Error',
            message: 'Failed to update user password',
            error: error.message,
        };
    }
}

}