import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt"
import { PrismaService } from "src/prisma.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserRole } from "@prisma/client";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(private readonly prismaService: PrismaService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

     async validate(payload: { username: string, role: UserRole }) {
        const users = await this.prismaService.users.findFirst({
            where:{
                 username: payload.username,
                 role : payload.role
            }
        });

        if (!users) {
            throw new UnauthorizedException();
        }

        return users;
    }

}