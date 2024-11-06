import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma-module/prisma.service';

@Injectable()
export class FilmService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.film.findMany();
  }
}
