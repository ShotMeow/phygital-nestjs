import type { MemoryStoredFile } from 'nestjs-form-data';

export class CreateTournamentDto {
  name: string;
  body: string;
  description: string;
  prize: string;
  mode: string;
  type: string;
  address: string;
  eventDate: Date;
  gridUrl: string;
  imageFile: MemoryStoredFile;
  teams: string[];
  tags: string[];
}
