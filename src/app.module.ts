import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictsModule } from './districts/districts.module';
import { District } from './districts/entities/district.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CitizensModule } from './citizens/citizens.module';
import { Citizen } from './citizens/entities/citizen.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load the .env file globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [District, Citizen],
        synchronize: false,
      }),
    }),
    DistrictsModule,
    CitizensModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
