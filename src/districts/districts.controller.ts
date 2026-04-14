import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { CitizenRole } from '../citizens/entities/citizen.entity';

@Controller('districts')
@UseGuards(JwtAuthGuard) // Every visitor must show their ID at the gate
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Post()
  @Roles(CitizenRole.OVERSEER, CitizenRole.OPERATIVE)
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtsService.create(createDistrictDto);
  }

  @Get() // Open to all logged-in Citizens (Civilian, Operative, Overseer)
  findAll() {
    return this.districtsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtsService.findOne(id);
  }

  @Patch(':id')
  @Roles(CitizenRole.OVERSEER)
  update(
    @Param('id') id: string,
    @Body() updateDistrictDto: UpdateDistrictDto,
  ) {
    return this.districtsService.update(id, updateDistrictDto);
  }

  @Delete(':id')
  @Roles(CitizenRole.OVERSEER)
  remove(@Param('id') id: string) {
    return this.districtsService.remove(id);
  }
}
