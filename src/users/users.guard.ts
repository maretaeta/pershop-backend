import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { UserRole } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if (!user || !user.role) {
            throw new UnauthorizedException('User role is missing.');
        }

        if (!requiredRoles.includes(user.role)) {
            throw new ForbiddenException('Insufficient permissions to access this resource.');
        }

        return true;
    }
}
