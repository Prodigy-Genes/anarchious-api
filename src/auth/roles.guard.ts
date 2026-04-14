import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { CitizenRole } from '../citizens/entities/citizen.entity';

// Define the shape of the user attached to the request by Passport
interface RequestUser {
  userId: string;
  email: string;
  role: CitizenRole;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<CitizenRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: RequestUser }>();
    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException(
        'Clearance Denied: No valid citizen credentials detected.',
      );
    }

    const hasPermission = requiredRoles.some((role) => user.role === role);

    if (!hasPermission) {
      throw new ForbiddenException(
        'Clearance Denied: Your citizen rank is insufficient for this action.',
      );
    }

    return hasPermission;
  }
}
