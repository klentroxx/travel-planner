import { Module } from '@nestjs/common';
import { ItinerariesService } from "./itineraries.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Itinerary } from "../../database/entities/itinerary.entity";
import { ItineraryActivity } from "../../database/entities/itinerary-activity.entity";
import { ItinerariesController } from "./itineraries.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Itinerary,
      ItineraryActivity
    ]),
  ],
  controllers: [ItinerariesController],
  providers: [ItinerariesService],
  exports: [ItinerariesService]
})
export class ItinerariesModule {}
