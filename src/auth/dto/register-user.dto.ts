import { UserRole } from '@prisma/client';
import { IsString, Length } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    @Length(5, 10)
    username: string;

    @IsString()
    @Length(6, 100)
    password: string;

    @IsString()
    @Length(5, 10)
    nama: string;

    @IsString() 
    role: UserRole;
}
