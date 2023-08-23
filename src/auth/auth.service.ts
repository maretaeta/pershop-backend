import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { loginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt"
import { RegisterUserDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UserService){}

    async login(loginDto: loginDto):Promise<any>{
        const {username, password} = loginDto;

       const users = await this.prismaService.users.findFirst({
            where: { username }
        });


        if(!users){
            throw new NotFoundException('user not found')
        }

         const validatePassword = await bcrypt.compare(password, users.password);

        if (!validatePassword) {
            throw new NotFoundException('Invalid Password');
        }

        const token = this.jwtService.sign({ username }, { expiresIn: '1h' });

        return {
            users,
            token
        };
    }

    async register(createDto: RegisterUserDto): Promise<any> {
        const createUsers = new Users();
        createUsers.nama = createDto.nama;
        createUsers.username = createDto.username;
        createUsers.password = await bcrypt.hash(createDto.password, 10);

        const user = await this.usersService.createUser(createUsers);

        return {
            user
        };
    }
}