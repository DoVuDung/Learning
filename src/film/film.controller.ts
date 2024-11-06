import { Controller, Get } from "@nestjs/common";
import { FilmService } from "./film.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("FILM")
@Controller("films")
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @Get()
  async getAllFilms() {
    return this.filmService.findAll();
  }
}
