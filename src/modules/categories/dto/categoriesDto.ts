import { IsIn, IsString, MinLength } from "class-validator";


export class CreateCategoryDto {
  @IsString()
  @MinLength(2)
  name!: string;

  @IsIn(["INCOME", "EXPENSE"])
  type!: "INCOME" | "EXPENSE";
}


export class UpdateCategoryDto {
  @IsString()
  @MinLength(2)
  name!: string;
}