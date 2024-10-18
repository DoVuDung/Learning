import { Controller, Delete, Get, Post, Put, Req, Res } from '@nestjs/common';

@Controller('film')
export class FilmController {
  constructor() {}

  @Post()
  create(@Req() req: Request): string {
    return 'create film';
  }

  @Get()
  findAll(@Req() req: Request, @Res() res: Response): string {
    return 'get films';
  }

  @Get(':id')
  findOne(@Req() req: Request): string {
    return 'get film detail';
  }

  @Put(':id')
  update(@Req() req: Request): string {
    return 'update film';
  }

  @Delete(':id')
  remove(@Req() req: Request): string {
    return 'delete film';
  }
}
