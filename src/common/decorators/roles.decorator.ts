import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { UserRole } from '../constants/userRoles.enum';
import { RoleGuard } from '../guard/role/role.guard';

export const ROLES_KEY = 'roles'
export const Roles = (...roles: UserRole[]) => {
    return applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        UseGuards(RoleGuard)
    )
}