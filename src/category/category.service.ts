import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma-module/prisma.service";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategory(queries) {
    const { search } = queries;
    return this.prisma.category.findMany({
      where: search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {},
    });
  }
  async getCategoryById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { category_id: id },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} is not exist`);
    }
    return category;
  }

  async createCategory(data: CreateCategoryDto) {
    const category = await this.prisma.category.findFirst({
      where: {
        name: data.name,
      },
    });
    if (category) {
      throw new NotFoundException(`Category with name ${data.name} is exist`);
    }
    return this.prisma.category.create({ data });
  }

  async updateCategory(id: number, data: UpdateCategoryDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        category_id: id,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} is not exist`);
    }
    return this.prisma.category.update({
      where: {
        category_id: id,
      },
      data,
    });
  }

  async deleteCategory(id: number) {
    const category = this.prisma.category.findUnique({
      where: {
        category_id: id,
      },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} is not exist`);
    }
    return this.prisma.category.delete({
      where: {
        category_id: id,
      },
    });
  }
}
