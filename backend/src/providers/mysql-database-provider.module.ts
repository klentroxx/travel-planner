import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import databaseConfig from 'src/config/database.config';
import { DataSource } from 'typeorm';
import { User } from "../database/entities/user.entity";
import { Itinerary } from "../database/entities/itinerary.entity";
import { ItineraryActivity } from "../database/entities/itinerary-activity.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'mysql',
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.database'),
          autoLoadEntities: true,
          entities: [
            User,
            Itinerary,
            ItineraryActivity,
          ],
          migrations: ['./database/migrations/**/*.{ts,js}'],
          synchronize: false,
        } as TypeOrmModuleAsyncOptions),
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();

        return dataSource;
      },
    }),
  ],
})
export class MysqlDatabaseProviderModule {}
