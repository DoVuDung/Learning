import { Body, Controller, Get, Post } from "@nestjs/common";
import { FilmService } from "./film.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateFilmDto } from "./film.dto";

@ApiTags("FILM")
@Controller("films")
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  async getAllFilms() {
    return this.filmService.findAll();
  }

  @Post()
  async createFilm(@Body() filmData: CreateFilmDto) {
    return this.filmService.createFilm(filmData);
  }
}
