import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getAllUsers(): Promise<Users[]> {
        return this.prisma.users.findMany();
    }

    async createUser(data: Users): Promise<Users> {
        const existing = await this.prisma.users.findFirst({
            where: {
                username: data.username,
            },
        });

        if (existing) {
            throw new ConflictException('Username already exists');
        }

        return this.prisma.users.create({
            data,
        });
    }

    async updateUser(userId: number, newData: Partial<Users>): Promise<Users> {
        return this.prisma.users.update({
            where: {
                id_users: userId,
            },
            data: newData,
        });
    }

    async updateUserProfile(userId: number, image: string): Promise<Users> {
        return this.prisma.users.update({
            where: {
                id_users: userId,
            },
            data: {
                profileImage: image,
            },
        });
    }
}
