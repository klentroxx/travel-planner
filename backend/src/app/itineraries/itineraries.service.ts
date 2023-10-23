import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Itinerary } from "../../database/entities/itinerary.entity";
import { UpdateItineraryInput } from "./itineraries.input";

@Injectable()
export class ItinerariesService {
  constructor(
    @InjectRepository(Itinerary)
    private itineraryRepository: Repository<Itinerary>,
  ) { }

  public async getList() {
    return this.itineraryRepository
      .createQueryBuilder('itinerary')
      .orderBy('itinerary.startDate', 'ASC')
      .getMany()
  }

  public async getOne(itineraryId: string) {
    return this.itineraryRepository
      .createQueryBuilder('itinerary')
      .where({ id: itineraryId })
      .getOneOrFail()
  }

  public async create(input: UpdateItineraryInput) {
    const queryRunner = this.itineraryRepository.queryRunner
    await queryRunner.startTransaction()

    try {
      const createdItinerary = await queryRunner.manager.getRepository(Itinerary).save(input)

      await queryRunner.commitTransaction()

      return createdItinerary
    } catch (error) {
      await queryRunner.rollbackTransaction()

      throw error
    } finally {
      await queryRunner.release()
    }
  }

  public async update(id: number, input: UpdateItineraryInput) {
    const queryRunner = this.itineraryRepository.queryRunner
    await queryRunner.startTransaction()

    try {
      const updatedItinerary = await queryRunner.manager.getRepository(Itinerary).save(input)

      await queryRunner.commitTransaction()

      return updatedItinerary
    } catch (error) {
      await queryRunner.rollbackTransaction()

      throw error
    } finally {
      await queryRunner.release()
    }
  }

  public async delete(itineraryId: string) {

    try {
      const itinerary = this.itineraryRepository.findOneBy({ id: +itineraryId })

      await this.itineraryRepository
        .delete(itineraryId)

      return itinerary
    } catch (error) {
      throw error
    }
  }


}
