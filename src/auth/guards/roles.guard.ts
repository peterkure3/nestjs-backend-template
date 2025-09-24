// src/auth/guards/roles.guard.ts (Expected content)
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator'; // Assuming you have this decorator
import { Role } from '@prisma/client'; // Or wherever your Role enum is defined

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // <-- This is the dependency NestJS is looking for

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // Implement your role checking logic here
    return requiredRoles.some((role) => user.role === role); // Example check
  }
}
