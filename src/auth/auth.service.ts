import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { UserService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { loginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt"
import { RegisterUserDto } from "./dto/register-user.dto";
import { Users } from "src/users/users.model";
import { UserRole } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly usersService: UserService,
    ) {}

    async login(loginDto: loginDto): Promise<any> {
        const { username, password } = loginDto;

        const user = await this.prismaService.users.findFirst({
            where: {
                username: { equals: username }
            }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if (!validatePassword) {
            throw new NotFoundException('Invalid Password');
        }

        const token = this.jwtService.sign({ username: user.username, role: user.role }, { expiresIn: '3h' });

        return {
            user,
            token
        };
    }

    async register(createDto: RegisterUserDto): Promise<any> {        
        const userDto = { ...createDto, role: UserRole.KASIR };

        const newUser = new Users();
        newUser.nama = userDto.nama;
        newUser.username = userDto.username;
        newUser.password = await bcrypt.hash(userDto.password, 10);
        newUser.role = userDto.role;

        const user = await this.usersService.createUser(newUser);

        return {
            user,
        };
    }

   async updateUserPassword(userId: number, newPassword: string): Promise<Users> {
    if (!newPassword) {
        throw new BadRequestException('New password is required');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await this.prismaService.users.update({
        where: {
            id_users: userId,
        },
        data: {
            password: hashedPassword,
        },
    });

    return updatedUser;
}
}