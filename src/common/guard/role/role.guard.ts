import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/common/constants/userRoles.enum';
import { ROLES_KEY, Roles } from 'src/common/decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) { }

  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest()
    const userData = request['user']
    const requiredRole = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [context.getHandler(), context.getClass()])

    if (!requiredRole.some((role) => userData.user_role == role)) {
      throw new UnauthorizedException('You cannot access this resource')
    }

    return true;
  }
}
