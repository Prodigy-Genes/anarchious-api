import { Controller, Get, Post, Body } from '@nestjs/common';
import { CitizensService } from './citizens.service';
import { CreateCitizenDto } from './dto/create-citizen.dto';

@Controller('citizens')
export class CitizensController {
  constructor(private readonly citizensService: CitizensService) {}

  @Post('register')
  async register(@Body() createCitizenDto: CreateCitizenDto) {
    return await this.citizensService.create(createCitizenDto);
  }

  @Get()
  async findAll() {
    return await this.citizensService.findAll();
  }
}
