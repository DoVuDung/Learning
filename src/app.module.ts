import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilmModule } from './film/film.module';
import { PrismaService } from './prisma-module/prisma.service';
import { PrismaModule } from './prisma-module/prisma-module.module';

@Module({
  imports: [PrismaModule, FilmModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
