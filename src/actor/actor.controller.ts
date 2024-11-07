/* eslint-disable prettier/prettier */
import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { TransformInterceptor } from "src/interceptors/transform.interceptor";
import { PrismaService } from "src/prisma-module/prisma.service";

@ApiTags("ACTOR")
@Controller("actor")
@UseInterceptors(TransformInterceptor)
export class ActorController {
  constructor(private prisma: PrismaService) {}

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
    const orderValue = orderBy ? orderBy.split(":") : null;
    // const orderKey = orderValue[0];
    // const orderType = orderValue[1];
    const totalRecords = await this.prisma.actor.count({
      where: search
        ? {
            OR: [
              {
                first_name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                last_name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      orderBy:
        orderValue?.length === 2
          ? {
              [orderValue[0]]: orderValue[1],
            }
          : {},
    });
    const data = await this.prisma.actor.findMany({
      where: search
        ? {
            OR: [
              {
                first_name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
              {
                last_name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
      skip: Number(skip),
      take: Number(take),
      orderBy:
        orderValue?.length === 2
          ? {
              [orderValue[0]]: orderValue[1],
            }
          : {},
    });
    return { data, totalRecords };
  }

  @Get(":id")
  async getActorById(@Param("id") id: number) {
    return this.prisma.actor.findUnique({
      where: { actor_id: Number(id) },
    });
  }

  @Delete(":id")
  async deleteActorById(@Param("id") id: number) {
    const actor = await this.prisma.actor.findUnique({
      where: { actor_id: Number(id) },
    });
    if (!actor) throw new NotFoundException(`Actor with id:${id} is not exist`);
    return this.prisma.actor.delete({
      where: {
        actor_id: Number(id),
      },
    });
  }
}
