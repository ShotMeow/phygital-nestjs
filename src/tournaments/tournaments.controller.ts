import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('tournaments')
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Get(':id')
  async getTournamentById(@Param('id') id: Prisma.TournamentWhereUniqueInput) {
    return this.tournamentsService.tournament({ id: Number(id) });
  }

  @Get()
  async getTournaments() {
    return this.tournamentsService.tournaments();
  }

  @Post()
  @FormDataRequest()
  async createTournament(@Body() tournament: CreateTournamentDto) {
    return this.tournamentsService.createTournament(tournament);
  }

  @Patch(':id')
  @FormDataRequest()
  async updateTournament(
    @Param('id') id: Prisma.TournamentWhereUniqueInput,
    @Body() tournament: UpdateTournamentDto,
  ) {
    return this.tournamentsService.updateTournament(
      { id: Number(id) },
      tournament,
    );
  }

  @Delete(':id')
  async deleteTournament(@Param('id') id: Prisma.TournamentWhereUniqueInput) {
    return this.tournamentsService.deleteTournament({ id: Number(id) });
  }
}
