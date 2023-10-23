import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./app/users/users.module";
import { ItinerariesModule } from "./app/itineraries/itineraries.module";
import { AuthModule } from "./app/auth/auth.module";
import { MysqlDatabaseProviderModule } from "./providers/mysql-database-provider.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MysqlDatabaseProviderModule,
    UsersModule,
    ItinerariesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
