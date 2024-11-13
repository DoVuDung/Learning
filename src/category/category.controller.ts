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
} from "@nestjs/common";
import { CategoryService } from "./category.service";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateCategoryDto, UpdateCategoryDto } from "./category.dto";

@ApiTags("CATEGORY")
@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  @ApiQuery({ name: "search", required: false, type: String })
  async getCategory(@Query("search") search: string) {
    const query = { search };
    return this.categoryService.getCategory(query);
  }

  @Get(":id")
  async getCategoryById(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.getCategoryById(id);
  }

  @Put(":id")
  async updateCategory(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateCategory: UpdateCategoryDto
  ) {
    return this.categoryService.updateCategory(id, updateCategory);
  }

  @Delete(":id")
  async deleteCategory(@Param("id", ParseIntPipe) id: number) {
    return this.categoryService.deleteCategory(id);
  }
}
