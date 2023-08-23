import { Prisma } from "@prisma/client";

export class Users implements Prisma.usersCreateInput{
    nama?: string;
    username?: string;
    password?: string;
    role?: string;
}