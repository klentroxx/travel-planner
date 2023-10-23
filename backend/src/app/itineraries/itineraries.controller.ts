import { Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { ItinerariesService } from "./itineraries.service";

@Controller('itineraries')
export class ItinerariesController {
  constructor(private itinerariesService: ItinerariesService) {}

  @UseGuards(AuthGuard('local'))
  @Get('/')
  async list(@Req() request: ExpressRequest) {
    return this.itinerariesService.getList()
  }

  @UseGuards(AuthGuard('local'))
  @Get(':id')
  async detail(@Req() request: ExpressRequest) {
    const id = request.params.id

    return this.itinerariesService.getOne(id)
  }

  @UseGuards(AuthGuard('local'))
  @Post('/')
  async create(@Req() request: ExpressRequest) {
    const itineraryData = request.body

    return this.itinerariesService.create(itineraryData)
  }

  @UseGuards(AuthGuard('local'))
  @Put(':id')
  async update(@Req() request: ExpressRequest) {
    const itineraryData = request.body
    const id = request.params.id
    return this.itinerariesService.update(+id, itineraryData)
  }

  @UseGuards(AuthGuard('local'))
  @Delete(':id')
  async delete(@Req() request: ExpressRequest) {
    const id = request.params.id
    return this.itinerariesService.delete(id)
  }
}
