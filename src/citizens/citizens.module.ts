import { Module } from '@nestjs/common';
import { CitizensService } from './citizens.service';
import { CitizensController } from './citizens.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citizen } from './entities/citizen.entity';

@Module({
  imports: [
    // This line "unlocks" the Citizen repository for this module
    TypeOrmModule.forFeature([Citizen]),
  ],

  controllers: [CitizensController],
  providers: [CitizensService],
  exports: [CitizensService],
})
export class CitizensModule {}
