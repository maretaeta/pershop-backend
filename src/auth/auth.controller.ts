import { Post, Controller, Req, Res,Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { loginDto } from "./dto/login-user.dto";
import { Request, Response } from 'express';
import { RegisterUserDto } from "./dto/register-user.dto";



@Controller('api/v1/auth')
export class AuthController{

    constructor(private readonly authService:AuthService){}

    @Post('login')
    async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: loginDto): Promise<any> {
        try {
            const result = await this.authService.
            login(loginDto);
            
                return response.status(200).json({
                    status: 'Okay',
                    message: 'Successfully Login',
                    result: result

                })
        }catch(err){
            return response.status(500).json({
                status:'Error',
                message: 'Internal Service Error',
                error: err.message, 
            })

        }
    }


    @Post('register')
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUserDto):Promise<any>{
        try{
            const result = await this.authService.register(registerDto);
            return response.status(200).json({
                status: 'Okay',
                message: 'Successfully register',
                result: result

            })
        }catch(err){
            return response.status(500).json({
                status:'Error',
                message: 'Internal Service Error',
            })

        }
    }

}