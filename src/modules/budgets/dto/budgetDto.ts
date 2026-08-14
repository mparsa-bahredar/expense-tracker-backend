import { IsIn, IsInt, IsOptional, IsString } from "class-validator";

export class BudgetQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsIn(["amount", "createdAt"])
  sortBy?: "amount" | "createdAt";

  @IsOptional()
  @IsIn(["asc", "desc"])
  order?: "asc" | "desc";
}