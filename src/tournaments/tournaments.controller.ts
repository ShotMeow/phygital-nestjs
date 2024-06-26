import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get('/:id')
  async getTournamentById(@Param('id') id: string) {
    return this.tournamentsService.tournament(+id);
  }

  @Get()
  async getTournaments(
    @Query()
    query: {
      page?: string;
      search: string;
      tag?: string;
      take?: string;
      sort: 'asc' | 'desc';
    },
  ) {
    return this.tournamentsService.tournaments({
      ...query,
      page: query.page && +query.page,
      take: query.take && +query.take,
    });
  }

  @Post('/create')
  @FormDataRequest()
  async createTournament(@Body() tournament: CreateTournamentDto) {
    return this.tournamentsService.createTournament(tournament);
  }

  @Patch('/:id/edit')
  @FormDataRequest()
  async updateTournament(
    @Param('id') id: string,
    @Body() tournament: UpdateTournamentDto,
  ) {
    return this.tournamentsService.updateTournament(+id, tournament);
  }

  @Delete('/:id/delete')
  async deleteTournament(@Param('id') id: string) {
    return this.tournamentsService.deleteTournament(+id);
  }
}
