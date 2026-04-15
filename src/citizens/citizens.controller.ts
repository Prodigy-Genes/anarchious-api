import { Controller, Get, Post, Body } from '@nestjs/common';
import { CitizensService } from './citizens.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';
import { Public } from '../auth/public.decorator';
import { Roles } from '../auth/roles.decorator';
import { CitizenRole } from './entities/citizen.entity';

@Controller('citizens')
export class CitizensController {
  constructor(private readonly citizensService: CitizensService) {}

  @Public()
  @Post('register')
  async register(@Body() createCitizenDto: CreateCitizenDto) {
    return await this.citizensService.create(createCitizenDto);
  }

  @Get()
  @Roles(CitizenRole.OVERSEER)
  async findAll() {
    return await this.citizensService.findAll();
  }
}
