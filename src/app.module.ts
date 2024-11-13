/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FilmModule } from "./film/film.module";
import { PrismaService } from "./prisma-module/prisma.service";
import { PrismaModule } from "./prisma-module/prisma-module.module";
import { ActorController } from "./actor/actor.controller";
import { ActorService } from "./actor/actor.service";
import { CategoryController } from "./category/category.controller";
import { CategoryService } from "./category/category.service";
@Module({
  imports: [PrismaModule, FilmModule],
  controllers: [AppController, ActorController, CategoryController],
  providers: [AppService, PrismaService, ActorService, CategoryService],
})
export class AppModule {}
