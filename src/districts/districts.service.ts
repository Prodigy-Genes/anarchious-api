import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { District } from './entities/district.entity';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private readonly districtRepo: Repository<District>,
  ) {}

  async create(createDistrictDto: CreateDistrictDto): Promise<District> {
    const district = this.districtRepo.create(createDistrictDto);
    return await this.districtRepo.save(district);
  }

  async findAll(): Promise<District[]> {
    return await this.districtRepo.find();
  }

  async findOne(id: string): Promise<District> {
    const district = await this.districtRepo.findOneBy({ id });
    if (!district) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }
    return district;
  }

  async update(
    id: string,
    updateDistrictDto: UpdateDistrictDto,
  ): Promise<District> {
    const district = await this.findOne(id);
    const updated = Object.assign(district, updateDistrictDto);
    return await this.districtRepo.save(updated);
  }

  async remove(id: string): Promise<void> {
    const result = await this.districtRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`District with ID ${id} not found`);
    }
  }
}
