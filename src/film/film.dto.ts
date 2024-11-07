import { IsString, IsNumber, IsArray, IsOptional } from "class-validator";

export class CreateFilmDto {
  @IsNumber()
  film_id: number;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  release_year: number;

  @IsNumber()
  language_id: number;

  @IsNumber()
  rental_duration: number;

  @IsString()
  rental_rate: string;

  @IsNumber()
  length: number;

  @IsString()
  replacement_cost: string;

  @IsString()
  rating: string;

  @IsString()
  last_update: string;

  @IsArray()
  @IsOptional()
  special_features?: string[];
}
