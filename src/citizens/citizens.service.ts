import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { Citizen } from './entities/citizen.entity';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { District } from '../districts/entities/district.entity';

@Injectable()
export class CitizensService {
  constructor(
    @InjectRepository(Citizen)
    private readonly citizenRepo: Repository<Citizen>,
  ) {}

  async findByEmailWithPassword(email: string): Promise<Citizen | null> {
    return await this.citizenRepo.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role'],
    });
  }

  async create(createCitizenDto: CreateCitizenDto): Promise<Citizen> {
    const { email, password, role, districtId } = createCitizenDto;

    // Check if the email is already registered in the city
    const existingCitizen = await this.citizenRepo.findOne({
      where: { email },
    });
    if (existingCitizen) {
      throw new ConflictException(
        'This email is already registered in the Citizen Registry.',
      );
    }

    // Security Protocol: Hash the password
    const saltRounds = 10; // Standard for 2026 balance of speed and security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the new Citizen record
    const newCitizen = this.citizenRepo.create({
      email,
      password: hashedPassword,
      role,
    });

    // If a districtId was provided, attach the district object
    if (districtId) {
      newCitizen.district = { id: districtId } as District;
      // Pro-tip: TypeORM is smart enough to just use the ID here
    }

    // Save and return (remember: password will be hidden due to { select: false })
    return await this.citizenRepo.save(newCitizen);
  }

  async findAll(): Promise<Citizen[]> {
    return await this.citizenRepo.find({
      relations: ['district'],
    });
  }
}
