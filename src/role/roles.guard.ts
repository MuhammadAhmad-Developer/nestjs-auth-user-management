import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from 'src/users/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
    ROLES_KEY,
    [context.getHandler(), context.getClass()],
  );

  if (!requiredRoles || requiredRoles.length === 0) return true;

  const request = context.switchToHttp().getRequest();
  const user = request.user;

  if (!user) return true; // allow public routes like login

  if (!requiredRoles.includes(user.role)) {
    throw new ForbiddenException(
      'You do not have permission to access this resource',
    );
  }

  return true;
}
}