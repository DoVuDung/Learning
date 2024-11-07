import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma-module/prisma.service";
import { CreateFilmDto } from "./film.dto";
import { MPAA_RATING } from "@prisma/client";

@Injectable()
export class FilmService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.film.findMany();
  }

  async createFilm(filmData: CreateFilmDto) {
    const foundFilm = await this.prisma.film.findFirst({
      where: { title: { contains: filmData.title } },
    });

    if (foundFilm) {
      throw new HttpException("This film already exist", HttpStatus.FOUND);
    }

    return this.prisma.film.create({
      data: {
        film_id: filmData.film_id,
        title: filmData.title,
        description: filmData.description,
        release_year: filmData.release_year,
        language_id: filmData.language_id,
        rental_duration: filmData.rental_duration,
        rental_rate: filmData.rental_rate,
        length: filmData.length,
        replacement_cost: filmData.replacement_cost,
        rating: filmData.rating as MPAA_RATING,
        last_update: new Date(filmData.last_update), // Ensure the last_update is a valid Date object
        special_features: filmData.special_features || [],
      },
    });
  }
}
