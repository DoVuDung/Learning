/* eslint-disable prettier/prettier */
import { PrismaService } from "src/prisma-module/prisma.service";
import { CreateActorDto, UpdateActorDto } from "./actor.dto";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ActorService {
  constructor(private readonly prisma: PrismaService) {}

  async createActor(data: CreateActorDto) {
    const actor = this.prisma.actor.findFirst({
      where: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    });
    if (actor) {
      throw new NotFoundException(
        `Actor with name ${data.first_name} ${data.last_name} is exist `
      );
    }
    return this.prisma.actor.create({
      data,
    });
  }

  async updateActor(actor_id: number, data: UpdateActorDto) {
    const actor = this.prisma.actor.findUnique({
      where: {
        actor_id,
      },
    });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${actor_id} is not exist`);
    }
    return this.prisma.actor.update({
      where: { actor_id },
      data,
    });
  }

  async getActorById(id: number) {
    const actor = this.prisma.actor.findUnique({
      where: {
        actor_id: id,
      },
    });
    if (!actor) {
      throw new NotFoundException(`Actor with ID ${id} is not exist`);
    }
    return actor;
  }

  async deleteActor(actor_id: number) {
    const actor = this.prisma.actor.findUnique({
      where: {
        actor_id,
      },
    });

    if (!actor) {
      throw new NotFoundException(`Actor with ID ${actor_id} is not exist`);
    }

    return this.prisma.actor.delete({
      where: { actor_id },
    });
  }

  async getActor(queries) {
    const { search, orderBy, skip, take } = queries;
    const orderValue = orderBy ? orderBy.split(":") : null;
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
}
