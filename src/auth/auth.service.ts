import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CitizensService } from '../citizens/citizens.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Citizen } from '../citizens/entities/citizen.entity';
import bcrypt from 'bcrypt';

// Define what a "Safe" citizen looks like (everything except the password)
type CitizenWithoutPassword = Omit<Citizen, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly citizensService: CitizensService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCitizen(
    email: string,
    pass: string,
  ): Promise<CitizenWithoutPassword | null> {
    const citizen = await this.citizensService.findByEmailWithPassword(email);

    if (citizen && (await bcrypt.compare(pass, citizen.password))) {
      // We explicitly create a new object with only the safe fields.
      // This satisfies the linter because no "password" variable is ever created or unused.
      return {
        id: citizen.id,
        email: citizen.email,
        role: citizen.role,
        createdAt: citizen.createdAt,
        updatedAt: citizen.updatedAt,
      };
    }

    return null;
  }

  async login(createAuthDto: CreateAuthDto) {
    const citizen = await this.validateCitizen(
      createAuthDto.email,
      createAuthDto.password,
    );

    if (!citizen) {
      throw new UnauthorizedException(
        'Access Denied: Invalid credentials for Anarchious.',
      );
    }

    const payload = {
      sub: citizen.id,
      email: citizen.email,
      role: citizen.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      citizen: {
        id: citizen.id,
        email: citizen.email,
        role: citizen.role,
      },
    };
  }
}
