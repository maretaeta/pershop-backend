import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    // All users
    async getAllUsers(): Promise<Users[]> {
        return this.prisma.users.findMany();
    }

    // Create Users
    async createUser(data: Users): Promise<Users> {
        try {
            return await this.prisma.users.create({
                data,
            });
        } catch (error) {
            if (error.code === 'P2002') {
                throw new ConflictException('Username already exists');
            }
            throw new Error('Could not create user');
        }
    }


    // Update Users
async updateUser(id_users: number, newData: Partial<Users>): Promise<Users | null> {
    try {
        const updatedUser = await this.prisma.users.update({
            where: {
                id_users: id_users,
            },
            data: newData,
        });

        console.log('Updated User:', updatedUser);

        return updatedUser;
    } catch (error) {
        console.error('Update User Error:', error);
        throw new Error('Could not update user');
    }
}




    // Update Profile
    async updateUserProfile(userId: number, image: string): Promise<Users> {
        try {
            return await this.prisma.users.update({
                where: {
                    id_users: userId,
                },
                data: {
                    profileImage: image,
                },
            });
        } catch (error) {
            throw new Error('Could not update user profile image');
        }
    }
}