import { IsIn, IsOptional, IsString } from "class-validator";

export class CategoryQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(["name", "createdAt"])
  sortBy?: "name" | "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";
}