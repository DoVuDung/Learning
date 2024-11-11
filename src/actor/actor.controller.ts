/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { TransformInterceptor } from "src/interceptors/transform.interceptor";
import { PrismaService } from "src/prisma-module/prisma.service";
import { CreateActorDto, UpdateActorDto } from "./actor.dto";
import { ActorService } from "./actor.service";

@ApiTags("ACTOR")
@Controller("actor")
@UseInterceptors(TransformInterceptor)
export class ActorController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly actorService: ActorService
  ) {}

  @Post()
  async createActor(@Body() createActorDto: CreateActorDto) {
    return this.actorService.createActor(createActorDto);
  }

  @Get()
  @ApiQuery({ name: "search", required: false, type: String })
  @ApiQuery({ name: "skip", required: false, type: Number })
  @ApiQuery({ name: "take", required: false, type: Number })
  @ApiQuery({ name: "orderBy", required: false, type: String })
  async getActors(
    @Query("search") search: string,
    @Query("skip") skip: number = 0,
    @Query("take") take: number = 10,
    @Query("orderBy") orderBy: string
  ) {
    const queries = {
      search,
      skip,
      take,
      orderBy,
    };
    return this.actorService.getActor(queries);
  }

  @Get(":id")
  async getActorById(@Param("id", ParseIntPipe) id: number) {
    return this.actorService.getActorById(id);
  }

  @Put(":id")
  async updateActor(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateActorDto: UpdateActorDto
  ) {
    return this.actorService.updateActor(id, updateActorDto);
  }

  @Delete(":id")
  async deleteActorById(@Param("id", ParseIntPipe) id: number) {
    return this.actorService.deleteActor(id);
  }
}
