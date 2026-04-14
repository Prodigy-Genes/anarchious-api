import { SetMetadata } from '@nestjs/common';
import { CitizenRole } from '../citizens/entities/citizen.entity';

// The key 'roles' is what the guard will look for later
export const ROLES_KEY = 'roles';
export const Roles = (...roles: CitizenRole[]) => SetMetadata(ROLES_KEY, roles);
