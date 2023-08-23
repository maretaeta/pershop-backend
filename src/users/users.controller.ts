import { Get, Req, Res } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { UserService } from "./users.service";
import { Request, Response } from 'express';


@Controller('api/v1/users')
export class UserController{
     constructor(private readonly usersService: UserService){}
     
     @Get()
     async getAllUsers(@Req() request: Request, @Res() response: Response):Promise<any>{
        try{
            const result = await this.usersService.getAllUsers();
            return response.status(200).json({
                status: 'Okay',
                message: 'Successfully fetch data',
                result: result
            })
        }catch(error){
            return response.status(500).json({
                status: 'Okay',
                messege: 'Internal Server Error'
            })
        }
     }
}
