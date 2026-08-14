import { IsInt, IsNumber } from "class-validator";

export class CreateBudgetDto {
  @IsInt()
  categoryId!: number;

  @IsNumber()
  amount!: number;
}