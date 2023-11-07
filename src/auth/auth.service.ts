import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { loginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt"
import { RegisterUserDto } from "./dto/register-user.dto";
import { Users   } from "src/users/users.model";
import { UserRole } from "@prisma/client";

@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly usersService: UserService){}

    async login(loginDto: loginDto):Promise<any>{
        const {username, password} = loginDto;

    const users = await this.prismaService.users.findFirst({
        where: {
            username: { equals: username }
        }
    });


        if (!users) {
            throw new NotFoundException('User not found');
        }


        const validatePassword = await bcrypt.compare(password, users.password);

        if (!validatePassword) {
            throw new NotFoundException('Invalid Password');
        }

        const token = this.jwtService.sign({ username: users.username, role: users.role }, { expiresIn: '3h' });

        return {
            users,
            token
        };
    }

    async register(createDto: RegisterUserDto): Promise<any> {

        //  const { role, ...userDto } = createDto;

        // if (![UserRole.ADMIN, UserRole.KASIR].includes(role)) {
        //     throw new NotFoundException('Invalid role');
        // }

        
        const userDto = { ...createDto, role: UserRole.KASIR };

        const createUsers = new Users();
        createUsers.nama =  userDto.nama;
        createUsers.username = userDto.username;
        createUsers.password = await bcrypt.hash(userDto.password, 10);
        createUsers.role =  userDto.role

        const user = await this.usersService.createUser(createUsers);

        return {
            user,
        };
    }
}